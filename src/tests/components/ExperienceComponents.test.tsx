import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ExperienceItem } from "@/components/experience/ExperienceItem";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { getExperiences, getExperiencesByType, experiences } from "@/data/experience";
import { Experience } from "@/types";

describe("Experience Components & Data Logic", () => {
  const sampleExperiences: Experience[] = [
    {
      id: "exp-1",
      organization: "Tech Corp",
      role: "Senior Backend Engineer",
      type: "employment",
      startDate: "2023-01",
      endDate: null,
      isCurrent: true,
      location: "Remote",
      description: "Leading distributed microservices engineering.",
      responsibilities: [
        "Architected gRPC event pipeline",
        "Improved API throughput by 40%",
      ],
      achievements: ["Zero-downtime database migration"],
      technologies: ["Go", "Kafka", "PostgreSQL", "Docker"],
      organizationUrl: "https://techcorp.com",
    },
    {
      id: "exp-2",
      organization: "FinTech Innovations",
      role: "Full-Stack Developer",
      type: "employment",
      startDate: "2021-06",
      endDate: "2022-12",
      isCurrent: false,
      location: "Addis Ababa",
      description: "Built web banking portals and payments processing systems.",
      responsibilities: [
        "Engineered React dashboard",
        "Integrated Stripe and Telebirr payment gateways",
      ],
      technologies: ["TypeScript", "Next.js", "Node.js", "Redis"],
    },
    {
      id: "exp-3",
      organization: "Open Source Academy",
      role: "Software Engineering Intern",
      type: "internship",
      startDate: "2020-07",
      endDate: "2020-10",
      isCurrent: false,
      description: "Contributed to developer CLI tools.",
      responsibilities: ["Added unit tests", "Fixed concurrency race conditions"],
      technologies: ["Python", "Git"],
    },
  ];

  describe("ExperienceItem", () => {
    it("renders role, organization, type badge, date range, responsibilities, and technologies", () => {
      render(<ExperienceItem experience={sampleExperiences[0]} />);

      expect(screen.getByText("Senior Backend Engineer")).toBeInTheDocument();
      expect(screen.getByText("Tech Corp")).toBeInTheDocument();
      expect(screen.getByText("EMPLOYMENT")).toBeInTheDocument();
      expect(screen.getByText(/2023-01 — Present/)).toBeInTheDocument();
      expect(screen.getByText("Remote")).toBeInTheDocument();
      expect(screen.getByText(/architected grpc event pipeline/i)).toBeInTheDocument();
      expect(screen.getByText(/zero-downtime database migration/i)).toBeInTheDocument();
      expect(screen.getByText("Kafka")).toBeInTheDocument();
    });

    it("renders organization URL link when provided", () => {
      render(<ExperienceItem experience={sampleExperiences[0]} />);

      const orgLink = screen.getByRole("link", { name: /tech corp/i });
      expect(orgLink).toHaveAttribute("href", "https://techcorp.com");
    });
  });

  describe("ExperienceTimeline", () => {
    it("renders all experiences and category filter buttons when multiple types exist", async () => {
      const user = userEvent.setup();
      render(<ExperienceTimeline experiences={sampleExperiences} />);

      expect(
        screen.getByRole("heading", { name: "Senior Backend Engineer" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Full-Stack Developer" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Software Engineering Intern" })
      ).toBeInTheDocument();

      // Filter tabs
      const internshipTab = screen.getByRole("tab", { name: /internship/i });
      expect(internshipTab).toBeInTheDocument();

      await user.click(internshipTab);

      // Only internship should be visible
      expect(
        screen.getByRole("heading", { name: "Software Engineering Intern" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "Senior Backend Engineer" })
      ).not.toBeInTheDocument();
    });

    it("renders graceful empty state when experience list is empty", () => {
      render(<ExperienceTimeline experiences={[]} />);

      expect(screen.getByText(/experience details in preparation/i)).toBeInTheDocument();
    });
  });

  describe("Experience Data Utilities", () => {
    it("sorts current positions first, then by latest start date", () => {
      // Temporarily populate experiences array for function testing
      experiences.length = 0;
      experiences.push(...sampleExperiences);

      const sorted = getExperiences();
      expect(sorted[0].id).toBe("exp-1"); // isCurrent: true
      expect(sorted[1].id).toBe("exp-2"); // 2021-06
      expect(sorted[2].id).toBe("exp-3"); // 2020-07

      // Reset
      experiences.length = 0;
    });

    it("filters experiences by type accurately", () => {
      experiences.length = 0;
      experiences.push(...sampleExperiences);

      const internships = getExperiencesByType("internship");
      expect(internships).toHaveLength(1);
      expect(internships[0].id).toBe("exp-3");

      const employments = getExperiencesByType("employment");
      expect(employments).toHaveLength(2);

      experiences.length = 0;
    });
  });
});
