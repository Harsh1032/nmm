import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleCheck,
  FileText,
  Globe2,
  IdCard,
  MapPin,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MinisterApplicationDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  await requireRole(["ministry"]);

  const { id } = await params;

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
      created_at
    `)
    .eq(
      "application_number",
      id
    )
    .single();

  if (
    error ||
    !application
  ) {
    notFound();
  }

  const destination = [
    application.destination_city,
    application.destination_country,
  ]
    .filter(Boolean)
    .join(", ");

  const movementLabel =
    application.application_category ===
    "refugee"
      ? "Refugee / Humanitarian Protection"
      : application.movement_direction ===
          "outbound"
        ? "Going Abroad for Employment"
        : application.movement_direction ===
            "inbound"
          ? "Entering Country for Employment"
          : "Not Specified";

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#667085] transition hover:text-[#202124]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Executive Dashboard
        </Link>

        <header className="mt-6 flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-6 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Executive Application View
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
              {application.full_name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-sm text-[#667085]">
                {
                  application.application_number
                }
              </span>

              <StatusBadge
                status={
                  application.status
                }
              />
            </div>
          </div>

          <div className="rounded-lg border border-[#dfe3e8] bg-white px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
              Access Mode
            </p>

            <p className="mt-1 text-sm font-semibold">
              Executive Read-Only
            </p>
          </div>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <SectionTitle
                icon={UserRound}
                title="Applicant Information"
              />

              <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
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
                  label="Application Source"
                  value={
                    application.applicant_type ===
                    "employer"
                      ? "Registered Employer"
                      : "Individual"
                  }
                />
              </div>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <SectionTitle
                icon={Globe2}
                title="Migration Information"
              />

              <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                <Detail
                  label="Application Type"
                  value={
                    movementLabel
                  }
                />

                <Detail
                  label="Origin Country"
                  value={
                    application.origin_country ||
                    "Not Recorded"
                  }
                />

                <Detail
                  label="Destination"
                  value={
                    destination ||
                    "Not Recorded"
                  }
                />

                <Detail
                  label="Visa Type"
                  value={
                    application.visa_type ||
                    "Not Specified"
                  }
                />
              </div>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <SectionTitle
                icon={Building2}
                title="Employment Information"
              />

              <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                <Detail
                  label="Employer"
                  value={
                    application.employer_name ||
                    "Not Assigned"
                  }
                />

                <Detail
                  label="Position / Job Title"
                  value={
                    application.position_title ||
                    "Not Specified"
                  }
                />
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <CircleCheck className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Processing Status
              </h2>

              <p className="mt-2 text-xl font-bold capitalize">
                {application.status.replaceAll(
                  "_",
                  " "
                )}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                This status reflects the
                latest processing decision
                recorded by the authorized
                operational team.
              </p>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <CalendarDays className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Submission Information
              </h2>

              <div className="mt-5 space-y-4">
                <Detail
                  label="Submitted"
                  value={
                    application.submitted_at
                      ? formatDate(
                          application.submitted_at
                        )
                      : formatDate(
                          application.created_at
                        )
                  }
                />

                <Detail
                  label="Reference"
                  value={
                    application.application_number
                  }
                />
              </div>
            </section>

            <section className="rounded-xl bg-[#181818] p-5 text-white">
              <FileText className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Executive View
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/65">
                This page provides
                informational access only.
                Application processing and
                decisions are handled through
                the Government Technical
                Portal.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#edf0f3] pb-4">
      <Icon className="h-5 w-5" />

      <h2 className="font-bold">
        {title}
      </h2>
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
  const classes =
    status === "approved"
      ? "bg-emerald-50 text-emerald-700"
      : status === "rejected"
        ? "bg-red-50 text-red-700"
        : status === "under_review" ||
            status === "in_review"
          ? "bg-blue-50 text-blue-700"
          : status ===
                "more_information_required" ||
              status ===
                "needs_information"
            ? "bg-amber-50 text-amber-700"
            : "bg-[#f2f4f7] text-[#475467]";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${classes}`}
    >
      {status.replaceAll(
        "_",
        " "
      )}
    </span>
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