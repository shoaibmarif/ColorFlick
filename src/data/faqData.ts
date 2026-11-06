import { SCORING, DIFFICULTY_BONUSES } from "../utils/scoring";

export interface FaqItem {
  question: string;
  answer: string;
}

const bonuses = (["easy", "medium", "hard", "expert"] as const)
  .map((d) => `${d[0].toUpperCase()}${d.slice(1)} +${DIFFICULTY_BONUSES[d]}`)
  .join(", ");

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is ColorFlick?",
    answer:
      "A color game you play in your browser. You get a target color, and depending on the mode you find its match, guess its hex code, mix it with sliders, or decide if it’s warm or cool. Rounds take a few seconds, so it’s easy to play a quick game.",
  },
  {
    question: "Is it free? Do I need an account?",
    answer:
      "Yes, it’s free, and no, there’s no account. Just open the page and play.",
  },
  {
    question: "How does the daily challenge work?",
    answer:
      "Each day at midnight (your time) there’s a new set of ten rounds, and everyone gets the same colors. Finish it on consecutive days to build a streak. When you’re done you can share a little grid of green and red squares, so friends can see how you did without spoiling the colors. Missed a day? You can replay the last five weeks from the calendar; replays just don’t count toward your streak.",
  },
  {
    question: "How is my score calculated?",
    answer: `A right answer is worth ${SCORING.base} points, plus a bonus for the difficulty (${bonuses}). Answer quickly and you get up to ${SCORING.maxSpeedBonus} extra points: the full amount within ${SCORING.fullSpeedMs / 1000} second, nothing after ${SCORING.zeroSpeedMs / 1000}. Every right answer in a row adds another ${SCORING.streakBonusPerLevel}, up to ${SCORING.maxStreakBonus}. In the slider and typing modes, the total depends on how close you got. A wrong answer scores nothing and resets your streak.`,
  },
  {
    question: "How do you decide how close two colors are?",
    answer:
      "We use a color space called OKLab, which is designed so that the numbers match what people actually see. Plain RGB numbers can be misleading: a small change in green is easy to spot, while the same change in blue can be almost invisible.",
  },
  {
    question: "What’s the difference between RGB, HEX and HSL?",
    answer:
      "They’re three ways of writing the same colors. RGB gives the amount of red, green and blue from 0 to 255. HEX is those same three numbers written in base 16, like #3B82F6. HSL describes a color by its hue, how strong it is and how light it is, which makes it easier to tweak.",
  },
  {
    question: "Where are my scores saved?",
    answer:
      "In your browser, on this device. Nothing is uploaded, which also means your progress won’t follow you to another phone or computer. You can wipe it any time from Settings.",
  },
  {
    question: "Can I play on my phone?",
    answer:
      "Yes, it works fine with touch. You can also add it to your home screen so it opens like an app.",
  },
  {
    question: "Can I play if I’m color-blind?",
    answer:
      "Yes. Answers are always marked with an icon and a word, not just a color, and Settings has options for protanopia, deuteranopia and tritanopia, an optional pattern overlay and a high-contrast mode. Some modes will naturally be harder, but nothing relies on red and green alone.",
  },
  {
    question: "Why does a color look different on another screen?",
    answer:
      "Screens aren’t all calibrated the same, and things like brightness, Night Shift or True Tone change what you see. So does the light in the room. Scoring uses the color values themselves, so it’s fair either way, but for the best game turn off blue-light filters.",
  },
  {
    question: "Is the code available?",
    answer:
      "Yes, it’s on GitHub at github.com/shoaibmarif/colorflick. Bug reports and ideas for new modes are welcome.",
  },
];
