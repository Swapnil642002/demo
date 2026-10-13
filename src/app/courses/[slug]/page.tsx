import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourse } from "@/data/courses";
import { PageHeader, SectionHeading, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: `${course.name} — Duration, Fees & Eligibility`,
    description: `${course.name}: ${course.duration} programme. Fees ${course.fees}. Eligibility: ${course.eligibility}. Full curriculum and career pathways.`,
    alternates: { canonical: `/courses/${course.slug}` },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const otherCourses = courses.filter((c) => c.slug !== course.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${course.award} programme`}
        title={course.name}
        intro={course.durationDetail}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: course.shortName },
        ]}
      />

      {/* ------------------------------------------------------ key facts */}
      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="surface rounded-xl p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
              Duration
            </p>
            <p className="mt-2 font-serif text-2xl font-bold text-navy-900">
              {course.duration}
            </p>
            <p className="mt-1 text-sm text-ink-600">{course.durationDetail}</p>
          </div>
          <div className="surface rounded-xl p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
              Fees
            </p>
            <p className="mt-2 font-serif text-2xl font-bold text-navy-900">{course.fees}</p>
            <p className="mt-1 text-sm text-ink-600">As published on the existing website</p>
          </div>
          <div className="surface rounded-xl p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
              Eligibility
            </p>
            <p className="mt-2 font-serif text-xl font-bold text-navy-900">
              {course.eligibility}
            </p>
            <p className="mt-1 text-sm text-ink-600">10+2 or equivalent</p>
          </div>
        </div>

        <p className="mt-5 rounded-lg border border-gold-500 bg-ivory-100 px-5 py-4 text-sm leading-relaxed text-navy-900">
          <strong>Please confirm before applying:</strong> {course.feesNote}
        </p>
      </section>

      {/* -------------------------------------------------------- overview */}
      <section className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading eyebrow="Overview" title={`About ${course.shortName}`} />
            <p className="mt-5 text-base leading-relaxed text-ink-600">{course.overview}</p>
            <h3 className="mt-8 font-serif text-lg font-bold text-navy-900">
              Eligibility in detail
            </h3>
            <p className="mt-2 text-base leading-relaxed text-ink-600">
              {course.eligibilityDetail}
            </p>

            <h3 className="mt-8 font-serif text-lg font-bold text-navy-900">
              Admission process
            </h3>
            <ol className="mt-3 space-y-2">
              {course.admissionSteps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-ink-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-gold-300">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact#enquiry" variant="gold">
                Enquire about {course.shortName}
              </ButtonLink>
              <ButtonLink href="/admissions" variant="outline">
                Eligibility &amp; documents
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ivory-300 bg-white">
              <Image
                src={course.image.src}
                alt={course.image.alt}
                width={course.image.width}
                height={course.image.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ curriculum */}
      <section aria-labelledby="curriculum-heading" className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Curriculum"
            title="What you will study"
            id="curriculum-heading"
            align="center"
            intro="Subject areas as published by the college. The detailed syllabus should be confirmed with the admissions office."
          />
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {course.curriculum.map((block, i) => (
            <Reveal key={block.year} delay={i * 0.08} as="li">
              <li className="surface h-full rounded-xl p-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                  {block.year}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {block.subjects.map((s) => (
                    <li key={s} className="flex gap-2.5 text-sm text-ink-700">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------- skills/careers */}
      <section className="bg-navy-800 py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Capabilities you will build"
              tone="dark"
            />
            <ul className="mt-8 space-y-5">
              {course.skills.map((s) => (
                <li key={s.title} className="border-l-2 border-gold-500 pl-4">
                  <p className="font-semibold text-ivory-50">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ivory-300">{s.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Careers"
              title="Where this qualification can take you"
              tone="dark"
            />
            <ul className="mt-8 space-y-5">
              {course.careers.map((c) => (
                <li key={c.title} className="border-l-2 border-gold-500 pl-4">
                  <p className="font-semibold text-ivory-50">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ivory-300">{c.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- points to check */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Please verify"
            title="Open questions for this programme"
            intro="These points appear on the existing website in inconsistent or incomplete form. The college should confirm them before this page goes live."
          />
        </Reveal>
        <ul className="mt-8 space-y-3">
          {course.openNotes.map((note) => (
            <li key={note} className="surface flex gap-3 rounded-lg p-4 text-sm text-ink-700">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </span>
              {note}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------- other courses */}
      <section className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Other programme" title="Also offered" align="center" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:max-w-3xl lg:mx-auto">
            {otherCourses.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="surface group flex items-center gap-4 rounded-xl p-5 transition-colors hover:border-gold-500"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-ivory-200">
                  <Image
                    src={c.image.src}
                    alt=""
                    width={c.image.width}
                    height={c.image.height}
                    loading="lazy"
                    sizes="80px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-navy-900 group-hover:text-gold-700">
                    {c.name}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-600">
                    {c.duration} · {c.fees}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
