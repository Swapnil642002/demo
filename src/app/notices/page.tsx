import type { Metadata } from "next";
import { PageHeader, SectionHeading, EmptyState, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { publishedNotices, notices } from "@/data/admissions";

export const metadata: Metadata = {
  title: "Notices & Events",
  description:
    "Official notices, announcements and event updates from Shri Shaktimayi Ayurvedic Pharmacy & Nursing College, Azamgarh.",
  alternates: { canonical: "/notices" },
};

const categoryLabel: Record<string, string> = {
  admission: "Admission",
  exam: "Examination",
  event: "Event",
  general: "General",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function NoticesPage() {
  const draftCount = notices.length - publishedNotices.length;

  return (
    <>
      <PageHeader
        eyebrow="Notices & events"
        title="Latest updates"
        intro="Official announcements from the college office. Only notices approved for publication appear here."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Notices" }]}
      />

      <section aria-labelledby="notices-heading" className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Announcements"
            title="Current notices"
            id="notices-heading"
          />
        </Reveal>

        <div className="mt-8">
          {publishedNotices.length === 0 ? (
            <EmptyState
              title="No notices published yet"
              body="There are no approved notices to show. When the college publishes an announcement — admission dates, examination schedules or events — it will appear on this page. In the meantime, please call the office or check back soon."
              action={{ label: "Contact the college", href: "/contact" }}
            />
          ) : (
            <ul className="space-y-4">
              {publishedNotices.map((n) => (
                <li key={n.id} className="surface rounded-xl p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-navy-800 px-2.5 py-1 font-semibold text-ivory-50">
                      {categoryLabel[n.category] ?? "General"}
                    </span>
                    <time dateTime={n.date} className="text-ink-600">
                      {formatDate(n.date)}
                    </time>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-bold text-navy-900">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{n.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {draftCount > 0 ? (
          <p className="mt-8 rounded-lg border border-gold-500 bg-ivory-100 px-5 py-4 text-sm leading-relaxed text-navy-900">
            <strong>Draft notice pending:</strong> {draftCount} notice
            {draftCount > 1 ? "s are" : " is"} written but held as a draft until the college
            approves publication. Set <code className="rounded bg-white px-1">status: &quot;published&quot;</code> in{" "}
            <code className="rounded bg-white px-1">src/data/admissions.ts</code> to release{" "}
            {draftCount > 1 ? "them" : "it"}.
          </p>
        ) : null}
      </section>

      <section aria-labelledby="events-heading" className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Events"
              title="Upcoming events"
              id="events-heading"
              align="center"
            />
          </Reveal>
          <div className="mx-auto mt-8 max-w-3xl">
            <EmptyState
              title="No events scheduled"
              body="No college events, open days or examination dates have been published for the current session. Events will be listed here as soon as they are announced."
              action={{ label: "Enquire about admission dates", href: "/contact#enquiry" }}
            />
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/admissions" variant="outline">
              Admission process
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
