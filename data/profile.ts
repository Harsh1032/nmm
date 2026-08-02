// src/data/profile.ts

export type ProfileDetail = {
  label: string;
  value: string;
};

export type CaseNote = {
  author: string;
  date: string;
  content: string;
};

export type RelatedContact = {
  initials: string;
  name: string;
  description: string;
  contact: string;
  category: string;
};

export const profileData = {
  id: "MIG-2024-8842",
  name: "Hon Minister Okello",
  nationality: "Kenyan",
  passportNumber: "AK-992810-Z",
  status: "Active - Legal Employment",

  personalInformation: [
    {
      label: "Full Name",
      value: "Hon Minister Okello",
    },
    {
      label: "Date of Birth",
      value: "12 May 1995 (28 yrs)",
    },
    {
      label: "Gender",
      value: "Male",
    },
    {
      label: "Nationality",
      value: "Kenyan",
    },
    {
      label: "Language(s)",
      value: "Swahili, English, Luganda",
    },
  ] satisfies ProfileDetail[],

  migrationInformation: [
    {
      label: "Migration ID",
      value: "MIG-2024-8842",
    },
    {
      label: "Visa Type",
      value: "Employment - Skilled (Tier 2)",
    },
    {
      label: "Arrival Date",
      value: "Oct 14, 2023",
    },
    {
      label: "Visa Expiry",
      value: "Oct 14, 2025",
    },
    {
      label: "Point of Entry",
      value: "Jomo Kenyatta Intl (JKIA)",
    },
  ] satisfies ProfileDetail[],

  employer: {
    company: "Emaar Properties PJSC",
    registration: "UAE-772910-B",
    position: "Hospitality Lead Coordinator",
    skillLevel: "Skilled Professional",
    location: "Dubai, United Arab Emirates",
    emirates: "Zone: Business Bay, Dubai",
    verified: true,
  },

  notes: [
    {
      author: "Office of Labour Attaché",
      date: "22 Feb 2024, 09:14 AM",
      content:
        "Subject contacted the hotline regarding a minor discrepancy in overtime pay for January. Resolved internally with employer HR department. Amina confirmed resolution on Feb 24.",
    },
    {
      author: "Ministry Admin (HQ)",
      date: "15 Dec 2023, 02:45 PM",
      content:
        "Visa documentation validated. Original passport returned to subject at departure lounge. Digital copy archived.",
    },
  ] satisfies CaseNote[],

  relatedContacts: [
    {
      initials: "SB",
      name: "Samuel Bakari",
      description: "Father",
      contact: "+254 712 334 556",
      category: "Father (Next of Kin)",
    },
    {
      initials: "SJ",
      name: "Sarah Jenkins",
      description: "Employer Liaison",
      contact: "s.jenkins@emaar.ae",
      category: "Employer Liaison",
    },
    {
      initials: "LA",
      name: "Legal Attaché (UAE)",
      description: "Government Contact",
      contact: "Dubai Consulate Office",
      category: "Government",
    },
  ] satisfies RelatedContact[],
};