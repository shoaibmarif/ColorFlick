import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { ButtonLink } from '../components/ui/Button';
import { SITE } from '../seo/site';

export const AboutPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/about" />
    <PageHeader
      title="About ColorFlick"
      intro="A small, focused game for getting better at seeing and describing color."
    />

    <article className="prose-page">
      <h2>Why it exists</h2>
      <p>
        Telling colors apart — and knowing how to describe them in HEX, RGB or HSL — is a daily
        skill for designers, front-end developers, illustrators and photographers. Most color quizzes
        online are either a single trick or buried under ads and sign-up walls. {SITE.name} tries to
        be the opposite: several genuinely different ways to practise, in a fast page that respects
        your time.
      </p>

      <h2>How it measures color</h2>
      <p>
        When the game decides how close your guess was, it compares colors in{' '}
        <a href="/color-distance">OKLab</a>, a color space built to match human perception, instead
        of raw RGB numbers. Light-versus-dark rounds use the WCAG 2.1 relative-luminance formula. That
        way a guess that <em>looks</em> close is scored as close.
      </p>

      <h2>How it’s built</h2>
      <p>
        {SITE.name} is a React and TypeScript app that runs entirely in your browser. Your progress is
        saved on your own device rather than on a server. Sounds are generated with the Web Audio API,
        so there’s nothing extra to download.
      </p>

      <h2>Who makes it</h2>
      <p>
        {SITE.name} is designed and built by{' '}
        <a href={SITE.author.url} target="_blank" rel="noopener">
          {SITE.author.name}
        </a>
        , a software engineer who cares about accessible, fast web interfaces. You can find the code
        and other projects on{' '}
        <a href={SITE.author.github} target="_blank" rel="noopener">
          GitHub
        </a>{' '}
        or say hello on{' '}
        <a href={SITE.author.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        .
      </p>
    </article>

    <div className="mt-10 flex flex-wrap gap-3">
      <ButtonLink to="/color-guessing-game">Play the game</ButtonLink>
      <ButtonLink to="/how-to-play" variant="secondary">
        How to play
      </ButtonLink>
    </div>
  </div>
);
