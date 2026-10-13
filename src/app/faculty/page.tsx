import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader, SectionHeading, ButtonLink, EmptyState } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { leadership } from "@/data/people";

export const metadata: Metadata = {
  title: "Faculty & Leadership",
  description:
    "Leadership team of Shri Shaktimayi Ayurvedic Pharmacy & Nursing College: Principal, Manager and Director, as published by the college.",
  alternates: { canonical: "/faculty" },
};

export default function FacultyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our people"
        title="Faculty & leadership"
        intro="The college currently publishes its three senior leadership roles. Full faculty profiles will be added as the college supplies them."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Faculty" }]}
      />

      <section aria-labelledby="leadership-heading" className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Leadership"
            title="Senior team"
            id="leadership-heading"
            intro="Names and designations reproduced exactly as published. No qualifications, departments or tenure have been added, because none are published."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person, i) => (
            <Reveal key={person.id} delay={i * 0.08} as="article">
              <article className="surface flex h-full flex-col items-center rounded-xl p-6 text-center sm:p-8">
                <Image
                  src={person.image.src}
                  alt={person.image.alt}
                  width={person.image.width}
                  height={person.image.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 128px, 160px"
                  className="h-32 w-32 rounded-full border-2 border-gold-500 object-cover sm:h-36 sm:w-36"
                />
                <h2 className="mt-5 font-serif text-xl font-bold text-navy-900">
                  {person.name}
                </h2>
                <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                  {person.role}
                </p>
                {person.bio ? (
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{person.bio}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="faculty-list-heading" className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Teaching staff"
              title="Departmental faculty"
              id="faculty-list-heading"
              align="center"
            />
          </Reveal>
          <div className="mx-auto mt-8 max-w-3xl">
            <EmptyState
              title="Faculty profiles to follow"
              body="The existing website does not publish a teaching-staff list, qualifications or department allocations. Rather than invent profiles, we have left this space for the college to supply verified details."
              action={{ label: "Send faculty details", href: "/contact" }}
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Join us"
            title="Work at Shri Shaktimayi"
            intro="If you are an experienced nursing or Ayurvedic pharmacy educator and would like to teach here, get in touch with the college office."
            align="center"
          />
        </Reveal>
        <div className="mt-8 text-center">
          <ButtonLink href="/contact" variant="gold">
            Contact the college
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
