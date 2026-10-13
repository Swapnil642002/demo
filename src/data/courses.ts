import type { Verification } from "./site";

export interface Course {
  slug: string;
  name: string;
  shortName: string;
  award: string;
  duration: string;
  durationDetail: string;
  fees: string;
  feesNote: string;
  eligibility: string;
  eligibilityDetail: string;
  overview: string;
  image: { src: string; width: number; height: number; alt: string };
  curriculum: { year: string; subjects: string[] }[];
  skills: { title: string; body: string }[];
  careers: { title: string; body: string }[];
  admissionSteps: string[];
  verification: Verification;
  /** Present on the live site but stated inconsistently — needs sign-off. */
  openNotes: string[];
}

export const courses: Course[] = [
  {
    slug: "gnm",
    name: "General Nursing and Midwifery (GNM)",
    shortName: "GNM",
    award: "Diploma",
    duration: "3 Years 6 Months",
    durationDetail: "3 years of study including a 6-month internship",
    fees: "₹36,500 / year",
    feesNote:
      "Fee as published on the existing website. Confirm the current fee structure, any one-time charges and the hostel fee separately.",
    eligibility: "10+2 with Science (preferred) or Arts stream",
    eligibilityDetail:
      "Completion of 10+2 with Science (preferred) or Arts stream. Minimum age 17 years.",
    overview:
      "General Nursing and Midwifery (GNM) is a 3 Years 6 Months diploma programme designed to prepare healthcare professionals who can offer comprehensive nursing care to individuals, families, and communities. It emphasises holistic patient care, health education, and midwifery, equipping students with the skills to work in diverse healthcare settings.",
    image: {
      src: "/images/courses/gnm.png",
      width: 578,
      height: 432,
      alt: "GNM nursing students in a practical training session at Shri Shaktimayi",
    },
    curriculum: [
      {
        year: "Year 1",
        subjects: [
          "Anatomy and Physiology",
          "Fundamentals of Nursing",
          "First Aid and Emergency Care",
          "Sociology",
        ],
      },
      {
        year: "Year 2",
        subjects: [
          "Medical-Surgical Nursing",
          "Pharmacology",
          "Community Health Nursing",
          "Mental Health and Psychiatric Nursing",
        ],
      },
      {
        year: "Year 3",
        subjects: [
          "Pediatric Nursing",
          "Obstetrics and Gynaecology",
          "Midwifery Training",
          "Internship and Practical Exposure",
        ],
      },
      {
        year: "Internship (6 months)",
        subjects: ["Prasuti Pariksha Pathykram", "Supervised clinical practice"],
      },
    ],
    skills: [
      {
        title: "Clinical expertise",
        body: "Competence in nursing procedures, patient care, and infection control.",
      },
      {
        title: "Midwifery skills",
        body: "Knowledge of prenatal, antenatal, and postnatal care for mothers and newborns.",
      },
      {
        title: "Critical thinking",
        body: "Ability to assess, diagnose, and provide holistic care.",
      },
      {
        title: "Health education",
        body: "Skills to promote public health and prevent diseases in communities.",
      },
    ],
    careers: [
      {
        title: "Registered nurse",
        body: "Working in hospitals, clinics, and nursing homes, providing patient care and support during recovery.",
      },
      {
        title: "Midwife",
        body: "Specialising in maternal and newborn care, assisting in deliveries and ensuring maternal health.",
      },
      {
        title: "Community health worker",
        body: "Engaging in public health campaigns and rural healthcare programmes.",
      },
      {
        title: "Further study",
        body: "Opportunities to pursue higher education such as B.Sc. Nursing or specialised nursing certifications.",
      },
    ],
    admissionSteps: [
      "Submit the admission enquiry form",
      "Appear for the entrance process as notified",
      "Document verification",
      "Confirm admission and fee payment",
    ],
    verification: "source-copied",
    openNotes: [
      "The live site states the duration as both \u201c3 Years 6 Months\u201d and \u201c3 years (including a 6-month internship)\u201d \u2014 these reconcile, but confirm the official duration wording.",
      "Affiliating board / university for the GNM diploma is not named on the live site. Required before publishing any approval claim.",
      "The live site lists an entrance step in How To Join but does not name the entrance test. Confirm whether an entrance exam applies.",
    ],
  },
  {
    slug: "d-pharma-ayurveda",
    name: "D.Pharma in Ayurveda",
    shortName: "D.Pharma",
    award: "Diploma",
    duration: "2 Years 3 Months",
    durationDetail: "2 years of study including a 3-month internship",
    fees: "₹42,500 / year",
    feesNote:
      "Fee as published on the existing website. Confirm the current fee structure, any one-time charges and the hostel fee separately.",
    eligibility: "10+2 or equivalent with PCM or PCB",
    eligibilityDetail:
      "10+2 or equivalent from a recognised board with Physics, Chemistry and Biology/Mathematics. Some institutions may require qualifying entrance exams.",
    overview:
      "Diploma in Pharmacy (D.Pharma) in Ayurveda is a specialised programme that integrates the ancient principles of Ayurvedic medicine with modern pharmaceutical sciences. The course trains students in the preparation, quality control and dispensing of Ayurvedic medicines.",
    image: {
      src: "/images/courses/dpharma.jpg",
      width: 966,
      height: 722,
      alt: "Ayurvedic pharmacy preparation practical at Shri Shaktimayi",
    },
    curriculum: [
      {
        year: "Year 1",
        subjects: [
          "Introduction to Ayurvedic Philosophy",
          "Basics of Dravyaguna (Ayurvedic Pharmacology)",
          "Principles of Rasashastra (Ayurvedic Pharmaceutics)",
          "Fundamentals of Modern Pharmaceutical Sciences",
        ],
      },
      {
        year: "Year 2",
        subjects: [
          "Advanced Ayurvedic Medicine Preparation",
          "Quality Control and Standardisation of Ayurvedic Drugs",
          "Clinical Application of Ayurvedic Treatments",
          "Industrial Training and Practical Dispensing",
        ],
      },
      {
        year: "Internship (3 months)",
        subjects: ["Industrial training", "Practical dispensing"],
      },
    ],
    skills: [
      {
        title: "Ayurvedic formulations",
        body: "Understanding of preparations such as churnas (powders), asavas (fermented liquids) and lehyas (semi-solid preparations).",
      },
      {
        title: "Modern pharmacy technique",
        body: "Knowledge of modern pharmacy techniques applied to Ayurvedic medicine.",
      },
      {
        title: "Materia medica",
        body: "Proficiency in identifying medicinal plants and their therapeutic properties.",
      },
      {
        title: "Quality & counselling",
        body: "Skills in drug manufacturing, quality control, and patient counselling.",
      },
    ],
    careers: [
      {
        title: "Pharmacist",
        body: "Dispensing Ayurvedic medicines and advising patients on the use of herbal remedies in Ayurvedic hospitals and clinics.",
      },
      {
        title: "Production & quality control",
        body: "Working in Ayurvedic pharmaceutical companies for drug manufacturing and quality assurance.",
      },
      {
        title: "Entrepreneurship",
        body: "Establishing Ayurvedic drug stores or manufacturing units.",
      },
      {
        title: "Research & development",
        body: "Contributing to the innovation of new herbal formulations and Ayurvedic drugs.",
      },
      {
        title: "Further education",
        body: "Eligible for higher studies such as B.Pharm in Ayurveda or specialised Ayurvedic research programmes.",
      },
    ],
    admissionSteps: [
      "Submit the admission enquiry form",
      "Appear for the entrance process as notified",
      "Document verification",
      "Confirm admission and fee payment",
    ],
    verification: "source-copied",
    openNotes: [
      "The live site URL for this course reads course_b.sc while the page content is D.Pharma in Ayurveda. Confirm no separate B.Sc. programme exists.",
      "Recognition/approval body (e.g. state pharmacy council or university) is not named on the live site. Required before publishing any approval claim.",
      "Global recognition and job security claims on the live page are marketing language with no cited source, and are omitted from this build.",
    ],
  },
];

export const getCourse = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug);

