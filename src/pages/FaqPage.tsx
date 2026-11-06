import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { FAQ_ITEMS } from '../data/faqData';
import { ChevronDown } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';

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
      <SeoMeta canonicalPath="/faq" structuredData={faqSchema} />

      <PageHeader title="Frequently asked questions" intro="Answers about the game, scoring, privacy and color." />

      {/* Accordion FAQ items */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => (
          <details
            key={idx}
            className="group p-5 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-card transition-colors cursor-pointer"
          >
            <summary className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-white list-none flex justify-between items-center gap-3">
              <span>{item.question}</span>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform flex-shrink-0" />
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-700/60 pt-3">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="text-center pt-6">
        <ButtonLink to="/color-guessing-game" variant="primary" size="lg">
            Ready to Play? Start Now
          </ButtonLink>
      </div>
    </div>
  );
};
