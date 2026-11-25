import type { SocialLink } from "@/types";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    platform: "GitHub",
    label: "GitHub Profile",
    url: "https://github.com/boldhab",
    iconName: "github",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    label: "LinkedIn Profile",
    url: "https://www.linkedin.com/in/habtam-befekadu/",
    iconName: "linkedin",
  },
  {
    id: "email",
    platform: "Email",
    label: "Send Email",
    url: "mailto:habtamubefekadu20@gmail.com",
    iconName: "mail",
  },
  {
    id: "resume",
    platform: "Resume",
    label: "Download CV",
    url: "/resume.pdf",
    iconName: "download",
  },
  {
    id: "upwork",
    platform: "Upwork",
    label: "Upwork Profile",
    url: "https://www.upwork.com/freelancers/YOUR_PROFILE_ID",
    iconName: "upwork",
  },
];