// src/components/dashboard/RecordsTable.tsx

"use client";

import type { MigrationRecord } from "@/data/dashboard";
import { MapPin, MoreVertical } from "lucide-react";
import Link from "next/link";

const stageStyles: Record<MigrationRecord["stage"], string> = {
  Submitted: "bg-slate-400",

  "Under Review": "bg-blue-500",

  "More Information": "bg-amber-500",

  Approved: "bg-emerald-500",

  Rejected: "bg-red-500",
};

type RecordsTableProps = {
  records: MigrationRecord[];
  totalRecords: number;
  currentPage: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function RecordsTable({
  records,
  totalRecords,
  currentPage,
  pageSize,
  onPrevious,
  onNext,
}: RecordsTableProps) {
  const visibleCount = records.length;
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  const hasPrevious = currentPage > 1;
  const hasNext = endRecord < totalRecords;
  return (
    <section className="overflow-hidden rounded-lg border border-[#edf0f3] bg-white shadow-[0_2px_7px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col justify-between gap-3 border-b border-[#dfe3e8] px-5 py-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-bold text-[#202124]">Migration Applications</h2>

          <p className="mt-1 text-xs text-[#667085]">
            Applications submitted by registered employers and individuals.
          </p>
        </div>

        <span className="w-fit rounded-full border border-[#d8dde5] px-3 py-1 text-[10px] text-[#475467]">
          Viewing {records.length} of {totalRecords.toLocaleString()}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-205 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#dfe3e8] text-[10px] font-bold uppercase tracking-wider text-[#667085]">
              <th className="w-12 px-4 py-3">
                <input type="checkbox" aria-label="Select all records" />
              </th>

              <th className="px-4 py-3">Individual &amp; Origin</th>
              <th className="px-4 py-3">Employer Association</th>
              <th className="px-4 py-3">Application</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="border-b border-[#e2e6eb] last:border-b-0 hover:bg-[#fafbfc]"
              >
                <td className="px-4 py-5">
                  <input type="checkbox" aria-label={`Select ${record.name}`} />
                </td>

                <td className="px-4 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8eaed] text-xs font-bold text-[#202124]">
                      {record.avatar}
                    </div>

                    <div>
                      <Link
                        href={`/applications/${record.id}`}
                        className="text-sm font-bold text-[#202124] hover:underline"
                      >
                        {record.name}
                      </Link>

                      <p className="mt-1 flex items-center gap-1 text-[10px] text-[#667085]">
                        <MapPin className="h-3 w-3" />
                        {record.nationality} • {record.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-5">
                  <p className="text-xs font-medium text-[#202124]">
                    {record.employer}
                  </p>

                  <p className="mt-1 text-[10px] italic text-[#667085]">
                    {record.nationality} → {record.destination} •{" "}
                    {record.sector}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <span className="rounded-full bg-[#f2f3f5] px-2.5 py-1 text-[10px] font-semibold text-[#202124]">
                    {record.type}
                  </span>
                </td>

                <td className="px-4 py-5">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap text-[10px] text-[#202124]">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        stageStyles[record.stage]
                      }`}
                    />

                    {record.stage}
                  </span>
                </td>

                <td className="px-4 py-5 text-center">
                  <Link
                    href={`/applications/${record.id}`}
                    className="inline-flex items-center rounded-md border border-[#d8dde5] px-3 py-2 text-xs font-semibold text-[#202124] transition hover:bg-[#f5f6f7]"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {records.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-sm text-[#667085]"
                >
                  No migration records were found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-[#e2e6eb] px-4 py-4 sm:flex-row sm:items-center">
        <p className="text-xs text-[#667085]">
          Showing {startRecord}-{endRecord} of {totalRecords.toLocaleString()}{" "}
          records
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={!hasPrevious}
            onClick={onPrevious}
            className="rounded-md border border-[#e1e5ea] px-4 py-2 text-xs text-[#202124] disabled:cursor-not-allowed disabled:text-[#98a0ae]"
          >
            Previous
          </button>

          <button
            type="button"
            disabled={!hasNext}
            onClick={onNext}
            className="rounded-md border border-[#d5dae1] px-4 py-2 text-xs font-medium text-[#202124] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
