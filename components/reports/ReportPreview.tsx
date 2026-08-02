"use client";

import type { ReportRecord } from "@/data/reports";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
} from "lucide-react";
import Link from "next/link";

type ReportPreviewProps = {
  records: ReportRecord[];
  refreshing: boolean;
};

export default function ReportPreview({
  records,
  refreshing,
}: ReportPreviewProps) {
  function downloadCsv() {
    const headings = [
      "Case ID",
      "Full Name",
      "Origin",
      "Destination",
      "Employer",
      "Visa Status",
      "Primary Need",
    ];

    const rows = records.map((record) => [
      record.caseId,
      record.fullName,
      record.origin,
      record.destination,
      record.employer,
      record.visaStatus,
      record.primaryNeed,
    ]);

    const csv = [headings, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "migration-report-preview.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="overflow-hidden rounded-xl border border-[#edf0f3] bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#202124]">
            Generated Report Preview
          </h2>

          <p className="mt-1 text-sm text-[#667085]">
            Showing top 5 matching records based on selected criteria.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={downloadCsv}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d8dde5] bg-white px-4 text-xs font-medium text-[#202124] hover:bg-[#f7f8fa]"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d8dde5] bg-white px-4 text-xs font-medium text-[#202124] hover:bg-[#f7f8fa]"
          >
            <FileText className="h-4 w-4" />
            PDF (Detailed)
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-210 text-left">
          <thead className="bg-[#f7f8fa]">
            <tr className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
              <th className="px-6 py-4">Case ID</th>
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Origin/Dest</th>
              <th className="px-6 py-4">Employer</th>
              <th className="px-6 py-4">Visa Status</th>
              <th className="px-6 py-4 text-right">Primary Need</th>
            </tr>
          </thead>

          <tbody
            className={`divide-y divide-[#dfe3e8] transition-opacity ${
              refreshing ? "opacity-40" : "opacity-100"
            }`}
          >
            {records.map((record) => (
              <tr
                key={record.caseId}
                className="hover:bg-[#fafbfc]"
              >
                <td className="px-6 py-5 text-xs font-medium text-[#202124]">
                  {record.caseId}
                </td>

                <td className="px-6 py-5">
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-[#202124] hover:underline"
                  >
                    {record.fullName}
                  </Link>
                </td>

                <td className="px-6 py-5 text-xs text-[#202124]">
                  <span className="inline-flex items-center gap-2">
                    {record.origin}
                    <ChevronRight className="h-3.5 w-3.5 text-[#98a0ae]" />
                    {record.destination}
                  </span>
                </td>

                <td className="px-6 py-5 text-xs text-[#667085]">
                  {record.employer}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold ${
                      record.visaStatus === "Work (Active)"
                        ? "bg-[#181818] text-white"
                        : "bg-[#f0f1f3] text-[#202124]"
                    }`}
                  >
                    {record.visaStatus}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <span className="inline-flex min-w-16 justify-center rounded-full border border-[#cfd4db] bg-[#f7f7f6] px-3 py-1 text-[10px] font-medium text-[#202124]">
                    {record.primaryNeed}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col justify-between gap-3 border-t border-[#dfe3e8] bg-[#fafbfc] px-6 py-4 text-xs text-[#667085] sm:flex-row sm:items-center">
        <p>Found 1,248 matching records across the database.</p>

        <div className="flex flex-wrap items-center gap-5">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Data Verified
          </span>

          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Period: Q3 2026
          </span>
        </div>
      </footer>
    </section>
  );
}