// src/data/alerts.ts

export type AlertSeverity = "Critical" | "Warning" | "Info";
export type AlertStatus = "New" | "Under Review" | "Resolved";

export type AffectedRecord = {
  id: string;
  name: string;
  classification: string;
};

export type AlertRecord = {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  date: string;
  location: string;
  assignedTo: string;
  assignedRole: string;
  incidentSummary: string;
  protocol: string;
  affectedRecords: AffectedRecord[];
};

export const alerts: AlertRecord[] = [
  {
    id: "ALT-2026-1042",
    title: "Contract & Visa Discrepancy",
    description:
      "Automated system detected irregularities between employment contracts and active work visas at Emaar Construction site.",
    severity: "Critical",
    status: "New",
    date: "2026-08-02 09:24 AM",
    location: "Dubai, United Arab Emirates",
    assignedTo: "Ministry of Labour",
    assignedRole: "Primary Responder",
    incidentSummary:
      "Automated system detected inconsistencies between registered employment contracts, payroll information and active work visas for personnel assigned to Emaar Construction.",
    protocol:
      "Initiate contact with Emaar HR and schedule immediate consular review. Notify local immigration police for record update.",
    affectedRecords: [
      {
        id: "MIG-442",
        name: "John Kamau",
        classification: "Construction Worker",
      },
      {
        id: "MIG-501",
        name: "Sarah Otieno",
        classification: "Construction Worker",
      },
      {
        id: "MIG-128",
        name: "David Mwangi",
        classification: "Foreman",
      },
    ],
  },
  {
    id: "ALT-2026-1038",
    title: "Police Flagging: Fraudulent ID",
    description:
      "Secondary inspection flagged potential counterfeit documentation for a group of workers.",
    severity: "Critical",
    status: "Under Review",
    date: "2026-08-01 11:30 AM",
    location: "Entebbe International Airport",
    assignedTo: "National Police",
    assignedRole: "Security Responder",
    incidentSummary:
      "Identity verification systems detected inconsistencies in supporting documents submitted by several arriving workers.",
    protocol:
      "Hold affected records for manual validation and notify the issuing authorities before clearance.",
    affectedRecords: [
      {
        id: "MIG-729",
        name: "Peter Ochieng",
        classification: "Skilled Worker",
      },
    ],
  },
  {
    id: "ALT-2026-1032",
    title: "Health Support Required",
    description:
      "Recurring medical assistance requests from 12 workers in the Al Quoz industrial district.",
    severity: "Info",
    status: "New",
    date: "2026-07-31 04:20 PM",
    location: "Al Quoz, Dubai",
    assignedTo: "Support Services",
    assignedRole: "Medical Coordination",
    incidentSummary:
      "A cluster of recurring medical service requests has been detected from workers at a shared accommodation site.",
    protocol:
      "Dispatch a mobile medical team and review accommodation health and safety records.",
    affectedRecords: [
      {
        id: "MIG-812",
        name: "Joseph Kato",
        classification: "Factory Worker",
      },
      {
        id: "MIG-813",
        name: "Mariam Nambasa",
        classification: "Factory Worker",
      },
    ],
  },
  {
    id: "ALT-2026-1027",
    title: "Job Placement Mismatch",
    description:
      "Migrant report indicates contracted role does not match current duties.",
    severity: "Warning",
    status: "New",
    date: "2026-07-31 02:10 PM",
    location: "Abu Dhabi",
    assignedTo: "Ministry of Labour",
    assignedRole: "Employment Compliance",
    incidentSummary:
      "The worker's registered contract lists a clerical position, while current employment records indicate manual labour duties.",
    protocol:
      "Contact the employer, inspect the signed contract and verify consent for any role change.",
    affectedRecords: [
      {
        id: "MIG-945",
        name: "Grace Achieng",
        classification: "Administrative Assistant",
      },
    ],
  },
];