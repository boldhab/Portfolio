import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AboutHero } from "@/components/about/AboutHero";
import { Biography } from "@/components/about/Biography";
import { DevelopmentJourney } from "@/components/about/DevelopmentJourney";
import { EducationSection } from "@/components/about/EducationSection";
import { CertificationsSection } from "@/components/about/CertificationsSection";
import { ResumeCTA } from "@/components/about/ResumeCTA";
import * as publicAssetModule from "@/lib/public-asset";
import { Profile, Education, Certification } from "@/types";

describe("About Page Components", () => {
  const mockProfile: Profile = {
    name: "Habtamu Befekadu",
    title: "Full-Stack Developer",
    subtitle: "Backend Engineering • Web • Mobile",
    biography: [
      "Habtamu is a software developer with experience in distributed systems.",
      "He designs resilient microservices and reactive user interfaces.",
    ],
    focus: "Focusing on backend systems, API design, and cloud architecture.",
    location: "Addis Ababa, Ethiopia",
    avatar: "/images/profile/avatar.png",
    resumeUrl: "/documents/resume.pdf",
    availability: {
      status: "available",
      badgeText: "Open to new opportunities",
      message: "Available for full-time engineering positions.",
    },
  };

  describe("AboutHero", () => {
    it("renders profile name, titles, focus, and location", () => {
      render(<AboutHero profile={mockProfile} />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Habtamu Befekadu" })
      ).toBeInTheDocument();
      expect(screen.getByText("Full-Stack Developer")).toBeInTheDocument();
      expect(screen.getByText(/focusing on backend systems/i)).toBeInTheDocument();
      expect(screen.getByText("Addis Ababa, Ethiopia")).toBeInTheDocument();
      expect(screen.getByText("Open to new opportunities")).toBeInTheDocument();
    });

    it("renders portrait only when asset exists on disk", () => {
      vi.spyOn(publicAssetModule, "hasPublicAsset").mockImplementation(
        (path) => (path ? path.includes("avatar.png") : false)
      );

      const { rerender } = render(<AboutHero profile={mockProfile} />);
      expect(
        screen.getByAltText(/portrait photograph of habtamu befekadu/i)
      ).toBeInTheDocument();

      // When asset does not exist on disk
      vi.spyOn(publicAssetModule, "hasPublicAsset").mockReturnValue(false);
      rerender(<AboutHero profile={mockProfile} />);
      expect(
        screen.queryByAltText(/portrait photograph of habtamu befekadu/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("Biography", () => {
    it("renders biography paragraphs when provided", () => {
      render(<Biography paragraphs={mockProfile.biography} />);

      expect(screen.getByText(/habtamu is a software developer/i)).toBeInTheDocument();
      expect(screen.getByText(/he designs resilient microservices/i)).toBeInTheDocument();
    });

    it("renders graceful empty state when biography is empty", () => {
      render(<Biography paragraphs={[]} />);

      expect(screen.getByText(/biography in preparation/i)).toBeInTheDocument();
    });
  });

  describe("DevelopmentJourney", () => {
    it("renders journey, approach, and interests when provided", () => {
      render(
        <DevelopmentJourney
          journey={[
            "Started with C and Python.",
            "Evolved into Go and Next.js full-stack systems.",
          ]}
          engineeringApproach={["Test-driven development", "Deterministic concurrency"]}
          technicalInterests={["Distributed Systems", "Cloud Infrastructure"]}
        />
      );

      expect(screen.getByText(/started with c and python/i)).toBeInTheDocument();
      expect(screen.getByText(/test-driven development/i)).toBeInTheDocument();
      expect(screen.getByText("Distributed Systems")).toBeInTheDocument();
    });

    it("returns null when no journey or approach content is provided", () => {
      const { container } = render(<DevelopmentJourney />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("EducationSection", () => {
    const mockEducation: Education[] = [
      {
        id: "edu-1",
        institution: "Addis Ababa University",
        program: "Computer Science",
        degree: "B.Sc.",
        startDate: "2019",
        endDate: "2023",
        location: "Addis Ababa",
        highlights: ["Dean's List", "Distributed Systems Specialization"],
        institutionUrl: "https://aau.edu.et",
      },
    ];

    it("renders education records with degree, institution, and highlights", () => {
      render(<EducationSection education={mockEducation} />);

      expect(screen.getByText("B.Sc. in Computer Science")).toBeInTheDocument();
      expect(screen.getByText("Addis Ababa University")).toBeInTheDocument();
      expect(screen.getByText(/2019 — 2023/)).toBeInTheDocument();
      expect(screen.getByText("Dean's List")).toBeInTheDocument();
    });

    it("returns null when education dataset is empty", () => {
      const { container } = render(<EducationSection education={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("CertificationsSection", () => {
    const mockCertifications: Certification[] = [
      {
        id: "cert-1",
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        issueDate: "2024-05",
        credentialUrl: "https://aws.amazon.com/verify/123",
        credentialId: "AWS-123456",
      },
    ];

    it("renders certifications with title, issuer, and credential link", () => {
      render(<CertificationsSection certifications={mockCertifications} />);

      expect(screen.getByText("AWS Certified Solutions Architect")).toBeInTheDocument();
      expect(screen.getByText("Amazon Web Services")).toBeInTheDocument();
      expect(
        screen.getByLabelText(
          /view verified credential for aws certified solutions architect/i
        )
      ).toHaveAttribute("href", "https://aws.amazon.com/verify/123");
      expect(screen.getByText(/id: aws-123456/i)).toBeInTheDocument();
    });

    it("returns null when certifications dataset is empty", () => {
      const { container } = render(<CertificationsSection certifications={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("ResumeCTA", () => {
    it("renders download and view links when resume file exists on disk", () => {
      vi.spyOn(publicAssetModule, "hasPublicAsset").mockReturnValue(true);

      render(<ResumeCTA resumeUrl="/documents/resume.pdf" />);

      expect(
        screen.getByLabelText(/download habtamu befekadu's resume/i)
      ).toHaveAttribute("href", "/documents/resume.pdf");
      expect(screen.getByLabelText(/view habtamu befekadu's resume/i)).toHaveAttribute(
        "href",
        "/documents/resume.pdf"
      );
    });

    it("renders request message when resume file is not on disk", () => {
      vi.spyOn(publicAssetModule, "hasPublicAsset").mockReturnValue(false);

      render(<ResumeCTA resumeUrl="/documents/resume.pdf" />);

      expect(
        screen.getByText(/pdf résumé is available upon request/i)
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /request cv/i })).toHaveAttribute(
        "href",
        "/contact"
      );
    });
  });
});
