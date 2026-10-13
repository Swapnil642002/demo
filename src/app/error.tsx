"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Section";

/**
 * Route-level error boundary. Shown when a segment throws during rendering
 * or data loading. Offers a retry (re-renders the segment) and safe exits.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route-error]", error.message, error.digest ?? "");
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
        Something went wrong
      </p>
      <h1 className="mt-4 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">
        We could not load this page
      </h1>
      <span aria-hidden="true" className="mt-5 block rule-gold" />
      <p className="mt-5 max-w-md text-base leading-relaxed text-ink-600">
        An unexpected error stopped this page from loading. Please try again — if the
        problem persists, call the college on +91 87262 74444.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-800 px-5 py-3 text-sm font-semibold text-ivory-50 transition-colors hover:bg-navy-700"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}
