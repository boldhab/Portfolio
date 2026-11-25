import type { Education } from "@/types";

/**
 * Academic background, relevant coursework,
 * and educational achievements.
 */
export const educationHistory: Education[] = [
  {
    id: "dbu-software-engineering",
    institution: "Debre Birhan University",
    program: "Software Engineering",
    degree: "Bachelor of Science (B.Sc.)",
    fieldOfStudy: "Software Engineering",
    location: "Debre Birhan, Ethiopia",
    isCurrent: true,
    academicLevel: "Fourth-year undergraduate",

    description:
      "Currently pursuing a Bachelor of Science in Software Engineering as a fourth-year undergraduate student. Developing theoretical knowledge and practical engineering skills in software development, system architecture, database engineering, distributed systems, artificial intelligence, and cybersecurity through academic coursework, laboratory exercises, and collaborative projects.",

    highlights: [
      "Software Engineering Principles",
      "Object-Oriented Programming",
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Software Architecture and Design",
      "Software Design Patterns",
      "Component-Based Software Engineering",
      "Distributed Systems",
      "Web Application Development",
      "Mobile Application Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Software Testing and Quality Assurance",
      "Computer Networking",
      "Computer Security",
      "Cryptography",
      "Compiler Design",
    ],
  },
];

/**
 * Retrieve education entries with current programs first,
 * followed by the most recent start date.
 */
export function getEducationHistory(): Education[] {
  return [...educationHistory].sort((a, b) => {
    const isCurrentA = a.isCurrent === true;
    const isCurrentB = b.isCurrent === true;

    if (isCurrentA !== isCurrentB) {
      return Number(isCurrentB) - Number(isCurrentA);
    }

    const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;

    const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;

    return dateB - dateA;
  });
}

/**
 * Retrieve currently active educational programs.
 */
export function getCurrentEducation(): Education[] {
  return getEducationHistory().filter((education) => education.isCurrent === true);
}

/**
 * Retrieve completed educational programs.
 */
export function getCompletedEducation(): Education[] {
  return getEducationHistory().filter((education) => education.isCurrent === false);
}

/**
 * Retrieve a specific education entry by ID.
 */
export function getEducationById(id: string): Education | undefined {
  return educationHistory.find((education) => education.id === id);
}
