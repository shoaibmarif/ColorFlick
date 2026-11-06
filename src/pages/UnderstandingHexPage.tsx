import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { LabCard } from '../components/learn/Lab';
import { hexToRgb, normalizeHex } from '../utils/colorConversion';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

export const UnderstandingHexPage: React.FC = () => {
  const [input, setInput] = useState('#2563EB');
  const hex = normalizeHex(input) || '#2563EB';
  const rgb = hexToRgb(hex) || { r: 37, g: 99, b: 235 };
  const pairs = [
    { label: 'Red', code: hex.slice(1, 3), value: rgb.r },
    { label: 'Green', code: hex.slice(3, 5), value: rgb.g },
    { label: 'Blue', code: hex.slice(5, 7), value: rgb.b },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <SeoMeta canonicalPath="/understanding-hex-colors" />
      <PageHeader
        title="Hex color codes, explained"
        intro="Codes like #2563EB look cryptic, but they're just three numbers squeezed together. Once you see the pattern you can read them."
      />

      <LabCard title="Take a code apart" cta={{ to: '/hex-color-game', label: 'Practise with the HEX game' }}>
        <div className="flex flex-wrap items-center gap-4">
          <span className="h-16 w-16 shrink-0 rounded-xl ring-1 ring-inset ring-black/10" style={{ backgroundColor: hex }} />
          <label className="flex-1">
            <span className="mb-1 block text-sm font-medium">Type a hex code</span>
            <span className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
                className="h-11 w-full max-w-[12rem] rounded-lg border border-zinc-300 bg-white px-3 font-mono text-lg dark:border-zinc-700 dark:bg-zinc-950"
              />
              <input
                type="color"
                value={hex}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                aria-label="Pick a color"
                className="h-11 w-11 shrink-0 cursor-pointer rounded-lg border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-950"
              />
            </span>
          </label>
        </div>
        <ol className="mt-6 grid gap-3 sm:grid-cols-3">
          {pairs.map((p) => (
            <li key={p.label} className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/60">
              <span className="text-sm text-zinc-500">{p.label}</span>
              <span className="mt-1 block font-mono text-2xl font-semibold">{p.code}</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                = {p.value} out of 255
              </span>
            </li>
          ))}
        </ol>
      </LabCard>

      <article className="prose-page">
        <h2>Three pairs, three colors</h2>
        <p>
          A hex code is an <Link to="/understanding-rgb">RGB color</Link> in disguise. After the{' '}
          <code>#</code> come three pairs of characters: the first pair is red, the second is green, the
          third is blue. Each pair is a number from 0 to 255, just written differently.
        </p>

        <h2>Counting to F</h2>
        <p>
          Normal numbers use ten digits. Hex uses sixteen, so after 9 it borrows letters:
        </p>
      </article>

      <div className="mb-6 grid grid-cols-8 gap-1 text-center font-mono text-sm sm:grid-cols-[repeat(16,minmax(0,1fr))]">
        {DIGITS.map((d, i) => (
          <div key={d} className="rounded-md bg-zinc-100 py-1.5 dark:bg-zinc-800">
            <span className="block font-semibold">{d}</span>
            <span className="block text-xs text-zinc-500">{i}</span>
          </div>
        ))}
      </div>

      <article className="prose-page">
        <p>
          To turn a pair into a normal number, multiply the first character by 16 and add the second.
          So <code>80</code> is 8 × 16 + 0 = 128 (about half brightness), and <code>FF</code> is 15 × 16 +
          15 = 255 (full brightness).
        </p>

        <h2>Shortcuts worth knowing</h2>
        <ul>
          <li>
            <strong>Three-digit codes</strong> double each character. <code>#3B6</code> is the same as{' '}
            <code>#33BB66</code>.
          </li>
          <li>
            <strong>Eight-digit codes</strong> add transparency at the end. <code>#2563EB80</code> is our
            blue at roughly 50% opacity.
          </li>
          <li>
            <strong>Case doesn't matter.</strong> <code>#ff8800</code> and <code>#FF8800</code> are the same
            color.
          </li>
        </ul>

        <h2>Guessing a color from its code</h2>
        <p>
          You don't need to do the maths every time. Just look at the first character of each pair. In{' '}
          <code>#E07A2F</code>, red starts with E (high), green with 7 (middle) and blue with 2 (low), so
          it's a warm orange. That quick read is exactly the skill the{' '}
          <Link to="/hex-color-game">HEX game</Link> trains.
        </p>
      </article>
    </div>
  );
};
