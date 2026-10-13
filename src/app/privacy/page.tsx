import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { contact, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy & Legal Notices",
  description:
    "How Shri Shaktimayi Ayurvedic Pharmacy & Nursing College collects, uses and protects personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: [
      "This website collects only the details you choose to submit through the admission enquiry form: your full name, phone number, email address, the programme you are interested in and any question you write.",
      "The form also records basic technical signals used to prevent spam — how long the form took to complete and an automated-protection field. These are used solely to reject abusive submissions.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: [
      "Your details are used for one purpose only: to respond to your enquiry and, where relevant, to guide you through the admission process.",
      "We do not sell, rent or trade your personal information, and we do not use it for unrelated marketing without your explicit consent.",
    ],
  },
  {
    id: "storage-retention",
    title: "Storage and retention",
    body: [
      "Enquiry submissions are transmitted over HTTPS and processed by the website server. In this demonstration build no submission is delivered to a server or database.",
      "Once a delivery provider is connected, enquiries will be retained only as long as needed to handle your request and meet legal obligations, then deleted or anonymised. The college should confirm its retention period before launch.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and disclosure",
    body: [
      "Information is shared only with college staff who need it to answer your enquiry, or where disclosure is required by law.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: [
      "This website does not set advertising or tracking cookies. If analytics are added later, this notice will be updated and, where required, consent will be requested first.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party services",
    body: [
      "The contact page embeds a Google Maps frame, which is subject to Google's own privacy policy. Clicking directions opens Google Maps in a new tab.",
      "Fonts are served from Google Fonts, which receives your IP address when the page loads.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "You may ask what personal data we hold about you, request correction or deletion, or withdraw consent at any time by contacting the college. We will respond within a reasonable period.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "Submissions are sent over HTTPS. The form is protected by rate limiting, automated-spam defences and server-side validation. Access to any stored enquiries should be restricted to authorised staff only.",
    ],
  },
  {
    id: "contact-privacy",
    title: "Contact us about privacy",
    body: [
      `For any question about this policy or your data, email ${contact.email} or call ${contact.phoneDisplay}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy & legal notices"
        intro="How this website handles your personal information, and the terms that govern its use."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
              On this page
            </p>
            <ul className="mt-4 space-y-2 border-l border-ivory-300 pl-4 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="link-underline text-ink-700 hover:text-navy-800">
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#terms" className="link-underline text-ink-700 hover:text-navy-800">
                  Terms of use
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <Reveal>
              <p className="rounded-lg border border-gold-500 bg-ivory-100 px-5 py-4 text-sm leading-relaxed text-navy-900">
                <strong>Draft notice:</strong> this policy is a working draft prepared for the
                college. It should be reviewed by the college and, ideally, by a legal adviser
                before publication, and the retention period confirmed.
              </p>
            </Reveal>

            {sections.map((s) => (
              <Reveal key={s.id}>
                <section id={s.id} className="mt-10 scroll-mt-28">
                  <SectionHeading title={s.title} level={2} />
                  {s.body.map((p, i) => (
                    <p key={i} className="mt-4 text-base leading-relaxed text-ink-600">
                      {p}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}

            <Reveal>
              <section id="terms" className="mt-12 scroll-mt-28 border-t border-ivory-300 pt-10">
                <SectionHeading title="Terms of use" level={2} />
                <p className="mt-4 text-base leading-relaxed text-ink-600">
                  Content on this website is provided for general information about{" "}
                  {site.legalName} and its programmes. While every effort is made to keep it
                  accurate, course fees, durations, eligibility criteria and dates may change.
                  Always confirm current details directly with the college before making an
                  application or payment.
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-600">
                  Photographs and text remain the property of the college or their respective
                  owners. No part of this site may be reproduced for commercial purposes
                  without written permission.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="mt-12 border-t border-ivory-300 pt-10">
                <SectionHeading title="Disclaimer on approvals" level={2} />
                <p className="mt-4 text-base leading-relaxed text-ink-600">
                  This website does not state any affiliation, approval or accreditation by a
                  university, board or council, because the college has not supplied that
                  information. Applicants must verify the recognition status of each
                  programme directly with the relevant authority before enrolling.
                </p>
                <p className="mt-6">
                  <Link
                    href="/contact"
                    className="font-semibold text-navy-800 underline underline-offset-4 hover:text-gold-600"
                  >
                    Contact the college
                  </Link>
                </p>
              </section>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
