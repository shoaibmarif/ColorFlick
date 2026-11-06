import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_EVENT, getConsent, setConsent, ConsentChoice } from '../../utils/consent';

/** Small, non-blocking cookie notice. Analytics cookies stay off until "Accept". */
export const ConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (c: ConsentChoice) => {
    setConsent(c);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-xl rounded-xl border border-zinc-200 bg-white p-4 shadow-pop dark:border-zinc-800 dark:bg-zinc-900 sm:inset-x-auto sm:right-4 sm:bottom-4"
    >
      <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        May we use analytics cookies to see how many people play and which modes they like? No ads, no
        selling data. <Link to="/privacy" className="underline underline-offset-2">Privacy policy</Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose('granted')}
          className="h-9 rounded-lg bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-700"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose('denied')}
          className="h-9 rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          No thanks
        </button>
      </div>
    </div>
  );
};
