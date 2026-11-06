import React from 'react';
import { Globe, Mail } from 'lucide-react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { ButtonLink } from '../components/ui/Button';
import { Github, Linkedin } from '../components/ui/BrandIcons';
import { TINTS } from '../components/ui/ColorStripe';
import { SITE } from '../seo/site';

const VALUES = [
  { title: 'Just for fun', body: 'No accounts, no ads, no paywalls. Open the page and play.' },
  { title: 'Fair scoring', body: 'Colors are compared the way eyes see them, so a near miss counts as one.' },
  { title: 'Private', body: 'Your scores stay in your browser. Nothing to sign up for.' },
  { title: 'Open source', body: 'All the code is public on GitHub. Ideas and pull requests welcome.' },
];

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
      intro="A small, free playground for people who love colors — and anyone who wants to get better at seeing them."
    />

    <ul className="mb-12 grid gap-4 sm:grid-cols-2">
      {VALUES.map((v, i) => (
        <li key={v.title} className="card p-5">
          <span className={`inline-block rounded-md px-2 py-0.5 text-sm font-medium ${TINTS[i % TINTS.length]}`}>
            {v.title}
          </span>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{v.body}</p>
        </li>
      ))}
    </ul>

    <article className="prose-page">
      <h2>Why it exists</h2>
      <p>
        {SITE.name} started as a simple idea: make a place where people can have fun playing with
        colors. Whether you are a designer training your eye, a developer who wants to read hex codes at a
        glance, a student learning color theory or just someone who enjoys a quick daily puzzle, there is
        a mode for you — and nothing to sign up for.
      </p>

      <h2>How it measures color</h2>
      <p>
        When the game decides how close your guess was, it compares colors in{' '}
        <a href="/color-distance">OKLab</a>, a color space built to match human vision, instead of raw
        RGB numbers. Light-versus-dark rounds use the WCAG 2.1 relative-luminance formula. And every
        wrong swatch is guaranteed to be visibly different, so no round is a coin flip.
      </p>

      <h2>How it’s built</h2>
      <p>
        {SITE.name} is a React and TypeScript app that runs entirely in your browser and is hosted on
        Vercel. Sounds are generated with the Web Audio API, so there is nothing extra to download. The
        full source code is on{' '}
        <a href={SITE.repo} target="_blank" rel="noopener">
          GitHub
        </a>
        .
      </p>

      <h2>Who makes it</h2>
      <p>
        Hi, I’m{' '}
        <a href={SITE.author.url} target="_blank" rel="noopener">
          {SITE.author.name}
        </a>
        , a software engineer who enjoys building fast, accessible and playful web experiences. If you
        have an idea for a new mode, found a bug, or just want to say hello, I’d love to hear from you.
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
      <ButtonLink to="/color-guessing-game">Play the game</ButtonLink>
      <ButtonLink to="/contact" variant="secondary">
        Get in touch
      </ButtonLink>
    </div>
  </div>
);
