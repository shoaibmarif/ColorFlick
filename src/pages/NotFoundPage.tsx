import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { ButtonLink } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => (
  <div className="mx-auto max-w-xl py-16 text-center">
    <SeoMeta
      canonicalPath="/404"
      title="Page not found"
      description="The page you were looking for doesn’t exist."
      noindex
    />
    <p className="eyebrow">404</p>
    <h1 className="mt-2 text-3xl font-semibold">This page doesn’t exist</h1>
    <p className="mt-3 text-zinc-600 dark:text-zinc-400">
      The link may be old or mistyped. Try one of these instead.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <ButtonLink to="/color-guessing-game">Play the game</ButtonLink>
      <ButtonLink to="/" variant="secondary">
        Go to the homepage
      </ButtonLink>
    </div>
    <p className="mt-8 text-sm text-zinc-500">
      Looking for answers? See the <Link className="underline" to="/faq">FAQ</Link>.
    </p>
  </div>
);
