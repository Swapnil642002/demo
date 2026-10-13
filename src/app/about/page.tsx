import Image from "next/image";
import type { Metadata } from "next";
import { PageHeader, SectionHeading, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site, retiredClaims } from "@/data/site";
import { leadership } from "@/data/people";

export const metadata: Metadata = {
  title: "About the Institution",
  description:
    "History, mission and leadership of Shri Shaktimayi Ayurvedic Pharmacy & Nursing College, Azamgarh — established 2015 by Vaidya Satnarayan Pandey.",
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    year: "2007",
    title: "Pt Harihar Shashtri Sanskrit Mahavidyalaya",
    body: "Established by the college's founder, as stated on the existing website.",
  },
  {
    year: "2009",
    title: "Shri Shaktimayi Ayurvedic Pharmacy",
    body: "The pharmacy venture established by the same founder.",
  },
  {
    year: "2015",
    title: "Shri Shaktimayi Ayurvedic Pharmacy & Nursing College",
    body: "The college at Kharihani, Azamgarh, founded by Vaidya Satnarayan Pandey.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="An institution built on healthcare education"
        intro={`${site.shortName} was established in ${site.foundedYear} to prepare students for careers in nursing and Ayurvedic pharmacy.`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="Shaping tomorrow's healthcare leaders today"
            />
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              Shri Shaktimayi Ayurvedic Pharmacy and Nursing College, Azamgarh, was
              established in the year {site.foundedYear} by {site.founder}. It is dedicated
              to shaping the future of healthcare through its nursing and pharmacy
              programmes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              The college states its mission as empowering students with the knowledge,
              skills and compassion needed to excel in the ever-evolving fields of nursing
              and pharmacy, with an emphasis on practical, hands-on training.
            </p>

            <h3 className="mt-10 font-serif text-xl font-bold text-navy-900">
              Related institutions
            </h3>
            <ul className="mt-4 space-y-4 border-l-2 border-gold-500 pl-5">
              {timeline.map((item) => (
                <li key={item.year}>
                  <p className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                    {item.year}
                  </p>
                  <p className="mt-1 font-semibold text-navy-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ivory-300">
              <Image
                src="/images/about/about-4.jpeg"
                alt="Shri Shaktimayi Ayurvedic Pharmacy and Nursing College campus"
                width={780}
                height={811}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-ivory-300">
                <Image
                  src="/images/misc/mission.png"
                  alt="Illustration representing the college mission"
                  width={865}
                  height={660}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-ivory-300">
                <Image
                  src="/images/misc/vision.png"
                  alt="Illustration representing the college vision"
                  width={865}
                  height={660}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ leadership */}
      <section aria-labelledby="leadership-heading" className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="Meet our senior team"
              id="leadership-heading"
              align="center"
              intro="Names and roles exactly as published by the college. Qualifications, departments and tenure will be added once confirmed in writing."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {leadership.map((person) => (
              <Reveal key={person.id} as="article">
                <article className="surface flex h-full flex-col items-center rounded-xl p-6 text-center">
                  <Image
                    src={person.image.src}
                    alt={person.image.alt}
                    width={person.image.width}
                    height={person.image.height}
                    loading="lazy"
                    sizes="160px"
                    className="h-28 w-28 rounded-full border-2 border-gold-500 object-cover"
                  />
                  <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                    {person.role}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- transparency */}
      <section aria-labelledby="transparency-heading" className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Transparency"
            title="Claims we have deliberately not published"
            id="transparency-heading"
            intro="The previous website carried several statements that could not be substantiated. Rather than repeat them, we have left them out until the college supplies evidence."
          />
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {retiredClaims.map((c) => (
            <li key={c.claim} className="surface rounded-xl p-5">
              <p className="font-semibold text-navy-900">{c.claim}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{c.reason}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/admissions">Admission details</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact the college
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
