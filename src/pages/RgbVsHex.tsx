import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { LabCard, SwatchReadout } from '../components/learn/Lab';
import { hexToRgb, normalizeHex } from '../utils/colorConversion';

const SAMPLES = ['#3B82F6', '#F25F4C', '#1FB58F', '#F5B83D', '#111827'];

export const RgbVsHexPage: React.FC = () => {
  const [hex, setHex] = useState('#3B82F6');
  const valid = normalizeHex(hex) || '#3B82F6';
  const rgb = hexToRgb(valid) || { r: 59, g: 130, b: 246 };

  return (
    <div className="mx-auto max-w-3xl">
      <SeoMeta canonicalPath="/rgb-vs-hex" />
      <PageHeader
        title="RGB vs HEX"
        intro="Short answer: they're the same colors written two different ways. Here's how they line up and when to use which."
      />

      <LabCard title="Same color, two spellings" cta={{ to: '/color-converter', label: 'Open the full color converter' }}>
        <SwatchReadout color={valid} lines={[valid, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`]} />
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Example colors">
          {SAMPLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setHex(s)}
              aria-pressed={valid === s}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 px-2.5 py-1.5 font-mono text-xs aria-pressed:border-zinc-900 dark:border-zinc-700 dark:aria-pressed:border-white"
            >
              <span className="h-4 w-4 rounded ring-1 ring-inset ring-black/10" style={{ backgroundColor: s }} />
              {s}
            </button>
          ))}
        </div>
      </LabCard>

      <article className="prose-page">
        <h2>What's the same</h2>
        <p>
          Both describe a color by how much red, green and blue light it contains, each on a scale from 0
          to 255. <code>rgb(59, 130, 246)</code> and <code>#3B82F6</code> are the same blue. Your browser
          treats them identically; nothing is lost going from one to the other.
        </p>

        <h2>What's different</h2>
        <p>
          RGB writes the three numbers in ordinary decimal. HEX writes them in base 16, two characters
          each, and packs them into one short code. So <code>3B</code> is 59, <code>82</code> is 130 and{' '}
          <code>F6</code> is 246. (If base 16 is new to you, the{' '}
          <Link to="/understanding-hex-colors">hex guide</Link> walks through it.)
        </p>

        <h2>Converting by hand</h2>
        <p>
          <strong>HEX to RGB:</strong> take each pair, multiply the first character by 16 and add the
          second. For <code>F6</code> that's 15 × 16 + 6 = 246.
        </p>
        <p>
          <strong>RGB to HEX:</strong> divide the number by 16. The whole part is the first character,
          the remainder is the second. 130 ÷ 16 = 8 remainder 2, so 130 becomes <code>82</code>.
        </p>
        <p>
          In practice nobody does this for real work. Use the <Link to="/rgb-to-hex">RGB to HEX</Link> or{' '}
          <Link to="/hex-to-rgb">HEX to RGB</Link> converter.
        </p>

        <h2>Which should you use?</h2>
        <ul>
          <li>
            <strong>HEX</strong> is short, easy to copy and paste, and it's what most design tools show
            you. It's the usual choice for fixed brand colors.
          </li>
          <li>
            <strong>RGB</strong> is easier to read and tweak by eye, and with a fourth value,{' '}
            <code>rgb(59 130 246 / 50%)</code>, it handles transparency clearly.
          </li>
          <li>
            If you're adjusting colors a lot (lighter, darker, more muted), consider{' '}
            <Link to="/understanding-hsl">HSL</Link>. It's much easier to reason about.
          </li>
        </ul>
        <p>Whichever you pick, try to stick to one style across a project. Mixed notation is harder to scan.</p>
      </article>
    </div>
  );
};
