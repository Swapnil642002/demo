import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader, SectionHeading, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — GNM Nursing & D.Pharma in Ayurveda",
  description:
    "Explore the two diploma programmes at Shri Shaktimayi: General Nursing and Midwifery (GNM), 3 years 6 months, and D.Pharma in Ayurveda, 2 years 3 months. Fees and eligibility listed.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our courses"
        title="Programmes designed for healthcare careers"
        intro="Two diploma programmes with published duration, eligibility and fee information. Select a course for the full curriculum and career pathways."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Courses" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {courses.map((course, i) => (
            <Reveal key={course.slug} delay={i * 0.1} as="article">
              <article className="surface flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] bg-ivory-200">
                  <Image
                    src={course.image.src}
                    alt={course.image.alt}
                    width={course.image.width}
                    height={course.image.height}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                    {course.award} · {course.duration}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-navy-900">
                    {course.name}
                  </h2>
                  <span aria-hidden="true" className="mt-3 block rule-gold" />

                  <dl className="mt-5 space-y-3">
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 text-xs font-semibold text-ink-600 uppercase">
                        Duration
                      </dt>
                      <dd className="text-sm font-medium text-navy-900">
                        {course.durationDetail}
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 text-xs font-semibold text-ink-600 uppercase">
                        Fees
                      </dt>
                      <dd className="text-sm font-medium text-navy-900">{course.fees}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-28 shrink-0 text-xs font-semibold text-ink-600 uppercase">
                        Eligibility
                      </dt>
                      <dd className="text-sm font-medium text-navy-900">
                        {course.eligibility}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-600">
                    {course.overview}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href={`/courses/${course.slug}`}>
                      Full course details
                    </ButtonLink>
                    <ButtonLink href="/contact#enquiry" variant="outline">
                      Enquire
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Not sure yet?"
              title="We can help you choose"
              id="choose-heading"
              intro="If you are unsure which programme fits your background and goals, send us an enquiry and the admissions team will explain the options."
              align="center"
            />
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact#enquiry" variant="gold">
              Send an enquiry
            </ButtonLink>
            <ButtonLink href="/admissions" variant="outline">
              Admission &amp; eligibility
            </ButtonLink>
          </div>
          <p className="mt-6 text-center text-sm text-ink-600">
            Looking for something else?{" "}
            <Link href="/contact" className="font-semibold text-navy-800 underline underline-offset-4">
              Contact us
            </Link>{" "}
            and we will let you know.
          </p>
        </div>
      </section>
    </>
  );
}
