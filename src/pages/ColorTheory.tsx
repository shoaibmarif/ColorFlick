import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { ButtonLink } from '../components/ui/Button';

/** Same HSL lightness (50%), very different apparent brightness. */
const SAME_LIGHTNESS = [
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
];

export const ColorTheoryPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/color-theory" />
    <PageHeader
      title="Color science basics"
      intro="A short tour of how we actually see color, and why the numbers on a screen don't always agree with our eyes."
    />

    <article className="prose-page">
      <h2>Your eyes aren't equally sensitive</h2>
      <p>
        We see color with three kinds of cone cells in the eye, roughly tuned to long, medium and short
        wavelengths of light. They don't pull equal weight. We're very sensitive to yellows and greens,
        and much less sensitive to blue.
      </p>
      <p>
        You can see it for yourself. All four colors below have exactly the same lightness in HSL (50%),
        yet yellow looks bright and blue looks dark:
      </p>
    </article>

    <ul className="mb-8 grid grid-cols-4 gap-2">
      {SAME_LIGHTNESS.map((c) => (
        <li key={c.name} className="text-center">
          <span className="block h-16 rounded-lg ring-1 ring-inset ring-black/10" style={{ backgroundColor: c.hex }} />
          <span className="mt-1 block text-xs text-zinc-500">{c.name}</span>
        </li>
      ))}
    </ul>

    <article className="prose-page">
      <h2>Measuring brightness properly</h2>
      <p>
        To capture how bright a color really looks, the web's accessibility guidelines (WCAG) use a
        measure called <strong>relative luminance</strong>. It weights green most heavily, then red, and
        blue least of all:
      </p>
      <p>
        <code>luminance = 0.2126 × red + 0.7152 × green + 0.0722 × blue</code>
      </p>
      <p>
        (The red, green and blue values are first converted to linear light, which undoes the
        brightness curve screens apply.) This is the formula behind contrast ratios, and it's what the
        light-or-dark game mode uses to decide the answer. Try it on your own colors in the{' '}
        <Link to="/color-contrast-checker">contrast checker</Link>.
      </p>

      <h2>Why "distance" between colors is tricky</h2>
      <p>
        The obvious way to compare two colors is to treat red, green and blue like x, y and z and
        measure the gap. The trouble is that a gap of 30 in the green channel is easy to spot, while
        the same gap in blue can be almost invisible. Equal numbers, unequal differences.
      </p>
      <p>
        Color scientists have spent decades on color spaces that fix this. ColorFlick uses{' '}
        <strong>OKLab</strong>, published by Björn Ottosson in 2020. In OKLab, equal distances look
        roughly equally different to people, whatever the color. That's how we score your guesses and how
        we make sure no two swatches in a round are too similar to tell apart. The{' '}
        <Link to="/color-distance">color difference calculator</Link> lets you compare both methods side
        by side.
      </p>

      <h2>Not everyone sees the same colors</h2>
      <p>
        Around 1 in 12 men and 1 in 200 women have some form of color vision deficiency, most often
        trouble telling certain reds and greens apart. That's why ColorFlick never relies on color alone
        to say whether you were right: every answer also gets an icon and a label. There are color-blind
        assistance options in Settings, too.
      </p>

      <h2>Screens and rooms matter</h2>
      <p>
        The same code can look different on two screens. Brightness, calibration and features like Night
        Shift or True Tone all shift what you see, and so does the light in the room. For a fair game,
        turn off blue-light filters and avoid playing in strongly colored light.
      </p>

      <h2>Keep going</h2>
      <ul>
        <li><Link to="/understanding-rgb">How RGB works</Link></li>
        <li><Link to="/understanding-hsl">How HSL works</Link></li>
        <li><Link to="/color-theory-guide">Color schemes and warm vs cool</Link></li>
      </ul>
    </article>

    <div className="mt-10">
      <ButtonLink to="/color-guessing-game">Put your eyes to the test</ButtonLink>
    </div>
  </div>
);
