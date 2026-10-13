import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/site";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact & Enquiry",
  description:
    "Contact Shri Shaktimayi Ayurvedic Pharmacy & Nursing College, Azamgarh — phone +91 87262 74444, email info@shrishaktimayi.com, address and directions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        intro="Call, email, or send an enquiry form — whichever suits you. The college office will respond during working hours."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* ------------------------------------------------- contact methods */}
      <section aria-labelledby="reach-heading" className="container-page py-16 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow="Get in touch" title="Reach the college" id="reach-heading" />
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <a
            href={`tel:${contact.phoneE164}`}
            className="surface group rounded-xl p-6 transition-colors hover:border-gold-500"
          >
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-gold-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
              Call to ask any question
            </p>
            <p className="mt-1 font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
              {contact.phoneDisplay}
            </p>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="surface group rounded-xl p-6 transition-colors hover:border-gold-500"
          >
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-gold-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
            </span>
            <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
              Email for admission enquiries
            </p>
            <p className="mt-1 font-serif text-base font-bold break-all text-navy-900 group-hover:text-gold-700">
              {contact.email}
            </p>
          </a>

          <a
            href={contact.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="surface group rounded-xl p-6 transition-colors hover:border-gold-500"
          >
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-gold-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
              Visit the college
            </p>
            <p className="mt-1 text-sm font-semibold text-navy-900 group-hover:text-gold-700">
              {contact.addressLine}, {contact.city}
            </p>
            <p className="mt-1 text-xs text-ink-600">Opens in Google Maps →</p>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------ map */}
      <section aria-labelledby="map-heading" className="bg-ivory-100 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Find us"
              title="Directions to the campus"
              id="map-heading"
              intro={contact.fullAddress}
            />
          </Reveal>

          <div className="mt-8 overflow-hidden rounded-2xl border border-ivory-300 bg-white">
            <iframe
              src={contact.mapsEmbedUrl}
              title="Map showing the location of Shri Shaktimayi Hospital, Kharihani, Azamgarh"
              className="h-72 w-full sm:h-96 lg:h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contact.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-800 px-5 py-3 text-sm font-semibold text-ivory-50 transition-colors hover:bg-navy-700"
            >
              Open directions in Google Maps
            </a>
            <a
              href={`tel:${contact.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-navy-800 px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-800 hover:text-ivory-50"
            >
              Call {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- form */}
      <section id="enquiry" aria-labelledby="form-heading" className="bg-navy-900 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Enquiry form"
              title="Send us a message"
              id="form-heading"
              tone="dark"
              intro="Ask about eligibility, fees, documents or campus visits. Fields marked with an asterisk are required."
            />
            <div className="mt-8 space-y-4 rounded-xl border border-navy-600 bg-navy-800/60 p-6 text-sm text-ivory-300">
              <p>
                <strong className="text-gold-300">Working hours:</strong> please call to
                confirm the office timings before visiting.
              </p>
              <p>
                <strong className="text-gold-300">Response time:</strong> enquiries are
                typically answered during the next working day.
              </p>
              <p className="rounded-md border border-gold-500 bg-navy-900 px-3 py-2 text-xs text-ivory-200">
                <strong className="text-gold-300">Demo build:</strong> this form validates
                and rate-limits submissions correctly, but no delivery provider is connected
                yet, so messages are not emailed anywhere. The UI states this explicitly on
                success.
              </p>
            </div>
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
