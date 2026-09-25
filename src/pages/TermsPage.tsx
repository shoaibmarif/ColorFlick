import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <SeoMeta
        title="Terms of Service - Color Guessing Game"
        description="Terms of service and usage guidelines for Color Guessing Game."
        canonicalPath="/terms"
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Last updated: September 20, 2026.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing and playing Color Guessing Game, you agree to these Terms of Service. If you do not agree with any part of these terms, you should discontinue use of the game.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            2. Permitted Use & Entertainment
          </h2>
          <p>
            The game is provided free of charge for personal educational, recreational, and training purposes. Because all game logic executes in the browser without an authoritative server, scores and streaks are client-side accomplishments and should not be treated as legally binding or official certifications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            3. Disclaimer of Warranties
          </h2>
          <p>
            The application is provided "as is" without warranties of any kind. Color representation can vary depending on individual monitor calibrations, display panels, operating system color profiles, and ambient lighting conditions.
          </p>
        </section>
      </div>
    </div>
  );
};
