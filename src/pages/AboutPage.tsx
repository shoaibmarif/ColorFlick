import React from 'react';
import { Globe, Mail } from 'lucide-react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { ButtonLink } from '../components/ui/Button';
import { Github, Linkedin } from '../components/ui/BrandIcons';
import { SITE } from '../seo/site';

const LINKS = [
  { href: SITE.author.url, label: 'Portfolio', Icon: Globe },
  { href: SITE.author.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: SITE.repo, label: 'Source code', Icon: Github },
  { href: `mailto:${SITE.author.email}`, label: 'Email', Icon: Mail },
];

export const AboutPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/about" />
    <PageHeader
      title="About ColorFlick"
      intro="A small side project for anyone who enjoys colors, and maybe wants to get a bit better at seeing them."
    />

    <article className="prose-page">
      <h2>What it's for</h2>
      <p>
        Colors are easy to get wrong. Two shades look the same until you put them side by side, and a
        hex code you'd swear was blue turns out to be closer to purple. ColorFlick is a place to play
        with that: a quick game you can pick up for a few minutes, with a new puzzle waiting each day.
      </p>
      <p>
        It's meant to be fun first. If you happen to learn how RGB or HSL works along the way, that's a
        bonus.
      </p>

      <h2>Keeping it fair</h2>
      <p>
        A color game is only fun if it's fair. Plain RGB numbers are a poor guide to how different
        two colors look, so ColorFlick compares colors in <a href="/color-distance">OKLab</a>, a color
        space designed around human vision. On top of that, every wrong swatch in a round is checked to
        make sure it's actually visible as different. Expert mode is tough, but it's never a coin flip.
      </p>

      <h2>No accounts, no ads</h2>
      <p>
        Your scores and streaks are saved in your own browser. There's nothing to sign up for and
        nothing to buy. I use Google Analytics to see roughly how many people play and which modes they
        like, and you can opt out of that at any time. The <a href="/privacy">privacy policy</a> has the
        details.
      </p>

      <h2>Under the hood</h2>
      <p>
        ColorFlick is built with React and TypeScript and hosted on Vercel. The code is public on{' '}
        <a href={SITE.repo} target="_blank" rel="noopener">
          GitHub
        </a>
        , so if you're curious how the color maths works, or you'd like to suggest a new mode, have a
        look.
      </p>

      <h2>Who's behind it</h2>
      <p>
        I'm{' '}
        <a href={SITE.author.url} target="_blank" rel="noopener">
          {SITE.author.name}
        </a>
        , a software engineer, and ColorFlick is my side project. If you have feedback, found a bug or
        just want to say hi, I'd like to hear from you.
      </p>
    </article>

    <ul className="mt-6 flex flex-wrap gap-2">
      {LINKS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener' })}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </a>
        </li>
      ))}
    </ul>

    <div className="mt-12 flex flex-wrap gap-3">
      <ButtonLink to="/color-guessing-game">Play a round</ButtonLink>
      <ButtonLink to="/contact" variant="secondary">
        Get in touch
      </ButtonLink>
    </div>
  </div>
);
