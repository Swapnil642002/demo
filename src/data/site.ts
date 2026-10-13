/**
 * Central content layer.
 *
 * Every fact in this directory is sourced from the live site
 * (https://shrishaktimayi.com) as part of the pre-build audit. Items carry a
 * `verification` field so the client can see at a glance what has been copied
 * from the existing site verbatim and what still needs written confirmation
 * before launch. Nothing here is invented.
 */

export type Verification =
  | "verified"
  | "source-copied"
  | "requires-client-approval";

export interface Contact {
  phoneDisplay: string;
  phoneE164: string;
  email: string;
  addressLine: string;
  locality: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  /** Full single-line address used for display and JSON-LD. */
  fullAddress: string;
  mapsEmbedUrl: string;
  mapsDirectionsUrl: string;
  /** Latitude/longitude published in the existing site's Google Maps embed. */
  geo: { latitude: number; longitude: number };
}

export const site = {
  name: "Shri Shaktimayi Ayurvedic Pharmacy & Nursing College",
  shortName: "Shri Shaktimayi",
  /**
   * The existing site spells the name two ways ("Shakti Mayi" in <title>,
   * "Shaktimayi" in headings). We standardise on "Shaktimayi" and flag the
   * discrepancy in the content-verification checklist.
   */
  legalName: "Shri Shaktimayi Ayurvedic Pharmacy & Nursing College",
  tagline: "Shaping Pharmacists, Advancing Healthcare",
  description:
    "Shri Shaktimayi Ayurvedic Pharmacy & Nursing College, Azamgarh offers GNM nursing and D.Pharma in Ayurveda diploma programmes. Established 2015.",
  /** TODO(client): confirm the canonical production origin before launch. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shrishaktimayi.com",
  foundedYear: 2015,
  founder: "Vaidya Satnarayan Pandey",
  founderVerification: "source-copied" as Verification,
  locale: "en_IN",
  twitterCard: "summary_large_image",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Admissions", href: "/admissions" },
    { label: "Faculty", href: "/faculty" },
    { label: "Campus", href: "/facilities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Notices", href: "/notices" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const contact: Contact = {
  phoneDisplay: "+91 87262 74444",
  phoneE164: "+918726274444",
  email: "info@shrishaktimayi.com",
  addressLine: "Shri Shaktimayi Hospital, Kharihani",
  locality: "Kharihani",
  city: "Azamgarh",
  region: "Uttar Pradesh",
  postalCode: "",
  country: "India",
  /**
   * The live site alternates between "Kharihani" (header/footer) and
   * "Kharagpur" (body copy) — both for Azamgarh. We use the header/footer
   * form and raise the conflict in the verification checklist.
   */
  fullAddress: "Shri Shaktimayi Hospital, Kharihani, Azamgarh, Uttar Pradesh, India",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=25.816810406328006,83.20119957417756&z=15&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=25.816810406328006,83.20119957417756",
  geo: { latitude: 25.816810406328006, longitude: 83.20119957417756 },
};

/**
 * Notices shown in the top announcement bar. The live site's ticker carried
 * placeholder copy ("Best place for pharmacy || This is best college") which is
 * NOT a real notice, so it is not reproduced here. Populate only with notices
 * the college has approved in writing.
 */
export const announcements: { id: string; text: string; verification: Verification }[] = [];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** No role/course was published alongside these quotes on the live site. */
  role?: string;
  verification: Verification;
}

/**
 * Testimonials reproduced verbatim from the existing site. They carry no
 * course, year or source attribution there, so every entry is marked
 * "requires-client-approval" and the UI only renders entries the client has
 * signed off. See src/data/README.md.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t-mukesh-rai",
    quote:
      "The college is well-organized, and the course structure is up-to-date with industry requirements. The focus on research and innovation is commendable.",
    name: "Mukesh Rai",
    verification: "requires-client-approval",
  },
  {
    id: "t-raman-shah",
    quote:
      "The college offers excellent facilities, including well-equipped labs and a comprehensive library. The faculty is supportive.",
    name: "Raman Shah",
    verification: "requires-client-approval",
  },
  {
    id: "t-rahul",
    quote:
      "I had an amazing experience at this pharmacy college. The faculty members are highly knowledgeable and approachable.",
    name: "Rahul",
    verification: "requires-client-approval",
  },
  {
    id: "t-aditi-sharma",
    quote:
      "This pharmacy college has been a life-changer for me. The faculty members are highly experienced, and the labs are equipped with the latest technology.",
    name: "Aditi Sharma",
    verification: "requires-client-approval",
  },
];

/**
 * Unverified numeric claims found on the live homepage. Deliberately NOT
 * rendered anywhere — retained only so the audit trail is complete.
 */
export const retiredClaims = [
  { claim: "Equitable Education — 100%", reason: "Meaningless metric, no methodology." },
  { claim: "Teaching Experience — 10+ Years", reason: "Unattributed; which staff, measured when?" },
  { claim: "Faculty Members — 15+", reason: "Only 3 staff are published; number unconfirmed." },
  {
    claim: "Programmes are accredited by relevant professional bodies",
    reason: "No approval body, council or recognition number is stated anywhere on the live site.",
  },
  {
    claim: "Placement benefit / 'graduates highly sought after'",
    reason: "No placement data, recruiter list or percentage is published.",
  },
];
