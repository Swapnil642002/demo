import Image from "next/image";
import { courses } from "@/data/courses";
import { leadership, gallery } from "@/data/people";
import { facilities, faqs } from "@/data/facilities";
import { admissionSteps } from "@/data/admissions";
import { testimonials, contact, site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, ButtonLink, EmptyState } from "@/components/ui/Section";
import { FaqList } from "@/components/ui/FaqList";
import { Hero } from "@/components/sections/Hero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export function HomeView() {
  const approvedTestimonials = testimonials.filter((t) => t.verification === "verified");
  const confirmedFacilities = facilities.filter((f) => f.confirmed);
  const previewGallery = gallery.slice(0, 8);

  return (
    <>
      <Hero />

      {/* ---------------------------------------------------- introduction */}
      <section aria-labelledby="intro-heading" className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="About the institution"
              title="Shaping tomorrow's healthcare leaders today"
              id="intro-heading"
              intro={`${site.shortName} was established in ${site.foundedYear} by ${site.founder} in Azamgarh, Uttar Pradesh, to prepare students for careers in nursing and Ayurvedic pharmacy.`}
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600">
              The college is dedicated to shaping the future of healthcare through its
              nursing and pharmacy programmes, with a mission to equip students with the
              knowledge, skills and compassion needed to work in an evolving healthcare
              environment.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Experienced teaching staff",
                "Career guidance",
                "Scholarship guidance",
                "Practical, hands-on training",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about">About the college</ButtonLink>
              <ButtonLink href="/contact#enquiry" variant="outline">
                Talk to admissions
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ivory-300">
                <Image
                  src="/images/about/about-5.jpeg"
                  alt="Campus and facilities at Shri Shaktimayi Ayurvedic Pharmacy and Nursing College"
                  width={719}
                  height={724}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 hidden w-40 overflow-hidden rounded-xl border-4 border-ivory-50 shadow-lg sm:block lg:-left-10 lg:w-48">
                <Image
                  src="/images/about/about-2.jpeg"
                  alt="Detail of the college campus"
                  width={658}
                  height={650}
                  loading="lazy"
                  sizes="200px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- courses */}
      <section aria-labelledby="courses-heading" className="bg-ivory-100 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Our programmes"
              title="Fuel your ambition"
              id="courses-heading"
              intro="Two diploma programmes, each with published duration, eligibility and fees. Every detail below is taken from the college's existing website."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {courses.map((course, i) => (
              <Reveal key={course.slug} delay={i * 0.1} as="div">
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
                      {course.award}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-bold text-navy-900">
                      {course.name}
                    </h3>
                    <span aria-hidden="true" className="mt-3 block rule-gold" />

                    <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg bg-ivory-100 px-3 py-2.5">
                        <dt className="text-[11px] text-ink-600 uppercase">Duration</dt>
                        <dd className="mt-0.5 text-sm font-semibold text-navy-900">
                          {course.duration}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-ivory-100 px-3 py-2.5">
                        <dt className="text-[11px] text-ink-600 uppercase">Fees</dt>
                        <dd className="mt-0.5 text-sm font-semibold text-navy-900">
                          {course.fees}
                        </dd>
                      </div>
                      <div className="rounded-lg bg-ivory-100 px-3 py-2.5">
                        <dt className="text-[11px] text-ink-600 uppercase">Eligibility</dt>
                        <dd className="mt-0.5 text-sm font-semibold text-navy-900">10+2 pass</dd>
                      </div>
                    </dl>

                    <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-600">
                      {course.overview.slice(0, 185)}…
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <ButtonLink href={`/courses/${course.slug}`}>Course details</ButtonLink>
                      <ButtonLink href="/admissions" variant="outline">
                        Eligibility
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- facilities */}
      <section aria-labelledby="facilities-heading" className="container-page py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Campus & practical learning"
            title="Where theory meets practice"
            id="facilities-heading"
            intro="Both programmes are built around supervised practical work, supported by campus facilities and an attached hospital setting."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, i) => (
            <Reveal key={facility.id} delay={(i % 3) * 0.08} as="article">
              <article className="surface h-full overflow-hidden rounded-xl">
                <div className="relative aspect-[4/3] bg-ivory-200">
                  <Image
                    src={facility.image.src}
                    alt={facility.image.alt}
                    width={facility.image.width}
                    height={facility.image.height}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-lg font-bold text-navy-900">
                    {facility.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{facility.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {confirmedFacilities.length < facilities.length ? (
          <p className="mx-auto mt-8 max-w-3xl rounded-lg border border-gold-500 bg-ivory-100 px-5 py-4 text-sm leading-relaxed text-navy-900">
            <strong>Note for the college:</strong> some facility descriptions above are
            adapted from the existing website and are awaiting written confirmation. Please
            review them before launch — see the content-verification checklist.
          </p>
        ) : null}

        <div className="mt-10 text-center">
          <ButtonLink href="/facilities" variant="outline">
            Explore campus facilities
          </ButtonLink>
        </div>
      </section>

      {/* -------------------------------------------------------- faculty */}
      <section aria-labelledby="faculty-heading" className="bg-navy-800 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="Meet our senior team"
              id="faculty-heading"
              intro="The three leadership roles published by the college. Detailed faculty profiles will be added once the college supplies qualifications and departments."
              tone="dark"
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person, i) => (
              <Reveal key={person.id} delay={i * 0.08} as="article">
                <article className="flex h-full flex-col items-center rounded-xl border border-navy-600 bg-navy-700/40 p-6 text-center">
                  <Image
                    src={person.image.src}
                    alt={person.image.alt}
                    width={person.image.width}
                    height={person.image.height}
                    loading="lazy"
                    sizes="160px"
                    className="h-28 w-28 rounded-full border-2 border-gold-500 object-cover sm:h-32 sm:w-32"
                  />
                  <h3 className="mt-5 font-serif text-xl font-bold text-ivory-50">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-gold-300 uppercase">
                    {person.role}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <ButtonLink href="/faculty" variant="outlineLight">
              Faculty &amp; leadership
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- admission steps */}
      <section aria-labelledby="steps-heading" className="bg-ivory-100 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Admissions"
              title="How to join"
              id="steps-heading"
              intro="The four-step admission process published by the college. Our admissions team can walk you through each stage."
              align="center"
            />
          </Reveal>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="mt-10 text-center">
            <ButtonLink href="/admissions" variant="gold">
              Full admission details
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- gallery */}
      <section aria-labelledby="gallery-heading" className="container-page py-16 sm:py-20 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Campus life"
            title="A look inside the campus"
            id="gallery-heading"
            intro="Photographs published by the college on its existing website."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {previewGallery.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.06} as="div">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-ivory-300">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/gallery" variant="outline">
            Open the full gallery
          </ButtonLink>
        </div>
      </section>

      {/* ---------------------------------------------------- testimonials */}
      <section aria-labelledby="testimonials-heading" className="bg-ivory-100 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Student voices"
              title="What our students say"
              id="testimonials-heading"
              align="center"
            />
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            {approvedTestimonials.length === 0 ? (
              <EmptyState
                title="Testimonials are being verified"
                body="Quotes from students appear here only after the college confirms each one in writing. We have four awaiting approval rather than publishing unverified reviews."
                action={{ label: "Contact the college", href: "/contact" }}
              />
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2">
                {approvedTestimonials.map((t) => (
                  <li key={t.id} className="surface rounded-xl p-6">
                    <blockquote className="text-sm leading-relaxed text-ink-700">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-sm font-semibold text-navy-900">
                      {t.name}
                      {t.role ? <span className="font-normal text-ink-600"> — {t.role}</span> : null}
                    </figcaption>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section aria-labelledby="faq-heading" className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              id="faq-heading"
              intro="Answers based on what the college currently publishes. Anything we could not confirm is flagged as such."
            />
            <div className="mt-6">
              <ButtonLink href="/contact" variant="outline">
                Ask a different question
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <FaqList items={faqs.slice(0, 6)} />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- enquiry */}
      <section id="enquiry" aria-labelledby="enquiry-heading" className="bg-navy-900 py-16 sm:py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Admission enquiry"
              title="Start your journey with us"
              id="enquiry-heading"
              tone="dark"
              intro="Tell us which programme you are interested in and our admissions team will get back to you with eligibility, fees and the next steps."
            />

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a href={`tel:${contact.phoneE164}`} className="link-underline font-medium text-ivory-50 hover:text-gold-300">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                </span>
                <a href={`mailto:${contact.email}`} className="link-underline font-medium text-ivory-50 hover:text-gold-300">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-gold-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="text-ivory-200">{contact.fullAddress}</span>
              </li>
            </ul>
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
