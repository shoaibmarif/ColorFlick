import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { NAV_GROUPS, SITE_LINKS } from './nav';
import { SITE } from '../../seo/site';
import { Globe, Mail } from 'lucide-react';
import { openConsentSettings } from '../../utils/consent';
import { Github, Linkedin } from '../ui/BrandIcons';

const SOCIAL = [
  { href: SITE.repo, label: 'ColorFlick on GitHub', Icon: Github },
  { href: SITE.author.linkedin, label: 'Shoaib Arif on LinkedIn', Icon: Linkedin },
  { href: SITE.author.url, label: 'Shoaib Arif’s portfolio', Icon: Globe },
  { href: `mailto:${SITE.author.email}`, label: 'Email Shoaib Arif', Icon: Mail },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="absolute inset-x-0 top-0 flex h-1" aria-hidden="true">
        <span className="flex-1 bg-coral-500" />
        <span className="flex-1 bg-sun-400" />
        <span className="flex-1 bg-mint-500" />
        <span className="flex-1 bg-brand-500" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              A free, open-source color game for anyone who loves playing with colors. No account, no
              ads — your progress stays in your browser.
            </p>
            <ul className="mt-5 flex gap-2">
              {SOCIAL.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener' })}
                    aria-label={label}
                    title={label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
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
              <a href={SITE.repo} target="_blank" rel="noopener" className="hover:text-zinc-900 dark:hover:text-white">
                Source code
              </a>
            </li>
            <li>
              <button type="button" onClick={openConsentSettings} className="hover:text-zinc-900 dark:hover:text-white">
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
