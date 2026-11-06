import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { LabCard, LabSlider, PaletteStrip } from '../components/learn/Lab';
import { hslToRgb, rgbToHex } from '../utils/colorConversion';

const hue = (h: number, s = 75, l = 55) => rgbToHex(hslToRgb({ h: ((h % 360) + 360) % 360, s, l }));

const HARMONIES: { name: string; offsets: number[]; body: string }[] = [
  {
    name: 'Complementary',
    offsets: [0, 180],
    body: 'Two colors from opposite sides of the wheel. Lots of contrast, so it grabs attention. Great for a button that needs to stand out, tiring if you use it everywhere.',
  },
  {
    name: 'Analogous',
    offsets: [-30, 0, 30],
    body: 'Neighbors on the wheel. Calm and easy on the eye, which is why you see it in nature all the time: think of a forest, or a sunset.',
  },
  {
    name: 'Triadic',
    offsets: [0, 120, 240],
    body: 'Three colors spaced evenly around the wheel. Bright and playful. It usually works best when one color leads and the other two are used as accents.',
  },
  {
    name: 'Split complementary',
    offsets: [0, 150, 210],
    body: 'Like complementary, but the opposite color is split into its two neighbors. You keep the contrast with less of the clash, so it’s a safer choice.',
  },
];

export const ColorTheoryGuidePage: React.FC = () => {
  const [base, setBase] = useState(215);

  return (
    <div className="mx-auto max-w-3xl">
      <SeoMeta canonicalPath="/color-theory-guide" />
      <PageHeader
        title="Color theory guide"
        intro="A practical intro to the color wheel, color schemes that work, and why some colors feel warm and others cool."
      />

      <LabCard title="Pick a base color and see the schemes" cta={{ to: '/color-theory-game', label: 'Test yourself with the warm or cool game' }}>
        <LabSlider
          label="Base hue"
          value={base}
          max={359}
          unit="°"
          onChange={setBase}
          track={`linear-gradient(to right, ${[0, 60, 120, 180, 240, 300, 359].map((h) => hue(h)).join(', ')})`}
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {HARMONIES.map((hm) => (
            <div key={hm.name}>
              <p className="mb-2 text-sm font-medium">{hm.name}</p>
              <PaletteStrip colors={hm.offsets.map((o) => hue(base + o))} label={`${hm.name} scheme`} />
            </div>
          ))}
        </div>
      </LabCard>

      <article className="prose-page">
        <h2>The color wheel</h2>
        <p>
          Picture the rainbow bent into a circle so that red meets violet. That's the color wheel. Where
          a color sits on it is its <em>hue</em>, measured in degrees: red at 0°, yellow around 60°, green
          at 120°, cyan at 180°, blue at 240° and magenta at 300°. Almost every color scheme you'll read
          about is just a pattern of angles on this circle.
        </p>

        <h2>Four schemes worth knowing</h2>
        {HARMONIES.map((hm) => (
          <React.Fragment key={hm.name}>
            <h3>{hm.name}</h3>
            <p>{hm.body}</p>
          </React.Fragment>
        ))}
        <p>
          There's also <strong>monochromatic</strong>: one hue in several lighter and darker versions.
          It's hard to get wrong, which is why so many apps use it. The{' '}
          <Link to="/understanding-hsl">HSL page</Link> shows how to build one.
        </p>

        <h2>Warm, cool and neutral</h2>
        <p>
          Reds, oranges and yellows tend to feel warm: they remind us of fire and sunlight, and they seem
          to come towards you. Greens, blues and purples feel cool and tend to sit back. Grays, very pale
          tints and very dark shades are neutral; they don't push in either direction.
        </p>
        <p>In the warm or cool game, we sort colors like this:</p>
        <ul>
          <li><strong>Warm:</strong> hues from 0° to 72°, and from 326° back round to 360° (reds, oranges, yellows, warm pinks).</li>
          <li><strong>Cool:</strong> hues from 86° to 312° (greens, cyans, blues, violets).</li>
          <li>
            <strong>Neutral:</strong> anything very gray (saturation of 14% or less), almost black or
            almost white, or sitting right on the border between warm and cool.
          </li>
        </ul>
        <p>
          The borders are a judgment call. Some people see lime as warm, others as cool. If you disagree
          with one of our answers, you're probably not wrong, just drawing the line in a different place.
        </p>

        <h2>Using this in practice</h2>
        <ul>
          <li>Pick one main color and let everything else support it.</li>
          <li>Save your strongest contrast for the thing you most want people to notice.</li>
          <li>
            Always check text against its background. Pretty and readable aren't the same thing; the{' '}
            <Link to="/color-contrast-checker">contrast checker</Link> will tell you if a pair passes.
          </li>
        </ul>
      </article>
    </div>
  );
};
