import type { Metadata } from "next";
import { PageHeader, SectionHeading, ButtonLink } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/ui/FaqList";
import { courses } from "@/data/courses";
import { admissionSteps, indicativeDocuments } from "@/data/admissions";
import { faqs } from "@/data/facilities";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Admissions & Eligibility",
  description:
    "Admission process, eligibility criteria, fee information and document checklist for GNM and D.Pharma in Ayurveda at Shri Shaktimayi, Azamgarh.",
  alternates: { canonical: "/admissions" },
};

const admissionFaqs = faqs.filter((f) => f.category === "admissions");

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="How to apply"
        intro="A four-step admission process, eligibility criteria for each programme, and the documents you will need."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />

      {/* ----------------------------------------------------------- steps */}
      <section aria-labelledby="steps-heading" className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="The process"
            title="Four steps to enrolment"
            id="steps-heading"
            intro="As published by the college on its existing website."
          />
        </Reveal>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08} as="li">
              <li className="surface h-full rounded-xl p-6">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 font-serif text-lg font-bold text-gold-300"
                >
                  {step.step}
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <p className="mt-6 rounded-lg border border-gold-500 bg-ivory-100 px-5 py-4 text-sm leading-relaxed text-navy-900">
          <strong>Open question:</strong> the college lists an entrance step but does not
          name the test. Please confirm with the office whether an entrance examination
          applies to your session.
        </p>
      </section>

      {/* ----------------------------------------------------- eligibility */}
      <section aria-labelledby="eligibility-heading" className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Eligibility"
              title="Programme-by-programme criteria"
              id="eligibility-heading"
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {courses.map((course) => (
              <Reveal key={course.slug} as="article">
                <article className="surface h-full rounded-xl p-6 sm:p-8">
                  <h3 className="font-serif text-xl font-bold text-navy-900">
                    {course.name}
                  </h3>
                  <span aria-hidden="true" className="mt-3 block rule-gold" />
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                        Minimum qualification
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink-700">
                        {course.eligibilityDetail}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                        Duration
                      </dt>
                      <dd className="mt-1 text-sm text-ink-700">{course.durationDetail}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                        Published fee
                      </dt>
                      <dd className="mt-1 text-sm text-ink-700">
                        <strong>{course.fees}</strong>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6">
                    <ButtonLink href={`/courses/${course.slug}`} variant="outline">
                      Course details
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- documents */}
      <section aria-labelledby="docs-heading" className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Document verification"
              title="Documents to keep ready"
              id="docs-heading"
              intro="A standard checklist for diploma admissions in India. The college has not published an official list, so please confirm the exact requirements with the admissions office."
            />
            <ul className="mt-6 space-y-3">
              {indicativeDocuments.map((d) => (
                <li
                  key={d.label}
                  className="surface flex items-start justify-between gap-4 rounded-lg px-5 py-4"
                >
                  <span className="text-sm font-medium text-navy-900">{d.label}</span>
                  <span className="shrink-0 text-xs text-ink-600">{d.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading eyebrow="FAQ" title="Admission questions" />
            <div className="mt-6">
              <FaqList items={admissionFaqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- enquiry */}
      <section id="enquiry" aria-labelledby="apply-heading" className="bg-navy-900 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Apply now"
              title="Send your admission enquiry"
              id="apply-heading"
              tone="dark"
              intro="Fill in the form and the admissions team will contact you with the current session's dates, fee structure and next steps."
            />
            <p className="mt-6 text-sm leading-relaxed text-ivory-300">
              Prefer to talk? Call{" "}
              <a href="tel:+918726274444" className="link-underline font-semibold text-gold-300 hover:text-gold-400">
                +91 87262 74444
              </a>{" "}
              or email{" "}
              <a href="mailto:info@shrishaktimayi.com" className="link-underline font-semibold text-gold-300 hover:text-gold-400">
                info@shrishaktimayi.com
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-ivory-50 p-6 sm:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
