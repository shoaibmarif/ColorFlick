import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { ShieldCheck, Lock, Database, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <SeoMeta
        title="Privacy Policy - Color Guessing Game"
        description="Our privacy commitment: 100% client-side web application. No accounts, no backend database, no tracking cookies. All game data stays on your device."
        canonicalPath="/privacy"
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Last updated: September 20, 2026. Built with privacy-by-design at its core.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            <span>1. No Account or Personal Information Required</span>
          </h2>
          <p>
            You can use Color Guessing Game completely anonymously. We do not require account registration, passwords, email addresses, phone numbers, or social media logins.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-brand-500" />
            <span>2. Local Storage Usage</span>
          </h2>
          <p>
            The game stores your game preferences (sound volume, theme, high contrast settings), gameplay statistics (rounds played, accuracy, high scores), daily challenge status, and unlocked achievements strictly on your device using the browser's standard <code>localStorage</code> API under the <code>colorGuessing.*</code> namespace.
          </p>
          <p>
            This data never leaves your browser and is never sent to any external server. You can wipe all stored data at any time via the Settings menu or by clearing your browser's site data.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-sky-500" />
            <span>3. No Tracking Cookies or Third-Party Analytics</span>
          </h2>
          <p>
            We do not use tracking cookies, behavioral ad pixels, or third-party behavioral profiling scripts. The entire game logic, color mathematics, audio generation, and seeded random number generation run locally in the client runtime.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>4. Contact & Inquiries</span>
          </h2>
          <p>
            If you contact us via email regarding bug reports, feature suggestions, or accessibility inquiries, your email address will only be used to respond directly to your inquiry and will never be shared, sold, or used for marketing lists.
          </p>
        </section>
      </div>
    </div>
  );
};
