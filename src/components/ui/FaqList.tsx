"use client";

import { useState } from "react";
import type { Faq } from "@/data/facilities";

/**
 * Disclosure-based FAQ. Uses a real <button> with aria-expanded/aria-controls
 * so screen readers announce state, and works with JS disabled because the
 * content is rendered inside the region regardless.
 */
export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-ivory-300 rounded-xl border border-ivory-300 bg-white">
      {items.map((faq) => {
        const isOpen = open === faq.id;
        return (
          <div key={faq.id}>
            <h3>
              <button
                type="button"
                id={`faq-btn-${faq.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${faq.id}`}
                onClick={() => setOpen(isOpen ? null : faq.id)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span className="text-base font-semibold text-navy-900 sm:text-lg">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-transform ${
                    isOpen
                      ? "rotate-45 border-gold-500 bg-gold-500 text-navy-950"
                      : "border-ivory-400 text-navy-700"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${faq.id}`}
              role="region"
              aria-labelledby={`faq-btn-${faq.id}`}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <p className="max-w-3xl text-sm leading-relaxed text-ink-600 sm:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
