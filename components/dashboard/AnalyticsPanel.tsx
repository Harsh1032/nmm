import type {
  NationalityDatum,
  StatusDatum,
  SubmissionSourceDatum,
} from "@/data/dashboard";

import {
  Building2,
  CircleCheck,
  Globe2,
  UserRound,
} from "lucide-react";

type AnalyticsPanelProps = {
  nationalityData:
    NationalityDatum[];

  statusData:
    StatusDatum[];

  submissionSourceData:
    SubmissionSourceDatum[];
};

const statusClasses = {
  submitted:
    "bg-[#181818]",

  review:
    "bg-blue-500",

  approved:
    "bg-emerald-500",

  rejected:
    "bg-red-500",

  information:
    "bg-amber-500",
};

export default function AnalyticsPanel({
  nationalityData,
  statusData,
  submissionSourceData,
}: AnalyticsPanelProps) {
  const totalStatuses =
    statusData.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );

  const totalSources =
    submissionSourceData.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );

  return (
    <aside className="space-y-5">
      {/* NATIONALITY */}

      <section className="rounded-xl border border-[#edf0f3] bg-white p-5 shadow-[0_2px_7px_rgba(16,24,40,0.04)]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Globe2 className="h-4 w-4" />

            Nationality Distribution
          </h2>

          <span className="text-[10px] text-[#667085]">
            Top {nationalityData.length}
          </span>
        </div>

        <div className="mt-6 space-y-5">
          {nationalityData.map(
            (item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-[#344054]">
                    {item.label}
                  </span>

                  <span className="text-[10px] text-[#667085]">
                    {item.count}{" "}
                    applications
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#f0f2f4]">
                  <div
                    className="h-full rounded-full bg-[#181818]"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-right text-[10px] text-[#98a2b3]">
                  {item.percentage}% of
                  applications
                </p>
              </div>
            )
          )}

          {!nationalityData.length && (
            <p className="py-6 text-center text-xs text-[#667085]">
              No application data yet.
            </p>
          )}
        </div>
      </section>

      {/* STATUS */}

      <section className="rounded-xl border border-[#edf0f3] bg-white p-5 shadow-[0_2px_7px_rgba(16,24,40,0.04)]">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <CircleCheck className="h-4 w-4" />

          Application Status
        </h2>

        <p className="mt-1 text-xs text-[#667085]">
          Current government processing
          status.
        </p>

        <div className="mt-6 space-y-4">
          {statusData.map(
            (item) => {
              const percentage =
                totalStatuses > 0
                  ? Math.round(
                      (item.value /
                        totalStatuses) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={item.key}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          statusClasses[
                            item.key
                          ]
                        }`}
                      />

                      <span className="text-xs text-[#344054]">
                        {item.label}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold">
                        {item.value}
                      </span>

                      <span className="ml-2 text-[10px] text-[#98a2b3]">
                        {percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-[#edf0f3]">
                    <div
                      className={`h-full rounded-full ${
                        statusClasses[
                          item.key
                        ]
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            }
          )}

          {!statusData.length && (
            <p className="py-5 text-center text-xs text-[#667085]">
              No application status
              data available.
            </p>
          )}
        </div>
      </section>

      {/* SUBMITTED BY */}

      <section className="rounded-xl border border-[#edf0f3] bg-white p-5 shadow-[0_2px_7px_rgba(16,24,40,0.04)]">
        <h2 className="text-sm font-bold">
          Submission Source
        </h2>

        <p className="mt-1 text-xs text-[#667085]">
          How applications enter the
          national system.
        </p>

        <div className="mt-5 space-y-3">
          {submissionSourceData.map(
            (item) => {
              const isEmployer =
                item.label ===
                "Registered Employers";

              const percentage =
                totalSources > 0
                  ? Math.round(
                      (item.value /
                        totalSources) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={item.label}
                  className="rounded-lg border border-[#edf0f3] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f2f4f7]">
                      {isEmployer ? (
                        <Building2 className="h-4 w-4" />
                      ) : (
                        <UserRound className="h-4 w-4" />
                      )}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold">
                        {item.label}
                      </p>

                      <p className="mt-1 text-[10px] text-[#667085]">
                        {percentage}% of
                        submissions
                      </p>
                    </div>

                    <span className="text-xl font-bold">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>
    </aside>
  );
}