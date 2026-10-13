export interface Facility {
  id: string;
  title: string;
  body: string;
  image: { src: string; width: number; height: number; alt: string };
  /** true = the college has confirmed this facility exists on site. */
  confirmed: boolean;
}

export const facilities: Facility[] = [
  {
    id: "labs",
    title: "Laboratories & practical training",
    body: "Hands-on practical work is central to both the GNM and D.Pharma in Ayurveda programmes. Laboratory sessions cover pharmacy preparation, dispensing and nursing procedures.",
    image: {
      src: "/images/misc/campus-1.jpg",
      width: 1000,
      height: 750,
      alt: "Practical training facilities at Shri Shaktimayi",
    },
    confirmed: false,
  },
  {
    id: "library",
    title: "Library & study resources",
    body: "A dedicated library supports coursework, reference reading and exam preparation across the nursing and Ayurvedic pharmacy curriculum.",
    image: {
      src: "/images/misc/campus-2.jpg",
      width: 1000,
      height: 750,
      alt: "Library and study area at Shri Shaktimayi",
    },
    confirmed: false,
  },
  {
    id: "clinical",
    title: "Clinical exposure",
    body: "Both programmes include supervised practical and internship components, giving students structured exposure to real healthcare settings.",
    image: {
      src: "/images/misc/campus-3.jpg",
      width: 1000,
      height: 750,
      alt: "Clinical training environment associated with Shri Shaktimayi",
    },
    confirmed: false,
  },
  {
    id: "sports",
    title: "Sports & student life",
    body: "Physical fitness and a balanced academic life are supported through campus recreation and sports facilities.",
    image: {
      src: "/images/misc/campus-4.jpg",
      width: 1000,
      height: 750,
      alt: "Campus recreation area at Shri Shaktimayi",
    },
    confirmed: false,
  },
  {
    id: "hospital",
    title: "Attached hospital setting",
    body: "The institution is co-located with Shri Shaktimayi Hospital, providing the healthcare context in which students train.",
    image: {
      src: "/images/misc/campus-5.jpg",
      width: 1000,
      height: 750,
      alt: "Shri Shaktimayi Hospital premises",
    },
    confirmed: true,
  },
  {
    id: "campus",
    title: "Campus & classrooms",
    body: "Teaching spaces are arranged for both theoretical instruction and small-group practical demonstration.",
    image: {
      src: "/images/misc/campus-6.jpg",
      width: 1000,
      height: 750,
      alt: "Classroom and teaching space at Shri Shaktimayi",
    },
    confirmed: false,
  },
];

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: "admissions" | "courses" | "campus";
}

export const faqs: Faq[] = [
  {
    id: "faq-courses",
    category: "courses",
    question: "Which programmes does the college offer?",
    answer:
      "The college publishes two diploma programmes: General Nursing and Midwifery (GNM), and D.Pharma in Ayurveda. Both course pages list duration, fees and eligibility in full.",
  },
  {
    id: "faq-gnm-duration",
    category: "courses",
    question: "How long is the GNM programme?",
    answer:
      "GNM runs for 3 years 6 months in total, comprising 3 years of study plus a 6-month internship.",
  },
  {
    id: "faq-dpharma-duration",
    category: "courses",
    question: "How long is the D.Pharma in Ayurveda programme?",
    answer:
      "D.Pharma in Ayurveda runs for 2 years 3 months, comprising 2 years of study plus a 3-month internship.",
  },
  {
    id: "faq-eligibility",
    category: "admissions",
    question: "What are the eligibility requirements?",
    answer:
      "For GNM: completion of 10+2 with Science (preferred) or Arts stream, with a minimum age of 17 years. For D.Pharma in Ayurveda: 10+2 or equivalent from a recognised board with PCM or PCB. Final eligibility is confirmed by the college at the document-verification stage.",
  },
  {
    id: "faq-fees",
    category: "admissions",
    question: "What are the course fees?",
    answer:
      "Published fees are ₹36,500 per year for GNM and ₹42,500 per year for D.Pharma in Ayurveda. These are the figures shown on the existing website; please confirm the current structure, one-time charges and any hostel fee directly with the college.",
  },
  {
    id: "faq-how-to-apply",
    category: "admissions",
    question: "How do I apply for admission?",
    answer:
      "Submit the admission enquiry form on this website or call +91 87262 74444. The published process is: fill in the form, appear for the entrance process as notified, complete document verification, then confirm admission.",
  },
  {
    id: "faq-entrance",
    category: "admissions",
    question: "Is there an entrance examination?",
    answer:
      "The existing website lists an entrance step in its admission process but does not name the test. Please contact the college directly to confirm whether an entrance examination applies for the current session.",
  },
  {
    id: "faq-approval",
    category: "admissions",
    question: "Which board or university is the course affiliated to?",
    answer:
      "The existing website does not name an affiliating board, university or approving council for either programme. This detail is pending written confirmation from the college and should be verified before you apply.",
  },
  {
    id: "faq-location",
    category: "campus",
    question: "Where is the college located?",
    answer:
      "The college is at Shri Shaktimayi Hospital, Kharihani, Azamgarh, Uttar Pradesh. Directions are available on the Contact page.",
  },
  {
    id: "faq-hostel",
    category: "campus",
    question: "Is hostel accommodation available?",
    answer:
      "The existing website does not mention hostel or accommodation facilities. Please contact the college directly to confirm availability and fees.",
  },
];

