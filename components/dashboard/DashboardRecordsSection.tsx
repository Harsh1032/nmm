"use client";

import type { MigrationRecord } from "@/data/dashboard";
import { useMemo, useState } from "react";
import DashboardFilters, {
  type DashboardFilterValues,
} from "./DashboardFilters";
import RecordsTable from "./RecordsTable";

type DashboardRecordsSectionProps = {
  records: MigrationRecord[];
};

const initialFilters: DashboardFilterValues = {
  search: "",
  nationality: "All",
  destination: "All",
  employer: "All",
  visaStatus: "All",
};

const PAGE_SIZE = 5;

export default function DashboardRecordsSection({
  records,
}: DashboardRecordsSectionProps) {
  const [filters, setFilters] =
    useState<DashboardFilterValues>(initialFilters);

  const [currentPage, setCurrentPage] = useState(1);

  const nationalityOptions = useMemo(
    () =>
      Array.from(
        new Set(records.map((record) => record.nationality))
      ).sort(),
    [records]
  );

  const destinationOptions = useMemo(
    () =>
      Array.from(
        new Set(records.map((record) => record.destination))
      ).sort(),
    [records]
  );

  const employerOptions = useMemo(
    () =>
      Array.from(
        new Set(records.map((record) => record.employer))
      ).sort(),
    [records]
  );

  const filteredRecords = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !search ||
        record.name.toLowerCase().includes(search) ||
        record.id.toLowerCase().includes(search) ||
        record.employer.toLowerCase().includes(search) ||
        record.nationality.toLowerCase().includes(search);

      const matchesNationality =
        filters.nationality === "All" ||
        record.nationality === filters.nationality;

      const matchesDestination =
        filters.destination === "All" ||
        record.destination === filters.destination;

      const matchesEmployer =
        filters.employer === "All" ||
        record.employer === filters.employer;

      const matchesStatus =
        filters.visaStatus === "All" ||
        record.stage === filters.visaStatus;

      return (
        matchesSearch &&
        matchesNationality &&
        matchesDestination &&
        matchesEmployer &&
        matchesStatus
      );
    });
  }, [filters, records]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / PAGE_SIZE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const visibleRecords = filteredRecords.slice(
    startIndex,
    endIndex
  );

  function handleFiltersChange(
    nextFilters: DashboardFilterValues
  ) {
    setFilters(nextFilters);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="mt-6">
        <DashboardFilters
          filters={filters}
          onChange={handleFiltersChange}
          nationalityOptions={nationalityOptions}
          destinationOptions={destinationOptions}
          employerOptions={employerOptions}
        />
      </div>

      <div className="mt-6">
        <RecordsTable
          records={visibleRecords}
          totalRecords={filteredRecords.length}
          currentPage={safeCurrentPage}
          pageSize={PAGE_SIZE}
          onPrevious={() =>
            setCurrentPage((page) => Math.max(1, page - 1))
          }
          onNext={() =>
            setCurrentPage((page) =>
              Math.min(totalPages, page + 1)
            )
          }
        />
      </div>
    </>
  );
}