import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { LabCard, LabSlider, SwatchReadout } from '../components/learn/Lab';
import { rgbToHex } from '../utils/colorConversion';

const MIXES: { name: string; rgb: string; hex: string }[] = [
  { name: 'Red + green', rgb: 'rgb(255, 255, 0)', hex: '#FFFF00' },
  { name: 'Green + blue', rgb: 'rgb(0, 255, 255)', hex: '#00FFFF' },
  { name: 'Red + blue', rgb: 'rgb(255, 0, 255)', hex: '#FF00FF' },
  { name: 'All three, half power', rgb: 'rgb(128, 128, 128)', hex: '#808080' },
];

export const UnderstandingRgbPage: React.FC = () => {
  const [r, setR] = useState(255);
  const [g, setG] = useState(80);
  const [b, setB] = useState(120);
  const hex = rgbToHex({ r, g, b });

  return (
    <div className="mx-auto max-w-3xl">
      <SeoMeta canonicalPath="/understanding-rgb" />
      <PageHeader
        title="The RGB color model, explained"
        intro="Every color on your screen is just red, green and blue light mixed in different amounts. Here's how that works."
      />

      <LabCard title="Mix your own" cta={{ to: '/rgb-color-game', label: 'Try the RGB mixer game' }}>
        <SwatchReadout color={hex} lines={[`rgb(${r}, ${g}, ${b})`, hex]} />
        <div className="mt-6 space-y-5">
          <LabSlider label="Red" value={r} max={255} onChange={setR} track={`linear-gradient(to right, rgb(0,${g},${b}), rgb(255,${g},${b}))`} />
          <LabSlider label="Green" value={g} max={255} onChange={setG} track={`linear-gradient(to right, rgb(${r},0,${b}), rgb(${r},255,${b}))`} />
          <LabSlider label="Blue" value={b} max={255} onChange={setB} track={`linear-gradient(to right, rgb(${r},${g},0), rgb(${r},${g},255))`} />
        </div>
      </LabCard>

      <article className="prose-page">
        <h2>Light adds up</h2>
        <p>
          Paint works by soaking up light. Mix enough of it together and you end up with a muddy brown.
          Screens do the opposite. Each pixel is three tiny lights (one red, one green, one blue), and
          turning them up adds more light. All three off gives you black. All three at full gives you
          white.
        </p>
        <p>
          That's why mixing on a screen can feel backwards at first. Red and green light make{' '}
          <strong>yellow</strong>, not brown. Play with the sliders above and you'll get a feel for it
          quickly.
        </p>

        <h2>Why the numbers stop at 255</h2>
        <p>
          Each channel is stored in one byte, and a byte can hold 256 different values: 0 to 255. Three
          channels give you 256 × 256 × 256, which is just over 16.7 million colors. That's more than
          most people can tell apart, which is why it became the standard.
        </p>
        <p>
          In CSS you write it like this: <code>rgb(37, 99, 235)</code>. The same color in hex is{' '}
          <code>#2563EB</code>; it's the same three numbers, written in base 16. There's a{' '}
          <Link to="/rgb-vs-hex">side-by-side comparison here</Link>.
        </p>

        <h2>A few mixes worth remembering</h2>
      </article>

      <ul className="mb-8 grid gap-3 sm:grid-cols-2">
        {MIXES.map((m) => (
          <li key={m.name} className="card flex items-center gap-3 p-3">
            <span className="h-10 w-10 shrink-0 rounded-md ring-1 ring-inset ring-black/10" style={{ backgroundColor: m.hex }} />
            <span>
              <span className="block text-sm font-medium">{m.name}</span>
              <code className="text-xs text-zinc-500">{m.rgb}</code>
            </span>
          </li>
        ))}
      </ul>

      <article className="prose-page">
        <h2>Reading an RGB value at a glance</h2>
        <ul>
          <li>The biggest number tells you the main hue. In <code>rgb(230, 120, 40)</code> it's red, so the color leans orange.</li>
          <li>When all three numbers are close together, the color is grayish. When they're far apart, it's vivid.</li>
          <li>High numbers overall mean a light color; low numbers mean a dark one.</li>
        </ul>
        <p>
          Once these click, the <Link to="/rgb-color-game">RGB game</Link> gets a lot easier, and so does
          tweaking colors in a stylesheet.
        </p>
      </article>
    </div>
  );
};
