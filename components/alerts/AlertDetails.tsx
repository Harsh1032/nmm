// src/components/alerts/AlertDetails.tsx

"use client";

import type { AlertRecord } from "@/data/alerts";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileWarning,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type AlertDetailsProps = {
  alert: AlertRecord;
};

export default function AlertDetails({
  alert,
}: AlertDetailsProps) {
  const [status, setStatus] = useState(alert.status);
  const [message, setMessage] = useState("");

  function closeAlert() {
    setStatus("Resolved");
    setMessage("The incident has been acknowledged and closed.");
  }

  function ignoreAlert() {
    setMessage(
      "The incident was marked for no immediate action. It remains in the audit log."
    );
  }

  return (
    <section className="min-w-0 bg-[#f7f8fa] p-4 sm:p-6 lg:p-8">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-[#dfe3e8] bg-white shadow-[0_3px_12px_rgba(16,24,40,0.05)]">
        <header className="border-b border-[#dfe3e8] px-5 py-5 sm:px-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[9px] font-bold uppercase text-red-500">
                  <AlertTriangle className="h-3 w-3" />
                  {alert.severity} Incident
                </span>

                <span className="text-xs font-medium text-[#667085]">
                  {alert.id}
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-[-0.035em] text-[#202124]">
                {alert.title}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                {alert.incidentSummary}
              </p>
            </div>

            <button
              type="button"
              aria-label="Close details"
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#d8dde5] hover:bg-[#f4f5f6] sm:flex"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="space-y-8 px-5 py-6 sm:px-7 sm:py-7">
          <section className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#667085]">
                Assigned Responsibility
              </p>

              <div className="flex min-h-20 items-center gap-4 rounded-lg border border-[#d8dde5] bg-white p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f2f3f5]">
                  <UserRound className="h-5 w-5 text-[#202124]" />
                </span>

                <div>
                  <p className="text-sm font-bold text-[#202124]">
                    {alert.assignedTo}
                  </p>

                  <p className="mt-1 text-[10px] font-medium uppercase text-[#667085]">
                    {alert.assignedRole}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#667085]">
                Current Status
              </p>

              <div className="flex min-h-20 items-center gap-4 rounded-lg border border-[#d8dde5] bg-white p-4">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${
                    status === "Resolved"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {status === "Resolved" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                </span>

                <div>
                  <p className="text-sm font-bold text-[#202124]">
                    {status}
                  </p>

                  <p className="mt-1 text-[10px] font-medium uppercase text-[#667085]">
                    Processing Stage
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#cfd4db] bg-[#f5f5f4] p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#202124]" />

              <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#202124]">
                Recommended Protocol
              </h2>
            </div>

            <p className="mt-4 text-sm italic leading-6 text-[#4f5661]">
              “{alert.protocol}”
            </p>

            <button
              type="button"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#181818] px-4 text-sm font-semibold text-white hover:bg-black"
            >
              Execute Response Plan
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <section>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#667085]">
                Affected Records
              </h2>

              <Link
                href="/dashboard"
                className="text-xs font-medium text-[#202124] hover:underline"
              >
                View All Profiles
              </Link>
            </div>

            <div className="mt-3 overflow-hidden rounded-lg border border-[#d8dde5]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-140 text-left">
                  <thead>
                    <tr className="text-[9px] font-bold uppercase text-[#667085]">
                      <th className="px-4 py-4">ID</th>
                      <th className="px-4 py-4">Entity Name</th>
                      <th className="px-4 py-4">Classification</th>
                      <th className="px-4 py-4 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {alert.affectedRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="border-t border-[#edf0f3]"
                      >
                        <td className="px-4 py-4 text-xs text-[#202124]">
                          {record.id}
                        </td>

                        <td className="px-4 py-4 text-xs font-medium text-[#202124]">
                          {record.name}
                        </td>

                        <td className="px-4 py-4">
                          <span className="inline-flex min-w-28 justify-center rounded-full bg-[#f0f1f3] px-3 py-1 text-[9px] font-medium text-[#202124]">
                            {record.classification}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-right">
                          <Link
                            href="/profile"
                            className="text-[10px] font-medium text-[#202124] hover:underline"
                          >
                            View Profile
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {message && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-md border border-[#d8dde5] bg-[#fafbfc] px-4 py-3 text-xs text-[#475467]"
            >
              <FileWarning className="mt-0.5 h-4 w-4 shrink-0" />
              {message}
            </div>
          )}

          <footer className="flex flex-col justify-end gap-3 border-t border-[#dfe3e8] pt-6 sm:flex-row">
            <button
              type="button"
              onClick={ignoreAlert}
              disabled={status === "Resolved"}
              className="h-11 rounded-md border border-[#d8dde5] bg-white px-5 text-sm font-medium text-[#202124] transition hover:bg-[#f7f8fa] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Ignore Incident
            </button>

            <button
              type="button"
              onClick={closeAlert}
              disabled={status === "Resolved"}
              className="h-11 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "Resolved"
                ? "Alert Closed"
                : "Acknowledge & Close Alert"}
            </button>
          </footer>
        </div>
      </article>
    </section>
  );
}