import AnalyticsPanel from "@/components/dashboard/AnalyticsPanel";
import MetricCards from "@/components/dashboard/MetricCards";
import type {
  DashboardMetric,
  MigrationRecord,
  NationalityDatum,
  SupportUsageDatum,
} from "@/data/dashboard";
import { createClient } from "@/lib/supabase/server";
import { Download, FileText } from "lucide-react";
import DashboardRecordsSection from "@/components/dashboard/DashboardRecordsSection";

export const dynamic = "force-dynamic";

type DatabaseMigrationRecord = {
  migration_id: string;
  full_name: string;
  nationality: string;
  destination_city: string | null;
  destination_country: string | null;
  record_type: string;
  stage: string;
  employers:
    | {
        name: string;
        sector: string | null;
      }
    | {
        name: string;
        sector: string | null;
      }[]
    | null;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function mapStage(stage: string): MigrationRecord["stage"] {
  switch (stage) {
    case "approved":
      return "Approved";
    case "flagged":
      return "Flagged";
    case "completed":
      return "Completed";
    default:
      return "Under Review";
  }
}

function getEmployer(relationship: DatabaseMigrationRecord["employers"]) {
  if (Array.isArray(relationship)) {
    return relationship[0] ?? null;
  }

  return relationship;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    recordsResult,
    totalResult,
    activeResult,
    arrivalsResult,
    urgentAlertsResult,
  ] = await Promise.all([
    supabase
      .from("migration_records")
      .select(
        `
        migration_id,
        full_name,
        nationality,
        destination_city,
        destination_country,
        record_type,
        stage,
        employers (
          name,
          sector
        )
      `,
      )
      .order("created_at", {
        ascending: false,
      }),

    supabase.from("migration_records").select("*", {
      count: "exact",
      head: true,
    }),

    supabase
      .from("migration_records")
      .select("*", {
        count: "exact",
        head: true,
      })
      .neq("stage", "completed"),

    supabase
      .from("migration_records")
      .select("*", {
        count: "exact",
        head: true,
      })
      .gte(
        "created_at",
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      ),

    supabase
      .from("alerts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("severity", "critical")
      .in("status", ["new", "under_review"]),
  ]);

  if (recordsResult.error) {
    console.error("Unable to load dashboard records:", recordsResult.error);
  }

  const databaseRecords = (recordsResult.data ??
    []) as DatabaseMigrationRecord[];

  const records: MigrationRecord[] = databaseRecords.map((record) => {
    const employer = getEmployer(record.employers);

    const destination = [record.destination_city, record.destination_country]
      .filter(Boolean)
      .join(", ");

    return {
      id: record.migration_id,
      name: record.full_name,
      nationality: record.nationality,
      employer: employer?.name ?? "Not Assigned",
      destination: destination || "Destination Not Recorded",
      sector: employer?.sector ?? "Unclassified",
      type: record.record_type === "refugee" ? "Refugee" : "Work",
      stage: mapStage(record.stage),
      avatar: getInitials(record.full_name),
    };
  });

  const allNationalitiesResult = await supabase
    .from("migration_records")
    .select("nationality");

  const nationalityCounts = new Map<string, number>();

  for (const record of allNationalitiesResult.data ?? []) {
    const nationality = record.nationality || "Unknown";

    nationalityCounts.set(
      nationality,
      (nationalityCounts.get(nationality) ?? 0) + 1,
    );
  }

  const sortedNationalities = Array.from(nationalityCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const highestNationalityCount = sortedNationalities[0]?.[1] ?? 1;

  const nationalityData: NationalityDatum[] = sortedNationalities.map(
    ([label, count]) => ({
      label,
      value: Math.round((count / highestNationalityCount) * 100),
    }),
  );

  const metrics: DashboardMetric[] = [
    {
      label: "Active Monitoring",
      value: String(activeResult.count ?? 0),
      note: "Currently active migration records",
      icon: "active",
    },
    {
      label: "New Arrivals (24h)",
      value: String(arrivalsResult.count ?? 0),
      note: "Registered during the past 24 hours",
      icon: "arrival",
    },
    {
      label: "Departures (24h)",
      value: "92",
      note: "Demo value until movement tracking is added",
      icon: "departure",
    },
    {
      label: "Urgent Alerts",
      value: String(urgentAlertsResult.count ?? 0),
      note: "Critical alerts requiring review",
      icon: "alert",
    },
  ];

  const supportUsage: SupportUsageDatum[] = [
    {
      label: "Medical Requests",
      value: 850,
      percentage: 85,
    },
    {
      label: "Legal Requests",
      value: 620,
      percentage: 62,
    },
    {
      label: "Shelter Requests",
      value: 430,
      percentage: 43,
    },
    {
      label: "Financial Requests",
      value: 290,
      percentage: 29,
    },
  ];

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <section className="flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-5 md:flex-row md:items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.035em] text-[#202124] sm:text-3xl">
              Executive Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#667085]">
              National labour force and migration movement overview.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#d9dee6] bg-white px-4 text-xs font-medium text-[#202124]"
            >
              <Download className="h-4 w-4" />
              Export Data
            </button>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#181818] px-4 text-xs font-semibold text-white"
            >
              <FileText className="h-4 w-4" />
              Generate Report
            </button>
          </div>
        </section>

        <div className="mt-6">
          <MetricCards metrics={metrics} />
        </div>

        <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <DashboardRecordsSection records={records} />
          </div>

          <AnalyticsPanel
            nationalityData={nationalityData}
            supportUsage={supportUsage}
          />
        </div>
      </div>
    </div>
  );
}
