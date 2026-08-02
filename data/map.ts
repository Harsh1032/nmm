// src/data/map.ts

export type MapRecordStatus = "Valid" | "Expiring" | "Pending";

export type MapRecord = {
  id: string;
  name: string;
  nationality: string;
  destination: string;
  employer: string;
  status: MapRecordStatus;
  initials: string;
};

export type MarkerType = "arrival" | "shelter" | "employer" | "cluster";

export type MapMarkerData = {
  id: string;
  type: MarkerType;
  label: string;
  x: number;
  y: number;
};

export const regionalRecords: MapRecord[] = [
  {
    id: "MIG-3842",
    name: "Sarah M. Okello",
    nationality: "Kenyan",
    destination: "Dubai",
    employer: "Emaar Construction",
    status: "Valid",
    initials: "SO",
  },
  {
    id: "MIG-2718",
    name: "David L. Musoke",
    nationality: "Ugandan",
    destination: "Doha",
    employer: "Qatar Airways Support",
    status: "Expiring",
    initials: "DM",
  },
  {
    id: "MIG-1942",
    name: "Amara J. Kwizera",
    nationality: "Rwandan",
    destination: "Riyadh",
    employer: "Saudi Oger Ltd",
    status: "Pending",
    initials: "AK",
  },
  {
    id: "MIG-4203",
    name: "John P. Akoth",
    nationality: "Kenyan",
    destination: "Abu Dhabi",
    employer: "Al Habtoor Group",
    status: "Valid",
    initials: "JA",
  },
  {
    id: "MIG-2937",
    name: "Fatuma S. Nalule",
    nationality: "Ugandan",
    destination: "Sharjah",
    employer: "Amazon Logistics",
    status: "Valid",
    initials: "FN",
  },
];

export const mapMarkers: MapMarkerData[] = [
  {
    id: "arrival-1",
    type: "arrival",
    label: "Entebbe International Arrival Point",
    x: 18,
    y: 25,
  },
  {
    id: "cluster-1",
    type: "cluster",
    label: "Regional Migrant Cluster",
    x: 43,
    y: 46,
  },
  {
    id: "employer-1",
    type: "employer",
    label: "Emaar Construction Site A",
    x: 65,
    y: 36,
  },
  {
    id: "cluster-2",
    type: "cluster",
    label: "Worker Accommodation Cluster",
    x: 58,
    y: 57,
  },
  {
    id: "arrival-2",
    type: "arrival",
    label: "Dubai International Arrival Point",
    x: 84,
    y: 46,
  },
  {
    id: "shelter-1",
    type: "shelter",
    label: "Government Support Shelter",
    x: 50,
    y: 78,
  },
];