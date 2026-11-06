import { useState, useCallback, useRef, useEffect } from 'react';
import {
  GameMode,
  GameFormat,
  Difficulty,
  RoundChoice,
  RoundResult,
} from '../types/game';
import { RGB } from '../types/color';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
} from '../utils/colorConversion';
import {
  generateExactColorChoices,
  generateClosestColorChoices,
  generateColorNameChoices,
  generateRandomRgb,
  RngFn,
  secureRandom,
} from '../utils/randomColor';
import { classifyWarmCool, getWarmCoolExplanation } from '../utils/warmCool';
import { classifyLightDark, getLuminanceExplanation } from '../utils/luminance';
import { calculateRoundScore, SCORING } from '../utils/scoring';
import { calculateDifferencePercentage } from '../utils/colorDistance';
import { sanitizeHexInput } from '../utils/validation';
import { soundManager } from '../utils/audio';

/**
 * Difficulty for a given round. Survival and quick-challenge formats escalate
 * as you progress; every other format uses the chosen difficulty.
 */
export function difficultyForRound(
  format: GameFormat,
  chosen: Difficulty,
  round: number,
  totalRounds: number
): Difficulty {
  if (format === 'survival') {
    if (round <= 3) return 'easy';
    if (round <= 6) return 'medium';
    if (round <= 10) return 'hard';
    return 'expert';
  }
  if (format === 'quick-challenge') {
    const progress = round / totalRounds;
    if (progress <= 0.3) return 'easy';
    if (progress <= 0.6) return 'medium';
    if (progress <= 0.85) return 'hard';
    return 'expert';
  }
  return chosen;
}

interface GameEngineConfig {
  initialMode?: GameMode;
  initialFormat?: GameFormat;
  initialDifficulty?: Difficulty;
  customRng?: RngFn;
  totalRounds?: number;
  onRoundComplete?: (mode: GameMode, result: RoundResult) => void;
  onGameComplete?: (
    mode: GameMode,
    format: GameFormat,
    difficulty: Difficulty,
    score: number,
    rounds: RoundResult[]
  ) => void;
}

export function useGameEngine({
  initialMode = 'exact-color',
  initialFormat = 'standard',
  initialDifficulty = 'medium',
  customRng,
  totalRounds = 10,
  onRoundComplete,
  onGameComplete,
}: GameEngineConfig = {}) {
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [format, setFormat] = useState<GameFormat>(initialFormat);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [targetRoundsCount, setTargetRoundsCount] = useState<number>(totalRounds);

  const [roundNumber, setRoundNumber] = useState(1);
  const [targetRgb, setTargetRgb] = useState<RGB>(() => generateRandomRgb(customRng || secureRandom));
  const [choices, setChoices] = useState<RoundChoice[]>([]);
  const [nameChoices, setNameChoices] = useState<string[]>([]);
  const [nameTargetName, setNameTargetName] = useState<string>('');

  const [roundStatus, setRoundStatus] = useState<'guessing' | 'answered' | 'completed'>('guessing');
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [roundHistory, setRoundHistory] = useState<RoundResult[]>([]);
  const [score, setScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [comboBanner, setComboBanner] = useState<string | null>(null);

  const roundStartTimeRef = useRef<number>(Date.now());
  const rngRef = useRef<RngFn>(customRng || secureRandom);

  // Determine active difficulty (auto-escalates in survival and quick-challenge modes)
  const getActiveDifficulty = useCallback(
    (): Difficulty => difficultyForRound(format, difficulty, roundNumber, targetRoundsCount),
    [format, difficulty, roundNumber, targetRoundsCount]
  );

  // Generate question for current round
  const setupRound = useCallback(
    (target: RGB, currentActiveDifficulty: Difficulty) => {
      const rng = rngRef.current;
      const targetHex = rgbToHex(target);

      if (mode === 'exact-color') {
        const c = generateExactColorChoices(target, currentActiveDifficulty, rng);
        setChoices(c);
      } else if (mode === 'closest-color') {
        const c = generateClosestColorChoices(target, currentActiveDifficulty, rng);
        setChoices(c);
      } else if (mode === 'color-name') {
        const generated = generateColorNameChoices(targetHex, rng);
        const newTargetRgb = hexToRgb(generated.targetColor.hex) || target;
        setTargetRgb(newTargetRgb);
        setNameTargetName(generated.targetColor.name);
        setNameChoices(generated.choices);
        setChoices(
          generated.choices.map((n) => ({
            id: `name-${n}`,
            hex: newTargetRgb ? rgbToHex(newTargetRgb) : targetHex,
            label: n,
            isCorrect: n === generated.targetColor.name,
          }))
        );
      } else if (mode === 'warm-cool') {
        // Generate target color
        const targetCat = classifyWarmCool(target);
        setChoices([
          {
            id: 'Warm',
            hex: rgbToHex(target),
            label: 'Warm',
            isCorrect: targetCat === 'Warm',
          },
          {
            id: 'Cool',
            hex: rgbToHex(target),
            label: 'Cool',
            isCorrect: targetCat === 'Cool',
          },
          {
            id: 'Neutral',
            hex: rgbToHex(target),
            label: 'Neutral',
            isCorrect: targetCat === 'Neutral',
          },
        ]);
      } else if (mode === 'light-dark') {
        const correctCategory = classifyLightDark(target);
        setChoices([
          {
            id: 'Light',
            hex: rgbToHex(target),
            label: 'Light',
            isCorrect: correctCategory === 'Light',
          },
          {
            id: 'Dark',
            hex: rgbToHex(target),
            label: 'Dark',
            isCorrect: correctCategory === 'Dark',
          },
        ]);
      } else {
        // rgb-guess, hex-guess, color-picker, color-match: user manipulates inputs/sliders
        setChoices([]);
      }

      setRoundStatus('guessing');
      setLastResult(null);
      setComboBanner(null);
      roundStartTimeRef.current = Date.now();
    },
    [mode]
  );

  // Initialize first round or when mode/difficulty/format changes
  const startNewGame = useCallback(
    (newMode?: GameMode, newFormat?: GameFormat, newDifficulty?: Difficulty, newTotalRounds?: number) => {
      const activeFormat = newFormat || format;
      const activeDiff = newDifficulty || difficulty;
      const activeRounds = newTotalRounds || targetRoundsCount;

      if (newMode) setMode(newMode);
      if (newFormat) setFormat(activeFormat);
      if (newDifficulty) setDifficulty(activeDiff);
      if (newTotalRounds) setTargetRoundsCount(activeRounds);

      setRoundNumber(1);
      setScore(0);
      setCurrentStreak(0);
      setLives(3);
      setRoundHistory([]);
      setRoundStatus('guessing');
      setComboBanner(null);

      const initialTarget = generateRandomRgb(rngRef.current);
      setTargetRgb(initialTarget);
      setupRound(initialTarget, difficultyForRound(activeFormat, activeDiff, 1, activeRounds));
    },
    [mode, format, difficulty, targetRoundsCount, setupRound]
  );

  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, format, difficulty]);

  // Process a completed round answer
  const finishRound = useCallback(
    (
      isCorrect: boolean,
      playerHex?: string,
      playerAnswerLabel?: string,
      differencePercentage?: number,
      targetCategory?: string,
      explanation?: string
    ) => {
      const responseTimeMs = Date.now() - roundStartTimeRef.current;
      const activeDiff = getActiveDifficulty();

      const similarity =
        differencePercentage !== undefined
          ? Math.max(0, Math.min(100, 100 - differencePercentage))
          : isCorrect
          ? 100
          : 0;

      const scoreBreakdown = calculateRoundScore(
        isCorrect,
        activeDiff,
        responseTimeMs,
        currentStreak,
        similarity
      );

      const targetHex = rgbToHex(targetRgb);

      const result: RoundResult = {
        roundNumber,
        targetHex,
        playerHex,
        playerAnswerLabel,
        isCorrect,
        scoreEarned: scoreBreakdown.totalPoints,
        responseTimeMs,
        differencePercentage,
        similarityPercentage: Math.round(similarity * 10) / 10,
        targetCategory,
        explanation,
      };

      setLastResult(result);
      const updatedHistory = [...roundHistory, result];
      setRoundHistory(updatedHistory);
      setScore((s) => s + scoreBreakdown.totalPoints);

      // Check special combo events
      if (similarity >= 98) {
        setComboBanner('Perfect match');
      } else if (isCorrect && responseTimeMs <= 900) {
        setComboBanner('Lightning fast');
      } else if (currentStreak + 1 === 5) {
        setComboBanner('Five in a row');
      } else if (currentStreak + 1 === 10) {
        setComboBanner('Ten in a row!');
      } else {
        setComboBanner(null);
      }

      if (isCorrect) {
        const nextStreak = currentStreak + 1;
        setCurrentStreak(nextStreak);
        if (nextStreak > 1 && nextStreak % 5 === 0) {
          soundManager.playStreak();
        } else {
          soundManager.playCorrect();
        }
      } else {
        setCurrentStreak(0);
        soundManager.playIncorrect();
      }

      if (onRoundComplete) {
        onRoundComplete(mode, result);
      }

      // Check format completion criteria
      let isGameOver = false;

      if (format === 'endless') {
        const newLives = isCorrect ? lives : lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          isGameOver = true;
        }
      } else if (format === 'survival') {
        if (!isCorrect) {
          isGameOver = true;
        }
      } else if (format === 'practice') {
        // Practice never auto-terminates
        isGameOver = false;
      } else {
        // standard, quick-challenge, daily
        if (roundNumber >= targetRoundsCount) {
          isGameOver = true;
        }
      }

      if (isGameOver) {
        setRoundStatus('completed');
        soundManager.playGameComplete();
        if (onGameComplete) {
          onGameComplete(
            mode,
            format,
            difficulty,
            score + scoreBreakdown.totalPoints,
            updatedHistory
          );
        }
      } else {
        setRoundStatus('answered');
      }
    },
    [
      getActiveDifficulty,
      currentStreak,
      targetRgb,
      roundNumber,
      roundHistory,
      score,
      onRoundComplete,
      mode,
      format,
      lives,
      targetRoundsCount,
      difficulty,
      onGameComplete,
    ]
  );

  // Choice button submission (Exact color, closest color, warm-cool, light-dark, color-name)
  const submitChoice = useCallback(
    (choiceId: string) => {
      if (roundStatus !== 'guessing') return;
      const selected = choices.find((c) => c.id === choiceId);
      if (!selected) return;

      const isCorrect = selected.isCorrect;

      let targetCategory: string | undefined = undefined;
      let explanation: string | undefined = undefined;

      if (mode === 'warm-cool') {
        const cat = classifyWarmCool(targetRgb);
        targetCategory = cat;
        explanation = getWarmCoolExplanation(targetRgb, cat);
      } else if (mode === 'light-dark') {
        const cat = classifyLightDark(targetRgb);
        targetCategory = cat;
        explanation = getLuminanceExplanation(targetRgb, cat);
      }

      finishRound(
        isCorrect,
        selected.hex,
        selected.label || selected.hex,
        selected.distanceToTarget ? Math.round(selected.distanceToTarget * 100) : undefined,
        targetCategory,
        explanation
      );
    },
    [roundStatus, choices, targetRgb, mode, finishRound]
  );

  // Hex guess submission
  const submitHexGuess = useCallback(
    (rawHex: string) => {
      if (roundStatus !== 'guessing') return;
      const sanitized = sanitizeHexInput(rawHex);
      if (!sanitized) return;

      const guessedRgb = hexToRgb(sanitized);
      if (!guessedRgb) return;

      const diff = calculateDifferencePercentage(targetRgb, guessedRgb);
      const isCorrect = diff <= SCORING.codeGuessTolerancePct;

      finishRound(isCorrect, sanitized, sanitized, diff);
    },
    [roundStatus, targetRgb, finishRound]
  );

  // RGB guess submission
  const submitRgbGuess = useCallback(
    (guessedRgb: RGB) => {
      if (roundStatus !== 'guessing') return;
      const diff = calculateDifferencePercentage(targetRgb, guessedRgb);
      const isCorrect = diff <= SCORING.codeGuessTolerancePct;
      const hex = rgbToHex(guessedRgb);

      finishRound(isCorrect, hex, `RGB(${guessedRgb.r}, ${guessedRgb.g}, ${guessedRgb.b})`, diff);
    },
    [roundStatus, targetRgb, finishRound]
  );

  // Similarity guess submission (Color Picker and Color Matching modes)
  const submitSimilarityGuess = useCallback(
    (guessedRgb: RGB, similarityPercentage: number) => {
      if (roundStatus !== 'guessing') return;
      const diff = calculateDifferencePercentage(targetRgb, guessedRgb);
      // Correct if similarity >= 88%
      const isCorrect = similarityPercentage >= SCORING.sliderPassSimilarityPct;
      const hex = rgbToHex(guessedRgb);
      const hsl = rgbToHsl(guessedRgb);

      const label = mode === 'color-match'
        ? `HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`
        : hex;

      finishRound(isCorrect, hex, label, diff);
    },
    [roundStatus, targetRgb, mode, finishRound]
  );

  // Advance to next round
  const nextRound = useCallback(() => {
    if (roundStatus === 'completed') return;
    const nextRoundNum = roundNumber + 1;
    setRoundNumber(nextRoundNum);

    const nextTarget = generateRandomRgb(rngRef.current);
    setTargetRgb(nextTarget);

    const activeDiff = difficultyForRound(format, difficulty, nextRoundNum, targetRoundsCount);

    setupRound(nextTarget, activeDiff);
  }, [roundStatus, roundNumber, format, difficulty, targetRoundsCount, setupRound]);

  // Complete game prematurely (e.g. when timed countdown expires)
  const forceCompleteGame = useCallback(() => {
    setRoundStatus('completed');
    soundManager.playGameComplete();
    if (onGameComplete) {
      onGameComplete(mode, format, difficulty, score, roundHistory);
    }
  }, [mode, format, difficulty, score, roundHistory, onGameComplete]);

  return {
    mode,
    format,
    difficulty,
    activeDifficulty: getActiveDifficulty(),
    roundNumber,
    targetRoundsCount,
    setTargetRoundsCount,
    targetRgb,
    targetHex: rgbToHex(targetRgb),
    choices,
    nameChoices,
    nameTargetName,
    roundStatus,
    lastResult,
    roundHistory,
    score,
    currentStreak,
    lives,
    comboBanner,
    submitChoice,
    submitHexGuess,
    submitRgbGuess,
    submitSimilarityGuess,
    nextRound,
    startNewGame,
    forceCompleteGame,
    setMode,
    setFormat,
    setDifficulty,
  };
}
