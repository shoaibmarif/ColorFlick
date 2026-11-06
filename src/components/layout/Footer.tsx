import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { NAV_GROUPS, SITE_LINKS } from './nav';
import { SITE } from '../../seo/site';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              A free color guessing game and a small set of color tools. No account, no ads — your
              progress stays in your browser.
            </p>
          </div>

          {NAV_GROUPS.map((group) => (
            <div key={group.id}>
              <h2 className="text-sm font-semibold">{group.label}</h2>
              <ul className="mt-3 space-y-2">
                {group.items.slice(0, 6).map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. Made by{' '}
            <a
              href={SITE.author.url}
              target="_blank"
              rel="noopener"
              className="text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {SITE.author.name}
            </a>
            .
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {SITE_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-zinc-900 dark:hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={SITE.author.github} target="_blank" rel="noopener" className="hover:text-zinc-900 dark:hover:text-white">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
