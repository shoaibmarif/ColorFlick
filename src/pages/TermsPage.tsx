import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { SITE } from '../seo/site';

export const TermsPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/terms" />
    <PageHeader title="Terms and conditions" intro="Last updated 6 November 2026." />

    <article className="prose-page">
      <p>
        These terms apply when you use {SITE.name} at{' '}
        <a href={SITE.url}>{SITE.url.replace('https://', '')}</a> (“the site”). By using the site you
        agree to them. If you don’t agree, please don’t use the site.
      </p>

      <h2>1. What {SITE.name} is</h2>
      <p>
        {SITE.name} is a free color game and a set of color tools, made for fun and learning. There are
        no accounts, subscriptions or in-app purchases.
      </p>

      <h2>2. Acceptable use</h2>
      <p>You’re welcome to play, share and link to the site. Please don’t:</p>
      <ul>
        <li>try to disrupt, overload or break the site, or send automated traffic to it;</li>
        <li>use the site for anything unlawful;</li>
        <li>present the site, its name or its design as your own.</li>
      </ul>

      <h2>3. Source code</h2>
      <p>
        The source code is publicly available on{' '}
        <a href={SITE.repo} target="_blank" rel="noopener">
          GitHub
        </a>
        . Any reuse of the code is governed by the license published in that repository; where no
        license is published, all rights are reserved by the author. The {SITE.name} name and logo
        identify this project - please don’t use them in a way that suggests your project is this one.
      </p>

      <h2>4. Your data</h2>
      <p>
        Scores, streaks and settings are stored in your browser on your device. They can’t be recovered
        if you clear your browser data or switch devices. See the <a href="/privacy">privacy policy</a>{' '}
        for what is collected and why.
      </p>

      <h2>5. Scores</h2>
      <p>
        Scores are for fun. They are stored locally and can be changed by anyone with access to the
        device, so they carry no prize, ranking or guarantee.
      </p>

      <h2>6. No warranty</h2>
      <p>
        The site and its tools are provided “as is”, without warranties of any kind. Colors look
        different on different screens and in different lighting, so don’t rely on {SITE.name} for
        professional color calibration, medical color-vision testing or accessibility certification.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the extent permitted by law, {SITE.author.name} is not liable for any loss or damage arising
        from your use of the site.
      </p>

      <h2>8. Changes</h2>
      <p>
        These terms may be updated from time to time. The date at the top shows the latest version.
        Continuing to use the site after a change means you accept the updated terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms? Email{' '}
        <a href={`mailto:${SITE.author.email}`}>{SITE.author.email}</a> or visit the{' '}
        <a href="/contact">contact page</a>.
      </p>
    </article>
  </div>
);
