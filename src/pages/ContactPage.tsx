import React from 'react';
import { Mail, Globe, Bug } from 'lucide-react';
import { Github, Linkedin } from '../components/ui/BrandIcons';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { SITE } from '../seo/site';

const CHANNELS = [
  {
    href: `mailto:${SITE.author.email}?subject=${encodeURIComponent('ColorFlick')}`,
    icon: Mail,
    tint: 'bg-coral-100 text-coral-700 dark:bg-coral-900/40 dark:text-coral-200',
    title: 'Email',
    value: SITE.author.email,
    body: 'The quickest way to reach me. Questions, ideas, feedback, or just hello.',
  },
  {
    href: SITE.author.linkedin,
    icon: Linkedin,
    tint: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200',
    title: 'LinkedIn',
    value: 'linkedin.com/in/shoaibmarif',
    body: 'Connect or send a message on LinkedIn.',
  },
  {
    href: SITE.author.url,
    icon: Globe,
    tint: 'bg-mint-100 text-mint-700 dark:bg-mint-900/40 dark:text-mint-200',
    title: 'Portfolio',
    value: 'shoaibarif.vercel.app',
    body: 'See what else I’ve been working on.',
  },
  {
    href: SITE.issues,
    icon: Bug,
    tint: 'bg-sun-100 text-sun-800 dark:bg-sun-900/40 dark:text-sun-200',
    title: 'Report a bug',
    value: 'GitHub issues',
    body: 'Found something broken? Open an issue with your browser, device and what happened.',
  },
];

export const ContactPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/contact" />
    <PageHeader
      title="Contact"
      intro={`${SITE.name} is built and maintained by ${SITE.author.name}. I’d love to hear from you.`}
    />

    <ul className="grid gap-4 sm:grid-cols-2">
      {CHANNELS.map((c) => {
        const external = !c.href.startsWith('mailto:');
        return (
          <li key={c.title}>
            <a
              href={c.href}
              {...(external ? { target: '_blank', rel: 'noopener' } : {})}
              className="card flex h-full gap-4 p-5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${c.tint}`}>
                <c.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-medium">{c.title}</span>
                <span className="block break-all text-sm text-brand-600 dark:text-brand-400">{c.value}</span>
                <span className="mt-1 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{c.body}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>

    <div className="prose-page mt-12">
      <h2>Open source</h2>
      <p>
        {SITE.name}’s code is public on{' '}
        <a href={SITE.repo} target="_blank" rel="noopener">
          GitHub
        </a>
        . Pull requests and suggestions for new game modes are welcome.
      </p>

      <h2>Reporting an accessibility problem</h2>
      <p>
        If something is hard to read, hard to reach with a keyboard or screen reader, or relies on color
        alone, please tell me. Mention the page and setting you were using, and whether display features
        such as Night Shift or True Tone were turned on.
      </p>
    </div>

    <p className="mt-10 flex items-center gap-2 text-sm text-zinc-500">
      <Github className="h-4 w-4" aria-hidden="true" />
      <a href={SITE.repo} target="_blank" rel="noopener" className="hover:text-zinc-900 dark:hover:text-white">
        github.com/shoaibmarif/colorflick
      </a>
    </p>
  </div>
);
