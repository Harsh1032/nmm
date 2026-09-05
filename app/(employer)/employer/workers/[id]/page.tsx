import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";

import {
  ArrowLeft,
  Building2,
  FileText,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EmployerWorkerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { profile } =
    await requireRole(["employer"]);

  const { id } = await params;

  if (!profile.employer_id) {
    notFound();
  }

  const supabase =
    await createClient();

  const {
    data: application,
    error,
  } = await supabase
    .from("migration_applications")
    .select(`
      id,
      application_number,
      employer_id,
      applicant_type,
      application_category,
      movement_direction,
      full_name,
      nationality,
      passport_number,
      origin_country,
      destination_country,
      destination_city,
      employer_name,
      position_title,
      visa_type,
      status,
      submitted_at,
      review_notes,
      decision_reason,
      reviewed_at,
      created_at,
      updated_at
    `)
    .eq("id", id)
    .eq(
      "employer_id",
      profile.employer_id
    )
    .single();

  if (
    error ||
    !application
  ) {
    notFound();
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/employer/workers"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#667085] transition hover:text-[#202124]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Workers
        </Link>

        <header className="mt-6 border-b border-[#dfe3e8] pb-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
                Employer Worker Record
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
                {application.full_name}
              </h1>

              <p className="mt-2 text-sm text-[#667085]">
                Review this worker&apos;s migration application and current processing status.
              </p>
            </div>

            <StatusBadge
              status={
                application.status
              }
            />
          </div>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-3">
                <UserRound className="h-5 w-5" />

                <h2 className="font-bold">
                  Worker Information
                </h2>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Detail
                  label="Full Name"
                  value={
                    application.full_name
                  }
                />

                <Detail
                  label="Nationality"
                  value={
                    application.nationality
                  }
                />

                <Detail
                  label="Passport Number"
                  value={
                    application.passport_number
                  }
                />

                <Detail
                  label="Application Number"
                  value={
                    application.application_number
                  }
                />
              </div>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />

                <h2 className="font-bold">
                  Migration Details
                </h2>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Detail
                  label="Application Type"
                  value={
                    getApplicationType(
                      application
                    )
                  }
                />

                <Detail
                  label="Movement Direction"
                  value={
                    application.movement_direction
                      ? formatValue(
                          application.movement_direction
                        )
                      : "Not Applicable"
                  }
                />

                <Detail
                  label="Origin Country"
                  value={
                    application.origin_country ||
                    "—"
                  }
                />

                <Detail
                  label="Destination"
                  value={
                    [
                      application.destination_city,
                      application.destination_country,
                    ]
                      .filter(Boolean)
                      .join(", ") ||
                    "—"
                  }
                />

                <Detail
                  label="Visa Type"
                  value={
                    application.visa_type ||
                    "—"
                  }
                />

                <Detail
                  label="Current Status"
                  value={
                    formatStatus(
                      application.status
                    )
                  }
                />
              </div>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5" />

                <h2 className="font-bold">
                  Employment Information
                </h2>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Detail
                  label="Employer"
                  value={
                    application.employer_name ||
                    profile.organization_name ||
                    "Registered Employer"
                  }
                />

                <Detail
                  label="Position / Job Title"
                  value={
                    application.position_title ||
                    "Not Provided"
                  }
                />
              </div>
            </section>

            {application.decision_reason && (
              <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                <h2 className="font-bold text-amber-900">
                  Government Feedback
                </h2>

                <p className="mt-3 text-sm leading-6 text-amber-900">
                  {
                    application.decision_reason
                  }
                </p>
              </section>
            )}
          </div>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <FileText className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Application Status
              </h2>

              <div className="mt-4">
                <StatusBadge
                  status={
                    application.status
                  }
                />
              </div>

              <p className="mt-4 text-sm leading-6 text-[#667085]">
                {getStatusDescription(
                  application.status
                )}
              </p>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <ShieldCheck className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Government Processing
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                This worker application is being processed by the authorized government technical team.
              </p>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
                Submitted
              </p>

              <p className="mt-2 text-sm font-semibold">
                {application.submitted_at
                  ? formatDate(
                      application.submitted_at
                    )
                  : "Not Recorded"}
              </p>

              {application.updated_at && (
                <>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
                    Last Updated
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {formatDate(
                      application.updated_at
                    )}
                  </p>
                </>
              )}

              {application.reviewed_at && (
                <>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
                    Reviewed
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {formatDate(
                      application.reviewed_at
                    )}
                  </p>
                </>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#667085]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#202124]">
        {value}
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
    status === "approved"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
      : status === "rejected"
        ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200"
        : status ===
              "under_review" ||
            status ===
              "in_review"
          ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200"
          : status ===
                "more_information_required" ||
              status ===
                "needs_information"
            ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
            : "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${styles}`}
    >
      {formatStatus(
        status
      )}
    </span>
  );
}

function formatStatus(
  status: string
) {
  switch (status) {
    case "under_review":
    case "in_review":
      return "Under Review";

    case "more_information_required":
    case "needs_information":
      return "More Information Required";

    case "approved":
      return "Approved";

    case "rejected":
      return "Rejected";

    case "submitted":
      return "Submitted";

    default:
      return formatValue(
        status
      );
  }
}

function getStatusDescription(
  status: string
) {
  switch (status) {
    case "approved":
      return "This worker application has been approved by the government processing team.";

    case "rejected":
      return "This worker application was not approved. Review the government feedback for the reason.";

    case "under_review":
    case "in_review":
      return "This worker application is currently being reviewed by the government processing team.";

    case "more_information_required":
    case "needs_information":
      return "The government processing team requires additional information before processing can continue.";

    default:
      return "This worker application has been submitted and is waiting for government review.";
  }
}

function getApplicationType(
  application: {
    application_category:
      | string
      | null;
    movement_direction:
      | string
      | null;
  }
) {
  if (
    application.application_category ===
    "refugee"
  ) {
    return "Refugee / Humanitarian Protection";
  }

  if (
    application.movement_direction ===
    "outbound"
  ) {
    return "Going Abroad for Employment";
  }

  if (
    application.movement_direction ===
    "inbound"
  ) {
    return "Entering the Country for Employment";
  }

  return "Employment / Migration";
}

function formatValue(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(
    new Date(value)
  );
}