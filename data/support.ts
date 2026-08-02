import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Fingerprint,
  LockKeyhole,
  Send,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export type OnboardingGuide = {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type KnowledgeArticle = {
  id: string;
  title: string;
  description: string;
  articleCount: number;
  icon: LucideIcon;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const onboardingGuides: OnboardingGuide[] = [
  {
    id: "ministry",
    category: "Government",
    title: "Ministry Personnel",
    description:
      "Comprehensive guide for data entry, policy reporting, and inter-departmental workflows.",
    icon: ShieldCheck,
  },
  {
    id: "ngo",
    category: "International",
    title: "NGO & UN Partners",
    description:
      "Guidelines for humanitarian aid tracking, shelter management, and support services usage.",
    icon: UsersRound,
  },
  {
    id: "employers",
    category: "Private Sector",
    title: "Employers & Recruitment",
    description:
      "Instructions for legal worker registration, visa associations, and contract compliance.",
    icon: Building2,
  },
  {
    id: "public",
    category: "Public",
    title: "Citizen & Migrant",
    description:
      "Steps for identity verification, support request tracking, and privacy settings management.",
    icon: UsersRound,
  },
];

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "data-integrity",
    title: "Data Integrity & Validation",
    description:
      "Best practices for maintaining clean records and understanding validation rules.",
    articleCount: 24,
    icon: ShieldCheck,
  },
  {
    id: "privacy",
    title: "Privacy & Data Protection",
    description:
      "Details on compliance with the National Data Protection Act and GDPR.",
    articleCount: 12,
    icon: LockKeyhole,
  },
  {
    id: "biometric",
    title: "Biometric Integration",
    description:
      "Troubleshooting iris and fingerprint scanner hardware and API connections.",
    articleCount: 8,
    icon: Fingerprint,
  },
  {
    id: "api",
    title: "Exporting & API Access",
    description:
      "Developer documentation for third-party integration and batch data processing.",
    articleCount: 15,
    icon: Send,
  },
];

export const frequentlyAskedQuestions: FAQItem[] = [
  {
    id: "medical",
    question: "How do I flag an urgent medical case?",
    answer:
      "Open the migrant profile, select Critical Interventions, and choose the emergency medical support action. The incident will be logged and assigned to the appropriate response team.",
  },
  {
    id: "revoke",
    question: "Can I revoke employer access to worker data?",
    answer:
      "Authorized Ministry administrators can suspend employer access from the employer association record. The action should include a reason and will be stored in the security audit log.",
  },
  {
    id: "pattern",
    question: 'What is the "Emaar Construction" data pattern?',
    answer:
      "This refers to a grouped reporting view of workers associated with Emaar Construction, including visa status, payroll discrepancies, contract compliance, and support-service usage.",
  },
];