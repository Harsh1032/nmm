export type ReportRecord = {
  caseId: string;
  fullName: string;
  origin: string;
  destination: string;
  employer: string;
  visaStatus: string;
  primaryNeed: string;
};

export type AutomatedReport = {
  id: string;
  title: string;
  schedule: string;
  nextRun: string;
  recipients: string[];
};

export const reportRecords: ReportRecord[] = [
  {
    caseId: "MIG-9921",
    fullName: "Abebe Bikila",
    origin: "Ethiopia",
    destination: "Dubai, UAE",
    employer: "Emaar Construction",
    visaStatus: "Work (Active)",
    primaryNeed: "Health",
  },
  {
    caseId: "MIG-8842",
    fullName: "Sarah Otieno",
    origin: "Kenya",
    destination: "Doha, Qatar",
    employer: "Hamad Hospital",
    visaStatus: "Specialist",
    primaryNeed: "Legal",
  },
  {
    caseId: "REF-1029",
    fullName: "Jean-Claude B.",
    origin: "DRC",
    destination: "Kampala, Uganda",
    employer: "UNHCR-N/A",
    visaStatus: "Humanitarian",
    primaryNeed: "Shelter",
  },
  {
    caseId: "MIG-7731",
    fullName: "Fatima Al-Sayed",
    origin: "Sudan",
    destination: "Riyadh, Saudi Arabia",
    employer: "Al-Faisaliah Group",
    visaStatus: "Contract",
    primaryNeed: "None",
  },
  {
    caseId: "MIG-5510",
    fullName: "David Mwanga",
    origin: "Uganda",
    destination: "Abu Dhabi, UAE",
    employer: "Etihad Airways",
    visaStatus: "Work (Renewal)",
    primaryNeed: "Training",
  },
];

export const automatedReports: AutomatedReport[] = [
  {
    id: "RPT-AUTO-01",
    title: "Emaar Construction Monthly Audit",
    schedule: "Every 1st of Month",
    nextRun: "Oct 1, 2026",
    recipients: ["Min. Labour", "UAE Embassy"],
  },
  {
    id: "RPT-AUTO-02",
    title: "Refugee Health Service Usage",
    schedule: "Weekly (Mondays)",
    nextRun: "Aug 3, 2026",
    recipients: ["UNHCR", "MoH Uganda"],
  },
  {
    id: "RPT-AUTO-03",
    title: "Gulf Region Visa Expirations",
    schedule: "Daily (08:00)",
    nextRun: "Aug 3, 2026",
    recipients: ["Immigration", "Police"],
  },
  {
    id: "RPT-AUTO-04",
    title: "NGO Compliance Quarterly",
    schedule: "Quarterly",
    nextRun: "Oct 1, 2026",
    recipients: ["ISO Board", "Min. Internal"],
  },
];