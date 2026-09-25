import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { Mail, Bug } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <SeoMeta
        title="Contact Us - Color Guessing Game"
        description="Have a question, feedback, or found a bug? Get in touch with the Color Guessing Game maintainers."
        canonicalPath="/contact"
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Have feedback, color suggestions, or found a bug? We would love to hear from you.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-brand-600" />
            <span>Direct Email</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Because this application runs purely client-side without external backend servers, we do not employ automated contact form submissions. You can reach out directly via email:
          </p>
          <div className="pt-2">
            <a
              href="mailto:contact@colorguess.game"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-mono font-bold text-sm rounded-xl border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>contact@colorguess.game</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-700/60 pt-6 space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bug className="w-4 h-4 text-amber-500" />
            <span>Bug Reports & Accessibility Feedback</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            If you experience an issue with color contrast, screen reader announcements, touch targets, or device compatibility, please include your device model, browser version, and display settings (such as True Tone or Night Shift) in your email.
          </p>
        </div>
      </div>
    </div>
  );
};
