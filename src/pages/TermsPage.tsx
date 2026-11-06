import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { SITE } from '../seo/site';

export const TermsPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/terms" />
    <PageHeader title="Terms of use" intro="Last updated 6 November 2026." />

    <article className="prose-page">
      <p>By using {SITE.name} you agree to these terms. If you don’t agree, please don’t use the site.</p>

      <h2>Using the game</h2>
      <p>
        {SITE.name} is free for personal, educational and commercial use. Please don’t attempt to
        disrupt the site, overload it with automated traffic, or misrepresent it as your own work.
      </p>

      <h2>Your data</h2>
      <p>
        Game progress is stored in your browser. We can’t recover it if you clear your browser data
        or switch devices. See the <a href="/privacy">privacy policy</a> for details.
      </p>

      <h2>No warranty</h2>
      <p>
        The site and its tools are provided “as is”, without warranties of any kind. Colors look
        different on different screens and in different lighting, so don’t rely on {SITE.name} for
        professional color calibration or accessibility certification.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date at the top shows the latest version.</p>
    </article>
  </div>
);
