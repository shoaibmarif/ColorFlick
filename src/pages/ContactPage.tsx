import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { SITE } from '../seo/site';

const ISSUES_URL = 'https://github.com/shoaibmarif/colorflick/issues';

export const ContactPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/contact" />
    <PageHeader
      title="Contact"
      intro={`Found a bug, have an idea, or just want to say hello? ${SITE.name} is built and maintained by ${SITE.author.name}.`}
    />

    <div className="grid gap-4 sm:grid-cols-2">
      <a href={ISSUES_URL} target="_blank" rel="noopener" className="card block p-6 hover:border-zinc-300 dark:hover:border-zinc-700">
        <span className="font-medium">Report a bug or request a feature</span>
        <span className="mt-2 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Open an issue on GitHub. Please include your browser, device and what you expected to happen.
        </span>
      </a>
      <a href={SITE.author.linkedin} target="_blank" rel="noopener" className="card block p-6 hover:border-zinc-300 dark:hover:border-zinc-700">
        <span className="font-medium">Get in touch directly</span>
        <span className="mt-2 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Send a message to {SITE.author.name} on LinkedIn, or see more work at{' '}
          <span className="underline">{SITE.author.url.replace(/^https:\/\/|\/$/g, '')}</span>.
        </span>
      </a>
    </div>

    <div className="prose-page mt-10">
      <h2>Reporting an accessibility problem</h2>
      <p>
        If something is hard to read, hard to reach with a keyboard or screen reader, or relies on
        color alone, we want to fix it. Tell us which page and setting you were using, and whether
        display features such as Night Shift or True Tone were turned on.
      </p>
    </div>
  </div>
);
