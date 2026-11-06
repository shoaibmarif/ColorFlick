import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { SITE } from '../seo/site';

export const PrivacyPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/privacy" />
    <PageHeader title="Privacy policy" intro="Last updated 6 November 2026." />

    <article className="prose-page">
      <p>
        {SITE.name} is a game that runs in your browser. There are no accounts and no game server, so
        we hold very little information about you. This page explains exactly what is collected.
      </p>

      <h2>Information you don’t need to give us</h2>
      <p>
        You can play without registering. We never ask for your name, email address, phone number or
        a social login.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Your settings (theme, sound, accessibility options), game statistics, daily challenge results
        and achievements are saved in your browser’s <code>localStorage</code>. This data stays on
        your device and is not sent to us. You can delete it at any time from <strong>Settings → Reset
        all data</strong>, or by clearing this site’s data in your browser.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics to understand, in aggregate, how many people visit and which pages
        they use. Google Analytics sets cookies and collects information such as the pages you view,
        your approximate location, device type and browser. We do not use it to build advertising
        profiles and we do not sell data. You can opt out with a content blocker or Google’s{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          opt-out add-on
        </a>
        . See{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google’s privacy policy
        </a>{' '}
        for details.
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted on Netlify, which processes standard server logs (such as IP address and
        requested URL) to deliver the site and protect it from abuse.
      </p>

      <h2>Contact</h2>
      <p>
        If you get in touch with a question or bug report, we only use your details to reply. Questions
        about this policy can be sent via the <a href="/contact">contact page</a>.
      </p>
    </article>
  </div>
);
