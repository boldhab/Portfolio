# Education & Certifications Guide

This guide details how **Habtamu Befekadu** can add and maintain academic degrees, qualifications, and verified professional certifications displayed on the `/about` page.

---

## 1. Education Data

### Location

Academic records are stored in:

```
src/
└── data/
    └── education.ts
```

### Schema & Example

The `educationHistory` array implements the `Education` interface from `src/types/education.ts`:

```typescript
// src/data/education.ts
import { Education } from "@/types";

export const educationHistory: Education[] = [
  {
    id: "aau-bsc-cs",
    institution: "Addis Ababa University",
    program: "Computer Science",
    degree: "B.Sc.",
    location: "Addis Ababa, Ethiopia",
    startDate: "2019-09",
    endDate: "2023-07",
    isCurrent: false,
    description:
      "Focus on algorithms, distributed data structures, computer networks, and operating systems.",
    highlights: [
      "Graduated with Distinction; Dean's Honor Roll.",
      "Capstone Project: High-performance peer-to-peer file transfer engine.",
      "President of the University Competitive Programming Society.",
    ],
    institutionUrl: "https://www.aau.edu.et",
  },
];
```

### Field Reference

- `id` (required): Unique identifier string.
- `institution` (required): Name of university, college, or academic organization.
- `program` (required): Field of study (e.g., `"Computer Science"`).
- `degree` (optional): Academic title (e.g., `"B.Sc."`, `"M.Sc."`).
- `location` (optional): Campus city / country.
- `startDate` / `endDate` (optional): Timeframe in `YYYY` or `YYYY-MM` format.
- `isCurrent` (optional): Set `true` if studies are ongoing.
- `description` (optional): Overview of academic focus or coursework.
- `highlights` (optional): Array of awards, honors, specializations, or thesis titles.
- `institutionUrl` (optional): Official website link.

_Note: If `educationHistory` is empty (`[]`), the section is cleanly omitted from the About page._

---

## 2. Professional Certifications Data

### Location

Certifications and verified credentials live in:

```
src/
└── data/
    └── certifications.ts
```

### Schema & Example

The `certifications` array implements the `Certification` interface from `src/types/certification.ts`:

```typescript
// src/data/certifications.ts
import { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "aws-solutions-architect",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2024-06",
    expirationDate: "2027-06",
    credentialUrl: "https://www.credly.com/your-verified-link",
    credentialId: "AWS-SAA-12345678",
    description:
      "Demonstrated expertise in designing highly available, cost-effective, and fault-tolerant distributed cloud architectures.",
  },
];
```

### Field Reference

- `id` (required): Unique string ID.
- `title` (required): Name of the certification or license.
- `issuer` (required): Issuing vendor or organization (e.g., `"Amazon Web Services"`, `"Google Cloud"`).
- `issueDate` (required): Date awarded in `YYYY-MM` format.
- `expirationDate` (optional): Date of expiration if applicable.
- `credentialUrl` (optional): Verified Credly / verification URL. An external link icon is rendered only when this URL is valid.
- `credentialId` (optional): Public license or verification code.
- `description` (optional): Summary of assessed competencies.

_Note: If `certifications` is empty (`[]`), the section is cleanly omitted from the About page._
