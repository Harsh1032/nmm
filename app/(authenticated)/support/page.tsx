import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  LifeBuoy,
  UserRound,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/requireRole";

export const dynamic = "force-dynamic";

type SupportIncident = {
  id: string;
  reference_number: string;
  reported_by: string;
  employer_id: string | null;
  category: string;
  description: string;
  severity: string;
  status: string;
  created_at: string;
  updated_at: string | null;
  resolved_at: string | null;
};

export default async function SupportPage() {
  await requireRole(["ministry"]);

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("support_incidents")
      .select(`
        id,
        reference_number,
        reported_by,
        employer_id,
        category,
        description,
        severity,
        status,
        created_at,
        updated_at,
        resolved_at
      `)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(
      "Minister support dashboard:",
      error
    );
  }

  const requests =
    (data ?? []) as SupportIncident[];

  const total =
    requests.length;

  const open =
    requests.filter(
      (request) =>
        request.status === "open"
    ).length;

  const inProgress =
    requests.filter(
      (request) =>
        request.status ===
          "in_progress" ||
        request.status ===
          "waiting_for_user"
    ).length;

  const resolved =
    requests.filter(
      (request) =>
        request.status === "resolved" ||
        request.status === "closed"
    ).length;

  const critical =
    requests.filter(
      (request) =>
        request.severity === "critical" &&
        request.status !== "resolved" &&
        request.status !== "closed"
    ).length;

  /*
   * CATEGORY COUNTS
   */
  const categoryCounts =
    new Map<string, number>();

  for (const request of requests) {
    const category =
      request.category ||
      "other";

    categoryCounts.set(
      category,
      (categoryCounts.get(category) ??
        0) + 1
    );
  }

  const categories =
    Array.from(
      categoryCounts.entries()
    )
      .sort(
        (a, b) => b[1] - a[1]
      )
      .slice(0, 6);

  const maxCategory =
    categories[0]?.[1] ?? 1;

  /*
   * STATUS COUNTS
   */
  const statusCounts = {
    open: 0,
    in_progress: 0,
    waiting_for_user: 0,
    resolved: 0,
    closed: 0,
  };

  for (const request of requests) {
    if (
      request.status in
      statusCounts
    ) {
      statusCounts[
        request.status as keyof typeof statusCounts
      ]++;
    }
  }

  /*
   * PRIORITY COUNTS
   */
  const low =
    requests.filter(
      (request) =>
        request.severity === "low"
    ).length;

  const medium =
    requests.filter(
      (request) =>
        request.severity === "medium"
    ).length;

  const criticalTotal =
    requests.filter(
      (request) =>
        request.severity === "critical"
    ).length;

  /*
   * RESOLUTION RATE
   */
  const resolutionRate =
    total > 0
      ? Math.round(
          (resolved / total) * 100
        )
      : 0;

  /*
   * AVERAGE RESOLUTION TIME
   */
  const resolvedRequests =
    requests.filter(
      (request) =>
        request.resolved_at
    );

  let averageResolutionHours = 0;

  if (
    resolvedRequests.length > 0
  ) {
    const totalHours =
      resolvedRequests.reduce(
        (sum, request) => {
          const start =
            new Date(
              request.created_at
            ).getTime();

          const end =
            new Date(
              request.resolved_at!
            ).getTime();

          return (
            sum +
            (end - start) /
              (1000 * 60 * 60)
          );
        },
        0
      );

    averageResolutionHours =
      Math.round(
        totalHours /
          resolvedRequests.length
      );
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="border-b border-[#dfe3e8] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Executive Operations
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#202124]">
            Support Operations
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            National overview of support requests handled by the technical team.
          </p>
        </header>

        {/* METRICS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Requests"
            value={total}
            note="All submitted support requests"
            icon={LifeBuoy}
          />

          <MetricCard
            label="Open"
            value={open}
            note="New requests awaiting processing"
            icon={FileText}
          />

          <MetricCard
            label="In Progress"
            value={inProgress}
            note="Currently being handled"
            icon={Clock3}
          />

          <MetricCard
            label="Resolved"
            value={resolved}
            note={`${resolutionRate}% resolution rate`}
            icon={CheckCircle2}
          />
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            {/* RECENT REQUESTS */}

            <section className="overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
              <div className="flex items-center justify-between border-b border-[#e2e6eb] px-6 py-5">
                <div>
                  <h2 className="font-bold">
                    Recent Support Requests
                  </h2>

                  <p className="mt-1 text-xs text-[#667085]">
                    Latest incidents submitted by individuals and employers.
                  </p>
                </div>

                <span className="rounded-full bg-[#f2f4f7] px-3 py-1 text-[10px] text-[#475467]">
                  {total} Total
                </span>
              </div>

              {requests.length ? (
                <div className="divide-y divide-[#edf0f3]">
                  {requests
                    .slice(0, 8)
                    .map(
                      (request) => (
                        <div
                          key={
                            request.id
                          }
                          className="grid gap-4 px-6 py-5 md:grid-cols-[140px_1fr_130px_120px_130px]"
                        >
                          <div>
                            <p className="text-[10px] font-bold uppercase text-[#667085]">
                              Reference
                            </p>

                            <p className="mt-2 text-xs font-bold">
                              {
                                request.reference_number
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase text-[#667085]">
                              Request
                            </p>

                            <p className="mt-2 text-sm font-semibold capitalize">
                              {
                                request.category
                              }
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-[#667085]">
                              {
                                request.description
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase text-[#667085]">
                              Source
                            </p>

                            <div className="mt-2 flex items-center gap-2 text-xs">
                              {request.employer_id ? (
                                <Building2 className="h-4 w-4" />
                              ) : (
                                <UserRound className="h-4 w-4" />
                              )}

                              {request.employer_id
                                ? "Employer"
                                : "Individual"}
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase text-[#667085]">
                              Priority
                            </p>

                            <div className="mt-2 flex items-center gap-2 text-xs capitalize">
                              {request.severity ===
                                "critical" && (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              )}

                              {
                                request.severity
                              }
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase text-[#667085]">
                              Status
                            </p>

                            <StatusBadge
                              status={
                                request.status
                              }
                            />
                          </div>
                        </div>
                      )
                    )}
                </div>
              ) : (
                <div className="px-6 py-14 text-center">
                  <LifeBuoy className="mx-auto h-6 w-6 text-[#98a2b3]" />

                  <p className="mt-3 text-sm font-semibold">
                    No support requests yet
                  </p>
                </div>
              )}
            </section>

            {/* CATEGORY */}

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <h2 className="font-bold">
                Request Categories
              </h2>

              <p className="mt-1 text-xs text-[#667085]">
                Distribution of support demand by category.
              </p>

              <div className="mt-6 space-y-5">
                {categories.map(
                  ([label, value]) => (
                    <div
                      key={label}
                    >
                      <div className="mb-2 flex justify-between gap-4">
                        <span className="text-xs font-medium capitalize">
                          {label}
                        </span>

                        <span className="text-xs font-semibold">
                          {value}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[#edf0f3]">
                        <div
                          className="h-full rounded-full bg-[#181818]"
                          style={{
                            width: `${
                              (value /
                                maxCategory) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            {/* STATUS */}

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <h2 className="font-bold">
                Status Breakdown
              </h2>

              <div className="mt-5 space-y-4">
                <StatusRow
                  label="Open"
                  value={
                    statusCounts.open
                  }
                  total={total}
                />

                <StatusRow
                  label="In Progress"
                  value={
                    statusCounts.in_progress
                  }
                  total={total}
                />

                <StatusRow
                  label="Waiting for User"
                  value={
                    statusCounts.waiting_for_user
                  }
                  total={total}
                />

                <StatusRow
                  label="Resolved"
                  value={
                    statusCounts.resolved
                  }
                  total={total}
                />

                <StatusRow
                  label="Closed"
                  value={
                    statusCounts.closed
                  }
                  total={total}
                />
              </div>
            </section>

            {/* PRIORITY */}

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <h2 className="font-bold">
                Priority Distribution
              </h2>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <PriorityCard
                  label="Low"
                  value={low}
                />

                <PriorityCard
                  label="Medium"
                  value={medium}
                />

                <PriorityCard
                  label="Critical"
                  value={criticalTotal}
                />
              </div>
            </section>

            {/* PERFORMANCE */}

            <section className="rounded-xl bg-[#181818] p-5 text-white">
              <h2 className="font-bold">
                Operational Performance
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs text-white/55">
                    Resolution Rate
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {resolutionRate}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/55">
                    Average Resolution Time
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {averageResolutionHours}
                    h
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/55">
                    Critical Unresolved
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {critical}
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
}: {
  label: string;
  value: number;
  note: string;
  icon: React.ElementType;
}) {
  return (
    <article className="rounded-xl border border-[#edf0f3] bg-white p-5 shadow-[0_2px_7px_rgba(16,24,40,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#667085]">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {value}
          </p>

          <p className="mt-2 text-[11px] text-[#667085]">
            {note}
          </p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2f4f7]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

function StatusRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage =
    total > 0
      ? Math.round(
          (value / total) * 100
        )
      : 0;

  return (
    <div>
      <div className="flex justify-between gap-3 text-xs">
        <span>{label}</span>

        <span className="font-semibold">
          {value}
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf0f3]">
        <div
          className="h-full rounded-full bg-[#181818]"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function PriorityCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-[#f7f8fa] p-4 text-center">
      <p className="text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase text-[#667085]">
        {label}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles =
    status === "resolved" ||
    status === "closed"
      ? "bg-emerald-50 text-emerald-700"
      : status ===
          "waiting_for_user"
        ? "bg-amber-50 text-amber-700"
        : status ===
            "in_progress"
          ? "bg-blue-50 text-blue-700"
          : "bg-[#f2f4f7] text-[#475467]";

  return (
    <span
      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${styles}`}
    >
      {status.replaceAll(
        "_",
        " "
      )}
    </span>
  );
}