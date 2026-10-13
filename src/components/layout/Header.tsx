"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, contact } from "@/data/site";
import { announcementText } from "@/components/layout/announcement";

const CTA = { label: "Enquire now", href: "/contact#enquiry" };

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile panel whenever the route changes. Deriving from a
  // previous pathname during render avoids an effect-driven cascading render.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Escape closes the panel; Tab is trapped inside it while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {announcementText ? (
        <div className="bg-navy-900 text-ivory-100">
          <div className="container-page flex items-center justify-between gap-4 py-2 text-xs sm:text-sm">
            <p className="truncate">
              <span className="font-semibold text-gold-300">Notice: </span>
              {announcementText}
            </p>
            <div className="hidden shrink-0 items-center gap-4 sm:flex">
              <a href={`tel:${contact.phoneE164}`} className="link-underline font-medium hover:text-gold-300">
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="link-underline font-medium hover:text-gold-300">
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <header className="sticky top-0 z-50 border-b border-ivory-300 bg-ivory-50/95 backdrop-blur-sm">
        <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${site.name} — home`}>
            <Image
              src="/images/logo.jpg"
              alt=""
              width={44}
              height={44}
              priority
              className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
            />
            <span className="min-w-0">
              <span className="block truncate font-serif text-sm leading-tight font-bold text-navy-800 sm:text-base">
                Shri Shaktimayi
              </span>
              <span className="block truncate text-[11px] leading-tight text-ink-600 sm:text-xs">
                Ayurvedic Pharmacy &amp; Nursing College
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-ivory-200 text-navy-900"
                        : "text-ink-700 hover:bg-ivory-100 hover:text-navy-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={CTA.href}
              className="hidden rounded-md bg-navy-800 px-4 py-2.5 text-sm font-semibold text-ivory-50 transition-colors hover:bg-navy-700 sm:inline-flex"
            >
              {CTA.label}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-ivory-300 bg-white text-navy-800 lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-menu"
            ref={panelRef}
            className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-ivory-300 bg-ivory-50 sm:top-20 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-4">
              <ul className="divide-y divide-ivory-300">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-base font-medium ${
                        isActive(item.href) ? "text-navy-900" : "text-ink-700"
                      }`}
                    >
                      {item.label}
                      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={CTA.href}
                className="mt-6 flex w-full items-center justify-center rounded-md bg-navy-800 px-4 py-3.5 font-semibold text-ivory-50"
              >
                {CTA.label}
              </Link>
              <div className="mt-6 space-y-3 border-t border-ivory-300 pt-6 text-sm">
                <a href={`tel:${contact.phoneE164}`} className="block font-medium text-navy-800">
                  {contact.phoneDisplay}
                </a>
                <a href={`mailto:${contact.email}`} className="block font-medium text-navy-800">
                  {contact.email}
                </a>
                <p className="text-ink-600">{contact.fullAddress}</p>
              </div>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}
