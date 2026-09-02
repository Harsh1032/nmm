import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  LifeBuoy,
  Users,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TechnicalDashboardPage() {
  const { profile } =
    await requireRole(["admin"]);

  const supabase = await createClient();

  const [
    applicationsResult,
    supportResult,
  ] = await Promise.all([
    supabase
      .from("migration_applications")
      .select(`
        id,
        application_number,
        full_name,
        employer_name,
        applicant_type,
        status,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("support_incidents")
      .select(`
        id,
        reference_number,
        category,
        severity,
        status,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      }),
  ]);

  const applications =
    applicationsResult.data ?? [];

  const support =
    supportResult.data ?? [];

  const pendingApplications =
    applications.filter((application) =>
      [
        "submitted",
        "under_review",
        "more_information_required",
      ].includes(application.status)
    );

  const openSupport =
    support.filter((request) =>
      [
        "open",
        "in_progress",
        "waiting_for_user",
      ].includes(request.status)
    );

  const approvedCount =
    applications.filter(
      (application) =>
        application.status === "approved"
    ).length;

  const criticalSupport =
    support.filter(
      (request) =>
        request.severity === "critical" &&
        request.status !== "resolved" &&
        request.status !== "closed"
    ).length;

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-362.5">
        <header className="border-b border-[#dfe3e8] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Government Technical Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Technical Operations
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Review migration applications, resolve support requests
            and maintain operational data integrity.
          </p>
        </header>

        <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Metric
            label="Pending Applications"
            value={pendingApplications.length}
            note="Awaiting operational review"
            icon={FileText}
          />

          <Metric
            label="Open Support Requests"
            value={openSupport.length}
            note="Active assistance cases"
            icon={LifeBuoy}
          />

          <Metric
            label="Approved Applications"
            value={approvedCount}
            note="Successfully processed"
            icon={CheckCircle2}
          />

          <Metric
            label="Critical Issues"
            value={criticalSupport}
            note="Requires immediate attention"
            icon={AlertTriangle}
          />
        </section>

        <div className="mt-7 grid gap-6 xl:grid-cols-2">
          <section className="overflow-hidden rounded-xl border bg-white">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="font-bold">
                  Application Queue
                </h2>

                <p className="mt-1 text-xs text-[#667085]">
                  Recent submissions requiring review.
                </p>
              </div>

              <Link
                href="/technical/applications"
                className="text-xs font-semibold"
              >
                View All
              </Link>
            </div>

            <div className="divide-y">
              {pendingApplications
                .slice(0, 5)
                .map((application) => (
                  <Link
                    key={application.id}
                    href={`/technical/applications/${application.id}`}
                    className="flex items-center justify-between gap-4 p-5 hover:bg-[#fafbfc]"
                  >
                    <div>
                      <p className="text-sm font-bold">
                        {application.full_name}
                      </p>

                      <p className="mt-1 text-[10px] text-[#667085]">
                        {application.application_number}
                        {" • "}
                        {application.applicant_type ===
                        "employer"
                          ? application.employer_name ||
                            "Employer"
                          : "Individual"}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}

              {!pendingApplications.length && (
                <div className="p-10 text-center text-sm text-[#667085]">
                  No applications awaiting review.
                </div>
              )}
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border bg-white">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="font-bold">
                  Support Queue
                </h2>

                <p className="mt-1 text-xs text-[#667085]">
                  Recent support cases requiring action.
                </p>
              </div>

              <Link
                href="/technical/support"
                className="text-xs font-semibold"
              >
                View All
              </Link>
            </div>

            <div className="divide-y">
              {openSupport
                .slice(0, 5)
                .map((request) => (
                  <Link
                    key={request.id}
                    href={`/technical/support/${request.id}`}
                    className="flex items-center justify-between gap-4 p-5 hover:bg-[#fafbfc]"
                  >
                    <div>
                      <p className="text-sm font-bold capitalize">
                        {request.category}
                      </p>

                      <p className="mt-1 text-[10px] text-[#667085]">
                        {request.reference_number}
                        {" • "}
                        {request.severity}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}

              {!openSupport.length && (
                <div className="p-10 text-center text-sm text-[#667085]">
                  No open support requests.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Metric({
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
    <article className="rounded-xl border bg-white p-5">
      <div className="flex justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase text-[#667085]">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {value}
          </p>

          <p className="mt-2 text-xs text-[#667085]">
            {note}
          </p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2f3f5]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}