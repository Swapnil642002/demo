export type NoticeStatus = "published" | "draft";

export interface Notice {
  id: string;
  title: string;
  body: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  category: "admission" | "exam" | "event" | "general";
  status: NoticeStatus;
}

/**
 * The live site's ticker showed placeholder text, not notices, and it has no
 * notices page — so there is no genuine notice history to migrate. Entries
 * added here must be real, college-approved notices.
 *
 * Everything currently in the array is a `draft` so that the notices page and
 * the announcement bar demonstrate their real behaviour (including the empty
 * state) without publishing anything the college has not approved.
 * Flip `status` to `"published"` to go live.
 */
export const notices: Notice[] = [
  {
    id: "n-admission-enquiry",
    title: "Admission enquiries open for the current session",
    body: "Prospective students can submit an admission enquiry online or call the college office on +91 87262 74444 for details on GNM and D.Pharma in Ayurveda.",
    date: "2026-01-01",
    category: "admission",
    status: "draft",
  },
  {
    id: "n-document-verification",
    title: "Bring original documents for verification",
    body: "Applicants attending counselling or admission must carry original certificates along with self-attested photocopies for verification.",
    date: "2026-01-01",
    category: "admission",
    status: "draft",
  },
];

export const publishedNotices = notices.filter((n) => n.status === "published");

export interface AdmissionStep {
  step: number;
  title: string;
  body: string;
}

/** Adapted verbatim from the live site's "How To Join?" process. */
export const admissionSteps: AdmissionStep[] = [
  {
    step: 1,
    title: "Fill your form",
    body: "Submit the online admission enquiry form with your basic details, or visit the college office to collect one in person.",
  },
  {
    step: 2,
    title: "Give entrance",
    body: "Appear for the entrance process as notified by the college for the session you are applying to.",
  },
  {
    step: 3,
    title: "Document verification",
    body: "Present original academic certificates and identity documents for verification by the admissions team.",
  },
  {
    step: 4,
    title: "Take admission",
    body: "Confirm your seat by completing the fee payment and admission formalities with the college office.",
  },
];

export interface DocumentItem {
  label: string;
  note: string;
}

/**
 * The live site does not publish a document checklist. This list is the
 * standard set for Indian diploma admissions and is marked as indicative —
 * the college must confirm it before it is treated as authoritative.
 */
export const indicativeDocuments: DocumentItem[] = [
  { label: "10+2 mark sheet and passing certificate", note: "Original and photocopy" },
  { label: "Class 10 mark sheet", note: "For date-of-birth verification" },
  { label: "Transfer certificate (TC)", note: "From the last institution attended" },
  { label: "Character certificate", note: "From the last institution attended" },
  { label: "Caste / category certificate", note: "If applicable" },
  { label: "Government photo ID", note: "Aadhaar or equivalent" },
  { label: "Passport photographs", note: "Recent, set of 6" },
];
