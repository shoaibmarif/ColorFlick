import { SCORING, DIFFICULTY_BONUSES } from "../utils/scoring";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is ColorFlick?",
    answer:
      "ColorFlick is a free color guessing game you play in your browser. You see a target color and have to find its match, guess its hex or RGB code, recreate it with sliders, or sort it into a category such as warm or cool.",
  },
  {
    question: "Is it free? Do I need an account?",
    answer:
      "It is completely free and there is nothing to sign up for. Open the page and start playing.",
  },
  {
    question: "How does the daily challenge work?",
    answer:
      "Every day at midnight (your local time) a new set of ten rounds is generated from the date, so everyone playing on the same day gets the same colors. Your daily streak grows each day you finish it, and you can share your result as a spoiler-free grid of squares. Missed a day? Replay the last five weeks from the calendar — replays just don’t count toward your streak.",
  },
  {
    question: "How is my score calculated?",
    answer: `Every correct answer is worth ${SCORING.base} points, plus a difficulty bonus (${(["easy", "medium", "hard", "expert"] as const).map((d) => `${d[0].toUpperCase()}${d.slice(1)} +${DIFFICULTY_BONUSES[d]}`).join(", ")}). Answer quickly for a speed bonus of up to ${SCORING.maxSpeedBonus} points — full marks within ${SCORING.fullSpeedMs / 1000} second, nothing after ${SCORING.zeroSpeedMs / 1000}. Each correct answer in a row adds ${SCORING.streakBonusPerLevel} more, up to ${SCORING.maxStreakBonus}. In slider and typing modes the total is scaled by how close your guess was. Wrong answers score nothing and reset your streak.`,
  },
  {
    question: "How do you decide how close two colors are?",
    answer:
      "We measure the difference in OKLab, a color space designed so that equal numeric distances look roughly equally different to people. Plain RGB distance over-weights some changes and under-weights others; for example, small shifts in green are much easier to notice than the same shift in blue.",
  },
  {
    question: "What is the difference between RGB, HEX and HSL?",
    answer:
      "They are three ways of writing the same screen colors. RGB gives the amount of red, green and blue light from 0 to 255. HEX writes those same three numbers in base 16, as #RRGGBB. HSL describes a color by its hue (0–360° around the color wheel), saturation and lightness, which is often easier for building palettes.",
  },
  {
    question: "Where are my scores saved?",
    answer:
      "Your statistics, streaks and achievements are stored only in your browser’s local storage on this device. They are not uploaded anywhere, which also means they don’t sync between devices. You can delete them at any time in Settings.",
  },
  {
    question: "Can I play on my phone?",
    answer:
      "Yes. The game is designed for touch screens as well as mouse and keyboard, and you can add it to your home screen to open it like an app.",
  },
  {
    question: "Can I play if I am color-blind?",
    answer:
      "Yes. Settings include color-blind assistance modes for protanopia, deuteranopia and tritanopia, an optional pattern overlay and a high-contrast mode. Right and wrong answers are always marked with an icon and a label, never by color alone.",
  },
  {
    question: "Why might a color look different on another screen?",
    answer:
      "Screens vary in calibration, brightness and features such as Night Shift or True Tone, and room lighting changes how we see color too. Scoring is based on the color values themselves, so results are consistent, but for the fairest game turn off blue-light filters.",
  },
  {
    question: "Is ColorFlick open source?",
    answer:
      "Yes. The code is public at github.com/shoaibmarif/colorflick. Bug reports, ideas for new modes and pull requests are all welcome.",
  },
];
