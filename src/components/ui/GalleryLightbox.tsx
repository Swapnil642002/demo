"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/data/people";

/**
 * Accessible lightbox: opens from a grid of buttons and remembers the
 * triggering element. ArrowLeft/ArrowRight navigate, Home/End jump, Escape
 * closes, focus moves into the dialog and returns to the trigger on close,
 * and background scroll is locked while open.
 */
export function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);

  const move = useCallback(
    (delta: number) => {
      setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "Home") setIndex(0);
      else if (e.key === "End") setIndex(items.length - 1);
      else if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, move, items.length]);

  const active = index === null ? null : items[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setIndex(i);
              }}
              className="relative block w-full overflow-hidden rounded-lg border border-ivory-300 bg-ivory-200"
              aria-label={`Open image ${i + 1} of ${items.length}: ${item.alt}`}
            >
              <span className="block aspect-[4/3] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading={i < 4 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${active.alt}`}
          className="fixed inset-0 z-[90] flex flex-col bg-navy-950/95 p-4 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ivory-300">
              {(index ?? 0) + 1} / {items.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-md border border-ivory-500 px-3 py-2 text-sm font-semibold text-ivory-50 hover:border-gold-400 hover:text-gold-300"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-3 py-4">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous image"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory-500 text-ivory-50 hover:border-gold-400 hover:text-gold-300"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="min-w-0 flex-1 text-center">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                priority
                sizes="90vw"
                className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
              />
              <p className="mt-3 text-sm text-ivory-300">{active.alt}</p>
            </div>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next image"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory-500 text-ivory-50 hover:border-gold-400 hover:text-gold-300"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <p className="text-center text-xs text-ivory-400">
            Use the left and right arrow keys to move between images, Escape to close.
          </p>
        </div>
      ) : null}
    </>
  );
}
