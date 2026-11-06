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

      <h2>Analytics and cookies</h2>
      <p>
        We use Google Analytics, loaded through Google Tag Manager, to understand, in
        aggregate, how many people visit, which pages they use and which game modes are popular (for example, “a game was completed in HEX mode”).
      </p>
      <p>
        Analytics cookies are <strong>off until you choose “Accept”</strong> in the cookie notice. If
        you decline, Google Analytics runs in a cookieless mode that only sends basic, anonymous
        signals without identifying you across visits. You can change your choice at any time with{' '}
        <strong>Cookie settings</strong> in the footer. We do not use advertising cookies, build ad
        profiles or sell data. See{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google’s privacy policy
        </a>{' '}
        for details.
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted on Vercel, which processes standard server logs (such as IP address and
        requested URL) to deliver the site and protect it from abuse.
      </p>

      <h2>Contact</h2>
      <p>
        If you get in touch with a question or bug report, we only use your details to reply. Questions
        about this policy can be sent to <a href={`mailto:${SITE.author.email}`}>{SITE.author.email}</a>.
      </p>
    </article>
  </div>
);
