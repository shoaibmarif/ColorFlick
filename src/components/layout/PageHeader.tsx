import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getBreadcrumbs } from '../../seo/routes';

interface PageHeaderProps {
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Defaults to the current path. */
  path?: string;
  align?: 'left' | 'center';
  children?: React.ReactNode;
}

/** Breadcrumbs + H1 + intro used at the top of every inner page. */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, intro, path, align = 'left', children }) => {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(path ?? pathname);

  return (
    <header className={`mb-10 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}`}>
      {crumbs.length > 1 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className={`flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 ${align === 'center' ? 'justify-center' : ''}`}>
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-zinc-700 dark:text-zinc-300">
                    {c.label}
                  </span>
                ) : (
                  <Link to={c.path} className="hover:text-zinc-900 dark:hover:text-white">
                    {c.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
      {intro && <p className="mt-3 text-lg leading-8 text-zinc-600 dark:text-zinc-400">{intro}</p>}
      {children}
    </header>
  );
};
