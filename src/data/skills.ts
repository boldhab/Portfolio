import { SkillCategory } from "@/types";

/**
 * Core technical skills and engineering competencies.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Java" },
      { name: "Python" },
      { name: "C++" },
      { name: "C#" },
      { name: "Dart" },
      { name: "PHP" },
      { name: "Kotlin" },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    skills: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Responsive Web Design" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Spring Boot" },
      { name: "Spring Security" },
      { name: "PHP" },
      { name: "REST API Development" },
      { name: "JWT Authentication" },
      { name: "Role-Based Access Control" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    skills: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Riverpod" },
      { name: "Kotlin" },
      { name: "Android Development" },
      { name: "REST API Integration" },
      { name: "Offline-First Development" },
    ],
  },
  {
    id: "databases",
    title: "Databases & ORM",
    skills: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "SQLite" },
      { name: "Redis" },
      { name: "PostGIS" },
      { name: "Prisma ORM" },
      { name: "Hibernate" },
      { name: "Relational Database Design" },
    ],
  },
  {
    id: "testing",
    title: "Testing & Software Quality",
    skills: [
      { name: "Jest" },
      { name: "Vitest" },
      { name: "Cypress" },
      { name: "Playwright" },
      { name: "Flutter Test" },
      { name: "Unit Testing" },
      { name: "Integration Testing" },
      { name: "Test Automation" },
    ],
  },
  {
    id: "tools",
    title: "DevOps & Development Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Docker Compose" },
      { name: "Linux" },
      { name: "Postman" },
      { name: "Vercel" },
      { name: "Android Studio" },
    ],
  },
  {
    id: "architecture",
    title: "Software Engineering & Architecture",
    skills: [
      { name: "Clean Architecture" },
      { name: "Modular Architecture" },
      { name: "Multi-Tenant Architecture" },
      { name: "MVC Architecture" },
      { name: "Object-Oriented Programming" },
      { name: "Design Patterns" },
      { name: "Data Structures & Algorithms" },
      { name: "System Design" },
      { name: "Application Security" },
    ],
  },
];

/**
 * Retrieve all skill categories.
 */
export function getSkillCategories(): SkillCategory[] {
  return skillCategories;
}