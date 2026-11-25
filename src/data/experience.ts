import type { Experience, ExperienceType } from "@/types";

/**
 * Professional experience, internships,
 * and technical training history.
 */
export const experiences: Experience[] = [
  {
    id: "raey-digital",
    organization: "Raey Digital Ethiopia Technology PLC",
    role: "Mobile Development Intern",
    position: "Mobile Development Intern",
    type: "internship",
    employmentType: "Internship",
    startDate: "2026-11",
    isCurrent: true,
    location: "Ethiopia",

    description:
      "Contributing to the development of a Flutter-based retail management platform, focusing on reliable mobile workflows, backend integration, and application quality.",

    responsibilities: [
      "Developing and maintaining cross-platform mobile application features using Flutter and Dart.",
      "Implementing idempotent form submission mechanisms to prevent duplicate transactions.",
      "Working with Supabase and PostgreSQL backend services.",
      "Analyzing system architecture, database schemas, business rules, and security requirements.",
      "Writing and executing automated tests to verify application functionality.",
      "Collaborating through Git branches, pull requests, and code reviews.",
    ],

    achievements: [
      "Recognized as Intern of the Week for strong ownership, problem-solving, and effective team communication.",
    ],

    technologies: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
      "Git",
      "GitHub",
    ],
  },

  {
    id: "gcode-technologies",
    organization: "gCODE Technologies",
    role: "Full-Stack Developer Intern",
    position: "Full-Stack Developer Intern",
    type: "internship",
    employmentType: "Full-time Internship",
    startDate: "2026-06",
    endDate: "2026-10",
    isCurrent: false,
    location: "Addis Ababa, Ethiopia (Hybrid)",

    description:
      "Contributed to the development of a Multi-Layer Human Resource Management (HRM) System, focusing on backend engineering, REST API development, database management, and full-stack application features.",

    responsibilities: [
      "Developed and maintained full-stack features for a multi-layer HRM system.",
      "Implemented backend modules for employee performance evaluation and HR management workflows.",
      "Designed RESTful APIs, service-layer logic, and database repositories.",
      "Implemented database models and relationships using PostgreSQL and Prisma ORM.",
      "Applied modular architecture, input validation, and maintainable coding practices.",
      "Collaborated with development teams through Git, feature branches, and pull requests.",
      "Resolved merge conflicts and contributed to code integration.",
      "Improved existing application functionality and code maintainability.",
    ],

    achievements: [
      "Successfully completed a three-month full-time internship as part of Cohort 1.",
      "Contributed to the development of a real-world Multi-Layer HRM System.",
      "Received an internship completion certificate on October 25, 2026.",
    ],

    technologies: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "React",
      "Next.js",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "REST APIs",
      "Docker",
      "Git",
      "GitHub",
    ],
  },

  {
    id: "insa-summer-camp",
    organization: "Information Network Security Administration (INSA)",
    role: "Summer Camp Trainee",
    position: "Technical Training Participant",
    type: "training",
    employmentType: "Intensive Training Program",
    isCurrent: false,
    location: "Ethiopia",

    description:
      "Completed an intensive 30-day summer training program organized by INSA, focusing on programming, algorithmic problem-solving, computational thinking, and technical skill development.",

    responsibilities: [
      "Participated in intensive programming and coding exercises.",
      "Solved algorithmic challenges using structured problem-solving techniques.",
      "Applied logical reasoning and computational thinking to technical problems.",
      "Participated in psychometric assessments and aptitude evaluations.",
      "Strengthened programming fundamentals through practical exercises.",
      "Developed analytical thinking, adaptability, and problem-solving skills.",
      "Prepared and submitted a final training reflection.",
    ],

    achievements: [
      "Successfully completed the 30-day intensive summer camp program.",
      "Strengthened programming and algorithmic problem-solving capabilities.",
      "Completed technical exercises and psychometric assessments.",
      "Gained practical experience in structured technical learning.",
    ],

    technologies: [
      "Programming Fundamentals",
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Computational Thinking",
      "Logical Reasoning",
      "Software Development Fundamentals",
    ],
  },
];

/**
 * Retrieve all experiences sorted by current status
 * and most recent start date.
 */
export function getExperiences(): Experience[] {
  return [...experiences].sort((a, b) => {
    const isCurrentA = a.isCurrent === true;
    const isCurrentB = b.isCurrent === true;

    if (isCurrentA !== isCurrentB) {
      return Number(isCurrentB) - Number(isCurrentA);
    }

    const dateA = a.startDate
      ? new Date(a.startDate).getTime()
      : 0;

    const dateB = b.startDate
      ? new Date(b.startDate).getTime()
      : 0;

    return dateB - dateA;
  });
}

/**
 * Retrieve experiences filtered by type.
 */
export function getExperiencesByType(
  type: ExperienceType
): Experience[] {
  return getExperiences().filter(
    (experience) => (experience.type || "employment") === type
  );
}

/**
 * Retrieve distinct experience categories.
 */
export function getExperienceTypes(): ExperienceType[] {
  return [
    ...new Set<ExperienceType>(
      experiences.map(
        (experience) => experience.type || "employment"
      )
    ),
  ];
}

/**
 * Retrieve professional employment and internships.
 */
export function getProfessionalExperiences(): Experience[] {
  return getExperiences().filter(
    (experience) =>
      experience.type === "employment" ||
      experience.type === "internship"
  );
}

/**
 * Retrieve technical training experiences.
 */
export function getTrainingExperiences(): Experience[] {
  return getExperiencesByType("training");
}

/**
 * Retrieve currently active experiences.
 */
export function getCurrentExperiences(): Experience[] {
  return getExperiences().filter(
    (experience) => experience.isCurrent === true
  );
}

/**
 * Retrieve completed experiences.
 */
export function getCompletedExperiences(): Experience[] {
  return getExperiences().filter(
    (experience) => experience.isCurrent === false
  );
}

/**
 * Retrieve a specific experience by its unique ID.
 */
export function getExperienceById(
  id: string
): Experience | undefined {
  return experiences.find(
    (experience) => experience.id === id
  );
}