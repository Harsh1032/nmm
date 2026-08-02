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
  type: "Work" | "Refugee";
  stage: "Approved" | "Under Review" | "Flagged" | "Completed";
  avatar: string;
};

export type NationalityDatum = {
  label: string;
  value: number;
};

export type SupportUsageDatum = {
  label: string;
  value: number;
  percentage: number;
};