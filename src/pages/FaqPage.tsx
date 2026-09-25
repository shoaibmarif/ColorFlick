import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { FAQ_ITEMS } from '../data/faqData';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const FaqPage: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <SeoMeta
        title="Frequently Asked Questions - Color Guessing Game FAQ"
        description="Find answers to all frequently asked questions about Color Guessing Game rules, RGB vs HEX, scoring, privacy, and accessibility."
        canonicalPath="/color-guessing-game-faq"
        structuredData={faqSchema}
      />

      <div className="space-y-3 text-center max-w-xl mx-auto">
        <div className="w-12 h-12 bg-brand-100 dark:bg-brand-950/60 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 mx-auto">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Everything you need to know about gameplay rules, scoring mathematics, privacy, and color science.
        </p>
      </div>

      {/* Accordion FAQ items */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => (
          <details
            key={idx}
            className="group p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs transition-colors cursor-pointer"
          >
            <summary className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white list-none flex justify-between items-center gap-3">
              <span>{item.question}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="text-center pt-6">
        <Link to="/color-guessing-game">
          <Button variant="primary" size="lg">
            Ready to Play? Start Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
