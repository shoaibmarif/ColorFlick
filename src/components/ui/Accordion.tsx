import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export interface AccordionEntry {
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionEntry[];
  /** "cards" = separate rounded cards, "lines" = divided list. */
  variant?: 'cards' | 'lines';
  /** Allow only one answer open at a time. */
  single?: boolean;
}

/**
 * Animated FAQ accordion. Answers slide open/closed (height + fade) instead of
 * popping in. Collapsed answers stay in the DOM — readable by search engines —
 * but are inert, so keyboard and screen-reader users only reach open ones.
 */
export const Accordion: React.FC<AccordionProps> = ({ items, variant = 'cards', single = false }) => {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(single ? [] : prev);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div
      className={
        variant === 'cards'
          ? 'space-y-3'
          : 'divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800'
      }
    >
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div
            key={item.question}
            className={
              variant === 'cards'
                ? `rounded-xl border bg-white transition-[border-color,box-shadow] duration-300 dark:bg-zinc-900 ${
                    isOpen
                      ? 'border-brand-300 shadow-card dark:border-brand-800'
                      : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
                  }`
                : ''
            }
          >
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className={`flex w-full items-center justify-between gap-4 text-left font-medium text-zinc-900 dark:text-zinc-100 ${
                  variant === 'cards' ? 'px-5 py-4' : 'py-4'
                }`}
              >
                <span>{item.question}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ease-out ${
                    isOpen
                      ? 'rotate-45 bg-brand-600 text-white'
                      : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`text-[15px] leading-7 text-zinc-600 transition-transform duration-300 ease-out dark:text-zinc-400 ${
                    isOpen ? 'translate-y-0' : '-translate-y-1'
                  } ${variant === 'cards' ? 'px-5 pb-5' : 'pb-4 pr-11'}`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
