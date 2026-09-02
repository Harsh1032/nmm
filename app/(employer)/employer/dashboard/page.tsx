import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  FileText,
  Plus,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EmployerDashboardPage() {
  const { profile } = await requireRole(["employer"]);

  const supabase = await createClient();

  if (!profile.employer_id) {
    throw new Error(
      "Employer account is not linked to an organization."
    );
  }

  const { data: applications } = await supabase
    .from("migration_applications")
    .select(`
      id,
      application_number,
      full_name,
      nationality,
      application_category,
      movement_direction,
      destination_country,
      position_title,
      status,
      created_at
    `)
    .eq("employer_id", profile.employer_id)
    .order("created_at", {
      ascending: false,
    });

  const { count: workerCount } = await supabase
    .from("migration_records")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("employer_id", profile.employer_id);

  const pendingCount =
    applications?.filter((application) =>
      [
        "submitted",
        "under_review",
        "more_information_required",
      ].includes(application.status)
    ).length ?? 0;

  const latestApplications =
    applications?.slice(0, 5) ?? [];

  const organizationName =
    profile.organization_name ||
    profile.full_name ||
    "Registered Organization";

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-362.5">

        {/* HEADER */}
        <header className="flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-6 lg:flex-row lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Employer Migration Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
              {organizationName}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
              Register workers, submit migration applications,
              manage workforce movement and track government approvals.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/employer/applications/import"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#d8dde5] bg-white px-5 text-sm font-semibold"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Bulk Upload Excel
            </Link>

            <Link
              href="/employer/applications/new"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4 text-white" />
              <span className="text-white">Add Single Worker</span>
            </Link>
          </div>
        </header>

        {/* METRICS */}
        <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Metric
            label="Registered Workers"
            value={String(workerCount ?? 0)}
            note="Approved official records"
            icon={Users}
          />

          <Metric
            label="Applications"
            value={String(applications?.length ?? 0)}
            note="Total submissions"
            icon={FileText}
          />

          <Metric
            label="Pending Review"
            value={String(pendingCount)}
            note="Awaiting government action"
            icon={Clock3}
          />

          <Metric
            label="Organization Status"
            value="Verified"
            note="Employer portal access active"
            icon={ShieldCheck}
          />
        </section>

        <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

          <div className="space-y-6">

            {/* WORKER SUBMISSION OPTIONS */}
            <section className="rounded-xl border border-[#dce1e7] bg-white p-7">
              <Building2 className="h-6 w-6" />

              <h2 className="mt-5 text-2xl font-bold">
                Submit Worker Applications
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                Submit one worker manually or upload multiple workers
                using the official bulk-import spreadsheet.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Link
                  href="/employer/applications/new"
                  className="group rounded-lg border border-[#dfe3e8] bg-[#fafbfc] p-5 transition hover:border-[#202124]"
                >
                  <Plus className="h-5 w-5" />

                  <h3 className="mt-4 font-bold">
                    Single Worker
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#667085]">
                    Complete an individual migration application
                    for one employee.
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold">
                    Start Application
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>

                <Link
                  href="/employer/applications/import"
                  className="group rounded-lg border border-[#dfe3e8] bg-[#fafbfc] p-5 transition hover:border-[#202124]"
                >
                  <FileSpreadsheet className="h-5 w-5" />

                  <h3 className="mt-4 font-bold">
                    Bulk Worker Upload
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#667085]">
                    Upload an Excel spreadsheet containing multiple
                    employee applications.
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold">
                    Upload Spreadsheet
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            </section>

            {/* RECENT APPLICATIONS */}
            <section className="overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
              <div className="flex items-center justify-between border-b border-[#e2e6eb] px-6 py-5">
                <div>
                  <h2 className="font-bold">
                    Recent Worker Applications
                  </h2>

                  <p className="mt-1 text-xs text-[#667085]">
                    Latest submissions from your organization.
                  </p>
                </div>

                <Link
                  href="/employer/applications"
                  className="text-xs font-semibold"
                >
                  View All
                </Link>
              </div>

              {latestApplications.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-187.5">
                    <thead>
                      <tr className="border-b bg-[#fafbfc] text-left text-[10px] uppercase text-[#667085]">
                        <th className="px-5 py-4">
                          Worker
                        </th>

                        <th className="px-5 py-4">
                          Application
                        </th>

                        <th className="px-5 py-4">
                          Type
                        </th>

                        <th className="px-5 py-4">
                          Destination
                        </th>

                        <th className="px-5 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {latestApplications.map(
                        (application) => (
                          <tr
                            key={application.id}
                            className="border-b border-[#edf0f3] last:border-0"
                          >
                            <td className="px-5 py-5">
                              <p className="text-sm font-bold">
                                {application.full_name}
                              </p>

                              <p className="mt-1 text-[10px] text-[#667085]">
                                {application.nationality}
                              </p>
                            </td>

                            <td className="px-5 py-5 text-xs">
                              {
                                application.application_number
                              }
                            </td>

                            <td className="px-5 py-5 text-xs capitalize">
                              {application.application_category ===
                              "refugee"
                                ? "Refugee"
                                : application.movement_direction ===
                                    "outbound"
                                  ? "Outbound"
                                  : "Inbound"}
                            </td>

                            <td className="px-5 py-5 text-sm">
                              {application.destination_country ||
                                "—"}
                            </td>

                            <td className="px-5 py-5">
                              <span className="rounded-full bg-[#f0f1f3] px-3 py-1 text-[10px] capitalize">
                                {application.status.replaceAll(
                                  "_",
                                  " "
                                )}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="font-semibold">
                    No worker applications yet
                  </p>

                  <p className="mt-2 text-sm text-[#667085]">
                    Submit your first worker or upload a spreadsheet.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />

              <h2 className="mt-4 font-bold">
                Organization Ready
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Your organization can submit and track worker
                migration applications.
              </p>
            </section>

            <section className="rounded-xl bg-[#181818] p-6 text-white">
              <FileSpreadsheet className="h-6 w-6" />

              <h2 className="mt-4 text-lg font-bold">
                Bulk Registration
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Upload multiple workers in one Excel spreadsheet
                for faster processing.
              </p>

              <Link
                href="/employer/applications/import"
                className="mt-6 flex h-11 items-center justify-center rounded-md bg-white text-sm font-semibold "
              >
                <span className="text-[#181818]">Upload Worker List</span>
              </Link>
            </section>
          </aside>
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
  value: string;
  note: string;
  icon: React.ElementType;
}) {
  return (
    <article className="rounded-xl border border-[#edf0f3] bg-white p-5 shadow-sm">
      <div className="flex justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold">
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