import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../../seo/site';

export const LogoMark: React.FC<{ className?: string }> = ({ className = 'h-7 w-7' }) => (
  <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
    <rect x="2" y="2" width="13" height="13" rx="3.5" fill="#F25F4C" />
    <rect x="17" y="2" width="13" height="13" rx="3.5" fill="#F5B83D" />
    <rect x="2" y="17" width="13" height="13" rx="3.5" fill="#3B66F5" />
    <rect x="17.5" y="17.5" width="12" height="12" rx="3.5" fill="#1FB58F" transform="rotate(12 23.5 23.5)" />
  </svg>
);

export const Logo: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Link
    to="/"
    onClick={onClick}
    className="flex items-center gap-2 rounded-md text-zinc-900 dark:text-white"
    aria-label={`${SITE.name} home`}
  >
    <LogoMark />
    <span className="text-[17px] font-semibold tracking-tight">{SITE.name}</span>
  </Link>
);
