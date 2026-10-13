import Link from "next/link";
import type { ReactNode } from "react";

/** Eyebrow + heading + optional intro, used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
  level = 2,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
  level?: 1 | 2 | 3;
  tone?: "light" | "dark";
}) {
  const Tag = (`h${level}` as unknown) as "h1" | "h2" | "h3";
  const titleColor = tone === "dark" ? "text-ivory-50" : "text-navy-900";
  const introColor = tone === "dark" ? "text-ivory-300" : "text-ink-600";

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-semibold tracking-[0.18em] uppercase ${
            tone === "dark" ? "text-gold-300" : "text-gold-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={`mt-3 font-serif text-2xl leading-tight font-bold text-balance-tight sm:text-3xl lg:text-4xl ${titleColor}`}
      >
        {title}
      </Tag>
      <span
        aria-hidden="true"
        className={`mt-4 rule-gold ${align === "center" ? "mx-auto" : ""}`}
      />
      {intro ? (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${introColor}`}>{intro}</p>
      ) : null}
    </div>
  );
}

type ButtonBase = {
  children: ReactNode;
  className?: string;
};

/** Primary navy button. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonBase & {
  href: string;
  variant?: "primary" | "gold" | "outline" | "outlineLight";
  external?: boolean;
}) {
  const styles = {
    primary: "bg-navy-800 text-ivory-50 hover:bg-navy-700",
    gold: "bg-gold-500 text-navy-950 hover:bg-gold-400",
    outline: "border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-ivory-50",
    outlineLight:
      "border border-ivory-300 text-ivory-50 hover:border-gold-400 hover:text-gold-300",
  }[variant];

  const external = "href" in rest && Boolean(rest.external);
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors ${styles} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Standard page banner for interior pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <div className="border-b border-ivory-300 bg-ivory-100">
      <div className="container-page py-12 sm:py-16 lg:py-20">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-600 sm:text-sm">
              {breadcrumb.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden="true">/</span> : null}
                  {c.href ? (
                    <Link href={c.href} className="link-underline hover:text-navy-800">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-navy-800">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} level={1} />
      </div>
    </div>
  );
}

/**
 * Honest empty state — used for notices/events that have not been published
 * yet, and for the testimonial section while quotes await approval.
 */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="surface rounded-xl px-6 py-12 text-center sm:px-10 sm:py-16">
      <span
        aria-hidden="true"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ivory-200 text-navy-700"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M3 9h18M8 2v4M16 2v4" />
        </svg>
      </span>
      <h3 className="mt-4 font-serif text-xl font-bold text-navy-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-600 sm:text-base">
        {body}
      </p>
      {action ? (
        <div className="mt-6">
          <ButtonLink href={action.href}>{action.label}</ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
