// src/components/map/RegionalRecords.tsx

"use client";

import type { MapRecord } from "@/data/map";
import {
  Activity,
  CircleDot,
  Download,
  Filter,
  Info,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type RegionalRecordsProps = {
  records: MapRecord[];
};

const statusStyles = {
  Valid: "bg-[#f2f3f5] text-[#202124]",
  Expiring: "bg-red-500 text-white",
  Pending: "bg-[#f2f3f5] text-[#475467]",
};

export default function RegionalRecords({
  records,
}: RegionalRecordsProps) {
  const [search, setSearch] = useState("");
  const [trackedRecordId, setTrackedRecordId] = useState<string | null>(
    records[0]?.id ?? null
  );

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return records;
    }

    return records.filter((record) =>
      [
        record.name,
        record.id,
        record.nationality,
        record.destination,
        record.employer,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [records, search]);

  return (
    <aside className="flex min-h-170 flex-col border-l border-[#dfe3e8] bg-white xl:min-h-[calc(100vh-122px)]">
      <div className="border-b border-[#dfe3e8] px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-bold text-[#202124]">
            <CircleDot className="h-4 w-4" />
            Regional Records
          </h2>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#d8dde5] px-2.5 py-1 text-[9px] font-bold">
              3,842 Total
            </span>

            <button
              type="button"
              aria-label="Filter regional records"
              className="rounded-md p-1.5 hover:bg-[#f2f3f5]"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <label className="relative mt-5 block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, passport, or ID..."
            className="h-10 w-full rounded-md border border-[#d8dde5] pl-10 pr-3 text-xs outline-none focus:border-[#202124]"
          />
        </label>
      </div>

      <div className="flex-1 divide-y divide-[#dfe3e8] overflow-y-auto">
        {filteredRecords.map((record) => {
          const tracked = trackedRecordId === record.id;

          return (
            <article
              key={record.id}
              className={`px-5 py-5 transition ${
                tracked
                  ? "border-l-[3px] border-[#202124] bg-[#fafafa]"
                  : "border-l-[3px] border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8eaed] text-xs font-bold text-[#202124]">
                  {record.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="truncate text-sm font-bold text-[#202124]">
                      {record.name}
                    </p>

                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold ${
                        statusStyles[record.status]
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>

                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-wider text-[#667085]">
                    {record.nationality} — {record.destination} —{" "}
                    {record.employer}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <Link
                      href="/profile"
                      className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#202124] hover:underline"
                    >
                      <Info className="h-3.5 w-3.5" />
                      Details
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        setTrackedRecordId(
                          tracked ? null : record.id
                        )
                      }
                      className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-[10px] font-medium ${
                        tracked
                          ? "border-[#202124] bg-[#202124] text-white"
                          : "border-[#d8dde5] bg-white text-[#202124]"
                      }`}
                    >
                      <Activity className="h-3.5 w-3.5" />
                      {tracked ? "Tracking" : "Track"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {filteredRecords.length === 0 && (
          <div className="px-6 py-14 text-center">
            <p className="text-sm font-medium text-[#202124]">
              No matching records
            </p>

            <p className="mt-2 text-xs text-[#667085]">
              Try searching with a different name or identifier.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-[#dfe3e8] p-5">
        <p className="text-center text-[10px] italic text-[#667085]">
          Displaying {filteredRecords.length} of 3,842 records in current view
        </p>

        <Link
          href="/dashboard"
          className="mt-4 flex h-10 w-full items-center justify-center rounded-md border border-[#d8dde5] text-xs font-medium text-[#202124] hover:bg-[#f7f8fa]"
        >
          View Full Registry in Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-[#dfe3e8] bg-[#fafbfc] p-4">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#f0f1f3] text-[10px] font-medium text-[#202124]"
        >
          <Download className="h-3.5 w-3.5" />
          Export List
        </button>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#f0f1f3] text-[10px] font-medium text-[#202124]"
        >
          <Info className="h-3.5 w-3.5" />
          Report Issue
        </button>
      </div>
    </aside>
  );
}