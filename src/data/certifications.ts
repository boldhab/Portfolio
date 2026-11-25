import type { Certification } from "@/types";

/**
 * Professional credentials, internship certificates,
 * technical training, and course completion certificates.
 */
export const certifications: Certification[] = [
  {
    id: "gcode-internship",
    title: "Full-Stack Development Internship",
    issuer: "gCODE Technologies",
    issueDate: "2026-10-25",
    category: "internship",
    doesNotExpire: true,
    featured: true,

    description:
      "Certificate of completion for a full-time internship focused on full-stack development, backend engineering, and database management.",

    skills: [
      "Full-Stack Development",
      "Backend Engineering",
      "REST APIs",
      "PostgreSQL",
      "Team Collaboration",
    ],

    image: "/images/certifications/gcode.webp",
    certificateUrl: "/documents/certifications/gcode.pdf",
  },

  {
    id: "insa-summer-camp",
    title: "INSA Summer Camp Training",
    issuer: "Information Network Security Administration (INSA)",
    category: "training",
    doesNotExpire: true,
    featured: true,

    description:
      "Certificate for completing an intensive 30-day technical training program focused on programming, algorithmic problem-solving, and computational thinking.",

    skills: [
      "Programming",
      "Algorithms",
      "Problem Solving",
      "Computational Thinking",
      "Logical Reasoning",
    ],

    image: "/images/certifications/insa.webp",
    certificateUrl: "/documents/certifications/insa.pdf",
  },

  {
    id: "raey-digital-certificate",
    title: "Certificate of Recognition",
    issuer: "Raey Digital Ethiopia Technology PLC",
    category: "achievement",
    doesNotExpire: true,
    featured: true,

    description:
      "Recognition for contributions, professional commitment, and performance during the mobile development internship at Raey Digital.",

    skills: [
      "Flutter",
      "Dart",
      "Mobile Development",
      "Problem Solving",
      "Team Collaboration",
    ],

    image: "/images/certifications/raey.webp",
    certificateUrl: "/documents/certifications/raey.pdf",
  },

  {
    id: "udacity-development",
    title: "Software Development",
    issuer: "Udacity",
    category: "course",
    doesNotExpire: true,
    featured: true,

    description:
      "Course completion certificate covering software development fundamentals and practical programming skills.",

    skills: [
      "Software Development",
      "Programming",
      "Problem Solving",
    ],

    image: "/images/certifications/udacity-development.webp",
    certificateUrl:
      "/documents/certifications/udacity-development.pdf",
  },

  {
    id: "udacity-data-science",
    title: "Data Science",
    issuer: "Udacity",
    category: "course",
    doesNotExpire: true,
    featured: true,

    description:
      "Course completion certificate focused on data science fundamentals and analytical problem-solving.",

    skills: [
      "Data Science",
      "Data Analysis",
      "Data Processing",
      "Analytical Thinking",
    ],

    image: "/images/certifications/udacity-data-science.webp",
    certificateUrl:
      "/documents/certifications/udacity-data-science.pdf",
  },
];

/**
 * Retrieve certifications sorted by latest issue date.
 */
export function getCertifications(): Certification[] {
  return [...certifications].sort((a, b) => {
    const dateA = a.issueDate
      ? new Date(a.issueDate).getTime()
      : 0;

    const dateB = b.issueDate
      ? new Date(b.issueDate).getTime()
      : 0;

    return dateB - dateA;
  });
}

/**
 * Retrieve featured certifications.
 */
export function getFeaturedCertifications(): Certification[] {
  return getCertifications().filter(
    (certification) => certification.featured === true
  );
}

/**
 * Retrieve certifications by category.
 */
export function getCertificationsByCategory(
  category: NonNullable<Certification["category"]>
): Certification[] {
  return getCertifications().filter(
    (certification) => certification.category === category
  );
}

/**
 * Retrieve distinct certification categories.
 */
export function getCertificationCategories() {
  return [
    ...new Set(
      certifications
        .map((certification) => certification.category)
        .filter(
          (category): category is NonNullable<
            Certification["category"]
          > => category !== undefined
        )
    ),
  ];
}

/**
 * Retrieve a certification by its unique ID.
 */
export function getCertificationById(
  id: string
): Certification | undefined {
  return certifications.find(
    (certification) => certification.id === id
  );
}