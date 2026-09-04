// src/data/dashboard.ts

export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
  icon: "active" | "arrival" | "departure" | "alert";
};

export type MigrationRecord = {
  id: string;
  name: string;
  nationality: string;
  employer: string;
  destination: string;
  sector: string;

  type:
    | "Work"
    | "Refugee";

  stage:
    | "Submitted"
    | "Under Review"
    | "More Information"
    | "Approved"
    | "Rejected";

  avatar: string;

  applicantType?:
    | string
    | null;

  movementDirection?:
    | string
    | null;

  visaType?:
    | string
    | null;
};

export type NationalityDatum = {
  label: string;

  // Width relative to largest nationality.
  value: number;

  // Actual number of applications.
  count: number;

  // Percentage of all applications.
  percentage: number;
};

export type StatusDatum = {
  label: string;
  value: number;

  key:
    | "submitted"
    | "review"
    | "approved"
    | "rejected"
    | "information";
};

export type SubmissionSourceDatum = {
  label: string;
  value: number;
};
