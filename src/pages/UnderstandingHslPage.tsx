import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { LabCard, LabSlider, PaletteStrip, SwatchReadout } from '../components/learn/Lab';
import { hslToRgb, rgbToHex } from '../utils/colorConversion';

const toHex = (h: number, s: number, l: number) => rgbToHex(hslToRgb({ h, s, l }));

export const UnderstandingHslPage: React.FC = () => {
  const [h, setH] = useState(210);
  const [s, setS] = useState(85);
  const [l, setL] = useState(50);
  const hex = toHex(h, s, l);

  const hueTrack = `linear-gradient(to right, ${[0, 60, 120, 180, 240, 300, 360].map((x) => toHex(x, s, l)).join(', ')})`;
  const satTrack = `linear-gradient(to right, ${toHex(h, 0, l)}, ${toHex(h, 100, l)})`;
  const lightTrack = `linear-gradient(to right, #000, ${toHex(h, s, 50)}, #fff)`;
  const shades = [20, 35, 50, 65, 80].map((x) => toHex(h, s, x));

  return (
    <div className="mx-auto max-w-3xl">
      <SeoMeta canonicalPath="/understanding-hsl" />
      <PageHeader
        title="HSL colors, explained"
        intro="HSL describes color the way you'd describe it out loud: which color, how strong, how light. That's why designers love it."
      />

      <LabCard title="Move one slider at a time" cta={{ to: '/color-matching-game', label: 'Try the HSL matching game' }}>
        <SwatchReadout color={hex} lines={[`hsl(${h}, ${s}%, ${l}%)`, hex]} />
        <div className="mt-6 space-y-5">
          <LabSlider label="Hue" value={h} max={360} unit="°" onChange={setH} track={hueTrack} />
          <LabSlider label="Saturation" value={s} max={100} unit="%" onChange={setS} track={satTrack} />
          <LabSlider label="Lightness" value={l} max={100} unit="%" onChange={setL} track={lightTrack} />
        </div>
      </LabCard>

      <article className="prose-page">
        <h2>The three parts</h2>
        <p>
          <strong>Hue</strong> is the color itself, given as an angle around a color wheel. 0° is red,
          120° is green, 240° is blue, and 360° brings you back to red.
        </p>
        <p>
          <strong>Saturation</strong> is how strong the color is. At 100% it's as vivid as it gets; at
          0% the color drains away to gray.
        </p>
        <p>
          <strong>Lightness</strong> runs from black (0%) to white (100%). At 50% you get the purest
          version of the hue.
        </p>

        <h2>Why it's handy</h2>
        <p>
          With RGB, making a color a bit darker means changing all three numbers at once. With HSL you
          just lower the lightness. Keep the hue and saturation the same, step the lightness up and
          down, and you have a matching set of shades in seconds:
        </p>
      </article>

      <div className="mb-8">
        <PaletteStrip colors={shades} label={`Five shades of hue ${h}°`} />
        <p className="mt-2 font-mono text-xs text-zinc-500">
          hsl({h}, {s}%, 20% → 80%)
        </p>
      </div>

      <article className="prose-page">
        <p>
          It's the same trick behind most design-system color scales. Rotate the hue by 180° and you get
          the complementary color; rotate by 30° either way for an analogous one. The{' '}
          <Link to="/color-theory-guide">color theory guide</Link> has more on that.
        </p>

        <h2>One thing HSL gets wrong</h2>
        <p>
          HSL's "lightness" isn't how bright a color looks to us. Yellow and blue at the same lightness
          look very different, because our eyes are far more sensitive to yellow-green light. If you
          need colors that genuinely look equally bright, use a perceptual space like OKLab instead. We
          explain that on the <Link to="/color-distance">color difference page</Link>.
        </p>
      </article>
    </div>
  );
};
