import { z } from "zod";

export const MAX_MESSAGE = 2000;

/**
 * Shared between the browser (via `zodResolver`) and the API route so the
 * exact same rules run on both sides. The server never trusts the client's
 * validation result — it re-validates the raw body itself.
 */
export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name must be 120 characters or fewer.")
    .regex(/^[^<>{}]*$/, "Name contains characters that are not allowed."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Enter a valid email address, for example name@example.com.")
    .max(160, "Email must be 160 characters or fewer."),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a 10-digit mobile number.")
    .max(15, "Enter a valid phone number.")
    .regex(/^\+?[\d\s-]{10,15}$/, "Enter a valid phone number using digits only."),
  course: z.enum(["gnm", "d-pharma-ayurveda", "not-sure"], {
    errorMap: () => ({ message: "Please choose a programme." }),
  }),
  message: z
    .string()
    .trim()
    .max(MAX_MESSAGE, `Message must be ${MAX_MESSAGE} characters or fewer.`)
    .optional(),
  /**
   * Honeypot. Legitimate users never see this field because it is visually
   * hidden and marked aria-hidden + tabIndex -1, so anything that fills it is
   * a bot. The server pre-fills a default when the key is absent, which keeps
   * this field's input and output types identical (required by zodResolver).
   */
  company: z.string(),
  /** Milliseconds since page load; sub-2.5s submissions are almost certainly bots. */
  formTime: z.number(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const courseOptions = [
  { value: "gnm", label: "General Nursing and Midwifery (GNM)" },
  { value: "d-pharma-ayurveda", label: "D.Pharma in Ayurveda" },
  { value: "not-sure", label: "I am not sure yet" },
] as const;
