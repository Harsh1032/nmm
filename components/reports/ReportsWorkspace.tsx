"use client";

import { automatedReports, reportRecords } from "@/data/reports";
import { Plus, Printer } from "lucide-react";
import { useMemo, useState } from "react";
import AutomatedTasks from "./AutomatedTasks";
import ReportCriteriaBuilder, {
  type ReportFilters,
} from "./ReportCriteriaBuilder";
import ReportPreview from "./ReportPreview";

const initialFilters: ReportFilters = {
  nationality: "All Nationalities",
  operationalStatus: "Active (Verified)",
  employer: "",
  destination: "GCC Countries",
  health: true,
  legal: false,
  shelter: false,
};

export default function ReportsWorkspace() {
  const [filters, setFilters] = useState<ReportFilters>(initialFilters);

  const [refreshing, setRefreshing] = useState(false);

  const filteredRecords = useMemo(() => {
    const employerQuery = filters.employer.trim().toLowerCase();

    const nationalityOriginMap: Record<string, string> = {
      Ugandan: "Uganda",
      Kenyan: "Kenya",
      Ethiopian: "Ethiopia",
      Sudanese: "Sudan",
    };

    const selectedOrigin = nationalityOriginMap[filters.nationality];

    return reportRecords.filter((record) => {
      const matchesEmployer =
        !employerQuery || record.employer.toLowerCase().includes(employerQuery);

      const matchesNationality =
        filters.nationality === "All Nationalities" ||
        record.origin === selectedOrigin;

      const selectedNeeds = [
        filters.health ? "Health" : null,
        filters.legal ? "Legal" : null,
        filters.shelter ? "Shelter" : null,
      ].filter((value): value is string => Boolean(value));

      const matchesNeed =
        selectedNeeds.length === 0 ||
        selectedNeeds.includes(record.primaryNeed);

      return matchesEmployer && matchesNationality && matchesNeed;
    });
  }, [filters]);

  async function refreshPreview() {
    setRefreshing(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setRefreshing(false);
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-6 md:flex-row md:items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#202124] sm:text-4xl">
              Intelligence &amp; Reports
            </h1>

            <p className="mt-2 text-base text-[#667085]">
              Build, preview, and automate migration data insights across
              departments.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#d8dde5] bg-white px-5 text-sm font-medium text-[#202124] hover:bg-[#f7f8fa]"
            >
              <Printer className="h-4 w-4" />
              Print View
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white hover:bg-black"
            >
              <Plus className="h-4 w-4" />
              New Custom Report
            </button>
          </div>
        </header>

        <div className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
          <div className="min-w-0 space-y-6">
            <ReportCriteriaBuilder
              filters={filters}
              onChange={setFilters}
              onRefresh={refreshPreview}
            />

            <ReportPreview records={filteredRecords} refreshing={refreshing} />
          </div>

          <AutomatedTasks tasks={automatedReports} />
        </div>
      </div>
    </div>
  );
}
