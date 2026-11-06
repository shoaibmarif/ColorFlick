import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { Accordion } from '../components/ui/Accordion';
import { PageHeader } from '../components/layout/PageHeader';
import { FAQ_ITEMS } from '../data/faqData';
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

      <Accordion items={FAQ_ITEMS} />

      <div className="text-center pt-6">
        <ButtonLink to="/color-guessing-game" variant="primary" size="lg">
          Ready? Start playing
        </ButtonLink>
      </div>
    </div>
  );
};
