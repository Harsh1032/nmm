import AnalyticsPanel from "@/components/dashboard/AnalyticsPanel";
import DashboardRecordsSection from "@/components/dashboard/DashboardRecordsSection";
import MetricCards from "@/components/dashboard/MetricCards";
import type {
  DashboardMetric,
  MigrationRecord,
  NationalityDatum,
  SubmissionSourceDatum,
  StatusDatum,
} from "@/data/dashboard";
import { createClient } from "@/lib/supabase/server";
import DashboardReportActions from "@/components/dashboard/DashboardReportActions";

export const dynamic = "force-dynamic";

type DatabaseApplication = {
  id: string;
  application_number: string;
  applicant_type: string | null;
  application_category: string | null;
  movement_direction: string | null;

  full_name: string;
  nationality: string;

  origin_country: string | null;
  destination_country: string | null;
  destination_city: string | null;

  employer_name: string | null;
  position_title: string | null;
  visa_type: string | null;

  status: string;
  submitted_at: string | null;
  created_at: string;
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

function mapStage(status: string): MigrationRecord["stage"] {
  switch (status) {
    case "approved":
      return "Approved";

    case "rejected":
      return "Rejected";

    case "under_review":
    case "in_review":
      return "Under Review";

    case "more_information_required":
    case "needs_information":
      return "More Information";

    default:
      return "Submitted";
  }
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const now = new Date();

  const twentyFourHoursAgo = new Date(
    now.getTime() - 24 * 60 * 60 * 1000,
  ).toISOString();

  const [
    applicationsResult,
    totalResult,
    newResult,
    pendingResult,
    approvedResult,
  ] = await Promise.all([
    // Full application data used by table + charts.
    supabase
      .from("migration_applications")
      .select(
        `
        id,
        application_number,
        applicant_type,
        application_category,
        movement_direction,
        full_name,
        nationality,
        origin_country,
        destination_country,
        destination_city,
        employer_name,
        position_title,
        visa_type,
        status,
        submitted_at,
        created_at
      `,
      )
      .order("created_at", {
        ascending: false,
      }),

    // Total applications.
    supabase.from("migration_applications").select("*", {
      count: "exact",
      head: true,
    }),

    // Submitted within previous 24 hours.
    supabase
      .from("migration_applications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .gte("created_at", twentyFourHoursAgo),

    // Applications still requiring action.
    supabase
      .from("migration_applications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .in("status", [
        "submitted",
        "under_review",
        "in_review",
        "more_information_required",
        "needs_information",
      ]),

    // Approved.
    supabase
      .from("migration_applications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "approved"),
  ]);

  if (applicationsResult.error) {
    console.error("Minister dashboard applications:", applicationsResult.error);
  }

  const applications = (applicationsResult.data ?? []) as DatabaseApplication[];

  /*
   * --------------------------------------------------
   * TABLE DATA
   * --------------------------------------------------
   */

  const records: MigrationRecord[] = applications.map((application) => {
    const destination = [
      application.destination_city,
      application.destination_country,
    ]
      .filter(Boolean)
      .join(", ");

    const isRefugee =
      application.application_category === "refugee" ||
      application.movement_direction === null;

    return {
      id: application.application_number,

      name: application.full_name,

      nationality: application.nationality,

      employer:
        application.employer_name ||
        (application.applicant_type === "individual"
          ? "Individual Submission"
          : "Not Assigned"),

      destination:
        destination || application.destination_country || "Not Recorded",

      sector:
        application.position_title || application.visa_type || "Not Specified",

      type: isRefugee ? "Refugee" : "Work",

      stage: mapStage(application.status),

      avatar: getInitials(application.full_name),

      applicantType: application.applicant_type,

      movementDirection: application.movement_direction,

      visaType: application.visa_type,
    };
  });

  /*
   * --------------------------------------------------
   * NATIONALITY DISTRIBUTION
   * --------------------------------------------------
   */

  const nationalityCounts = new Map<string, number>();

  for (const application of applications) {
    const nationality = application.nationality || "Unknown";

    nationalityCounts.set(
      nationality,
      (nationalityCounts.get(nationality) ?? 0) + 1,
    );
  }

  const sortedNationalities = Array.from(nationalityCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maximumNationality = sortedNationalities[0]?.[1] ?? 1;

  const nationalityData: NationalityDatum[] = sortedNationalities.map(
    ([label, count]) => ({
      label,
      count,

      percentage:
        applications.length > 0
          ? Math.round((count / applications.length) * 100)
          : 0,

      value: Math.round((count / maximumNationality) * 100),
    }),
  );

  /*
   * --------------------------------------------------
   * APPLICATION STATUS
   * --------------------------------------------------
   */

  const statusCounts = new Map<string, number>();

  for (const application of applications) {
    const status = application.status || "submitted";

    statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);
  }

  const statusData = (
    [
      {
        label: "Submitted",
        value: statusCounts.get("submitted") ?? 0,
        key: "submitted",
      },
      {
        label: "Under Review",
        value:
          (statusCounts.get("under_review") ?? 0) +
          (statusCounts.get("in_review") ?? 0),
        key: "review",
      },
      {
        label: "Approved",
        value: statusCounts.get("approved") ?? 0,
        key: "approved",
      },
      {
        label: "Rejected",
        value: statusCounts.get("rejected") ?? 0,
        key: "rejected",
      },
      {
        label: "More Information",
        value:
          (statusCounts.get("more_information_required") ?? 0) +
          (statusCounts.get("needs_information") ?? 0),
        key: "information",
      },
    ] satisfies StatusDatum[]
  ).filter((item) => item.value > 0);

  /*
   * --------------------------------------------------
   * SUBMISSION SOURCE
   * --------------------------------------------------
   */

  let employerSubmissions = 0;
  let individualSubmissions = 0;

  for (const application of applications) {
    if (application.applicant_type === "employer") {
      employerSubmissions++;
    } else {
      individualSubmissions++;
    }
  }

  const submissionSourceData: SubmissionSourceDatum[] = [
    {
      label: "Registered Employers",
      value: employerSubmissions,
    },
    {
      label: "Individuals",
      value: individualSubmissions,
    },
  ];

  /*
   * --------------------------------------------------
   * METRIC CARDS
   * --------------------------------------------------
   */

  const metrics: DashboardMetric[] = [
    {
      label: "Total Applications",

      value: String(totalResult.count ?? 0),

      note: "All migration applications submitted",

      icon: "active",
    },

    {
      label: "New Applications (24h)",

      value: String(newResult.count ?? 0),

      note: "Applications received in the past 24 hours",

      icon: "arrival",
    },

    {
      label: "Pending Review",

      value: String(pendingResult.count ?? 0),

      note: "Applications requiring government review",

      icon: "departure",
    },

    {
      label: "Approved Applications",

      value: String(approvedResult.count ?? 0),

      note: "Applications approved by the technical team",

      icon: "alert",
    },
  ];

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <section className="flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-5 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Ministry Executive Overview
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-[#202124] sm:text-3xl">
              Executive Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#667085]">
              National migration application activity and approval overview.
            </p>
          </div>

          <DashboardReportActions />
        </section>

        <div className="mt-6">
          <MetricCards metrics={metrics} />
        </div>

        <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0">
            <DashboardRecordsSection records={records} />
          </div>

          <AnalyticsPanel
            nationalityData={nationalityData}
            statusData={statusData}
            submissionSourceData={submissionSourceData}
          />
        </div>
      </div>
    </div>
  );
}
