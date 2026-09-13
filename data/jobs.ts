export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  salary: string;
  type: string;
  category: string;
  posted: string;
  deadline: string;
  summary: string;
  description: string;
  requirements: string[];
  benefits: string[];
};

export const jobs: Job[] = [
  {
    id: "registered-nurse-doha",
    title: "Registered Nurse",
    company: "Hamad Medical Services",
    location: "Doha",
    country: "Qatar",
    salary: "AED 7,500 – 9,500 / month",
    type: "Full Time",
    category: "Healthcare",
    posted: "2 days ago",
    deadline: "30 Sep 2026",
    summary:
      "Provide professional nursing care within a modern hospital environment.",
    description:
      "The successful candidate will work with the clinical team to provide safe and effective patient care, maintain medical records and support hospital procedures.",
    requirements: [
      "Bachelor's degree or diploma in Nursing",
      "Valid nursing registration",
      "Minimum 2 years of clinical experience",
      "English communication skills",
      "Valid passport",
    ],
    benefits: [
      "Accommodation allowance",
      "Medical insurance",
      "Annual leave",
      "Return airfare",
      "Visa sponsorship",
    ],
  },

  {
    id: "civil-engineer-riyadh",
    title: "Civil Engineer",
    company: "Al Noor Engineering",
    location: "Riyadh",
    country: "Saudi Arabia",
    salary: "AED 8,000 – 11,000 / month",
    type: "Full Time",
    category: "Engineering",
    posted: "3 days ago",
    deadline: "04 Oct 2026",
    summary:
      "Support infrastructure and commercial construction projects.",
    description:
      "The Civil Engineer will assist with planning, site supervision, quality control and project coordination across multiple construction sites.",
    requirements: [
      "Bachelor's degree in Civil Engineering",
      "3+ years of construction experience",
      "AutoCAD knowledge",
      "Strong site coordination skills",
      "Valid passport",
    ],
    benefits: [
      "Company accommodation",
      "Transport allowance",
      "Medical insurance",
      "Annual leave",
      "Visa sponsorship",
    ],
  },

  {
    id: "it-support-dubai",
    title: "IT Support Specialist",
    company: "Gulf Digital Systems",
    location: "Dubai",
    country: "United Arab Emirates",
    salary: "AED 6,000 – 8,000 / month",
    type: "Full Time",
    category: "Technology",
    posted: "Today",
    deadline: "28 Sep 2026",
    summary:
      "Provide technical support for end users, devices and business systems.",
    description:
      "The IT Support Specialist will resolve hardware, software and network issues, manage user accounts and assist with infrastructure support.",
    requirements: [
      "Diploma or degree in IT",
      "1–3 years of IT support experience",
      "Windows and Microsoft 365 experience",
      "Basic networking knowledge",
      "Good communication skills",
    ],
    benefits: [
      "Medical insurance",
      "Visa sponsorship",
      "Annual leave",
      "Training opportunities",
    ],
  },

  {
    id: "hospitality-supervisor-kuwait",
    title: "Hospitality Supervisor",
    company: "Marina Hospitality Group",
    location: "Kuwait City",
    country: "Kuwait",
    salary: "AED 5,500 – 7,000 / month",
    type: "Full Time",
    category: "Hospitality",
    posted: "1 day ago",
    deadline: "02 Oct 2026",
    summary:
      "Supervise guest services and daily hospitality operations.",
    description:
      "Responsible for supervising service teams, ensuring guest satisfaction and maintaining hospitality service standards.",
    requirements: [
      "2+ years hospitality experience",
      "Previous supervisory experience preferred",
      "Customer service skills",
      "English communication skills",
    ],
    benefits: [
      "Accommodation",
      "Meals",
      "Transport",
      "Medical insurance",
      "Visa sponsorship",
    ],
  },

  {
    id: "electrician-abu-dhabi",
    title: "Electrician",
    company: "Emirates Technical Services",
    location: "Abu Dhabi",
    country: "United Arab Emirates",
    salary: "AED 3,500 – 4,500 / month",
    type: "Full Time",
    category: "Skilled Trade",
    posted: "4 days ago",
    deadline: "05 Oct 2026",
    summary:
      "Perform electrical installation, maintenance and repair work.",
    description:
      "The Electrician will install, inspect and maintain electrical equipment and systems in commercial facilities.",
    requirements: [
      "Electrical trade certification",
      "2+ years relevant experience",
      "Ability to read electrical drawings",
      "Knowledge of electrical safety procedures",
    ],
    benefits: [
      "Accommodation",
      "Transport",
      "Medical insurance",
      "Overtime opportunities",
      "Visa sponsorship",
    ],
  },

  {
    id: "heavy-driver-oman",
    title: "Heavy Vehicle Driver",
    company: "Muscat Logistics",
    location: "Muscat",
    country: "Oman",
    salary: "AED 3,800 – 5,000 / month",
    type: "Full Time",
    category: "Logistics",
    posted: "5 days ago",
    deadline: "29 Sep 2026",
    summary:
      "Operate heavy vehicles for regional logistics and delivery operations.",
    description:
      "The driver will transport cargo safely, perform basic vehicle inspections and comply with company and road safety requirements.",
    requirements: [
      "Valid heavy vehicle driving licence",
      "Minimum 3 years driving experience",
      "Clean driving record",
      "Basic English communication",
    ],
    benefits: [
      "Accommodation",
      "Transport",
      "Medical insurance",
      "Overtime",
      "Visa sponsorship",
    ],
  },
];