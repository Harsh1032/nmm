import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EmployeeApplicationsPage() {
  const { user } = await requireRole(["employee"]);

  const supabase = await createClient();

  const { data: applications, error } = await supabase
    .from("migration_applications")
    .select(`
      id,
      application_number,
      movement_direction,
      origin_country,
      destination_country,
      destination_city,
      employer_name,
      position_title,
      status,
      submitted_at,
      created_at
    `)
    .eq("applicant_user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Unable to load employee applications:", error);
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-362.5">
        <header className="flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-6 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Individual Migration Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#202124]">
              My Applications
            </h1>

            <p className="mt-2 text-sm text-[#667085]">
              Track migration and employment applications submitted under
              your account.
            </p>
          </div>

          <Link
            href="/employee/applications/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white transition hover:bg-black"
          >
            <Plus className="h-4 w-4 text-white"/>
            <span className="text-white">New Application</span>
          </Link>
        </header>

        <section className="mt-7 overflow-hidden rounded-xl border border-[#e2e6eb] bg-white shadow-sm">
          <div className="border-b border-[#e2e6eb] px-6 py-5">
            <h2 className="font-bold text-[#202124]">
              Submitted Applications
            </h2>

            <p className="mt-1 text-xs text-[#667085]">
              Applications are reviewed by authorized government officers.
            </p>
          </div>

          {applications?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-[#e2e6eb] bg-[#fafbfc] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#667085]">
                    <th className="px-5 py-4">Application</th>
                    <th className="px-5 py-4">Movement</th>
                    <th className="px-5 py-4">Route</th>
                    <th className="px-5 py-4">Employer</th>
                    <th className="px-5 py-4">Position</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application.id}
                      className="border-b border-[#edf0f3] last:border-0 hover:bg-[#fafbfc]"
                    >
                      <td className="px-5 py-5">
                        <p className="text-sm font-bold text-[#202124]">
                          {application.application_number}
                        </p>

                        <p className="mt-1 text-[10px] text-[#667085]">
                          {formatDate(application.submitted_at)}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <span className="rounded-full bg-[#f0f1f3] px-3 py-1 text-xs font-medium">
                          {application.movement_direction === "outbound"
                            ? "Going Abroad"
                            : "Entering Country"}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm text-[#202124]">
                        {application.origin_country ?? "—"}
                        {" → "}
                        {application.destination_country ?? "—"}

                        {application.destination_city && (
                          <p className="mt-1 text-[10px] text-[#667085]">
                            {application.destination_city}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5 text-sm text-[#202124]">
                        {application.employer_name || "Not Provided"}
                      </td>

                      <td className="px-5 py-5 text-sm text-[#202124]">
                        {application.position_title || "—"}
                      </td>

                      <td className="px-5 py-5">
                        <StatusBadge status={application.status} />
                      </td>

                      <td className="px-5 py-5">
                        <Link
                          href={`/employee/applications/${application.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#202124] hover:underline"
                        >
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f2f4]">
                <Plus className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-bold text-[#202124]">
                No applications submitted
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#667085]">
                Start an application if you are travelling abroad for
                employment or entering the country for employment.
              </p>

              <Link
                href="/employee/applications/new"
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white"
              >
                <span className="text-white">Start First Application</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-xl border border-[#e2e6eb] bg-[#fafbfc] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            Application Status Guide
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatusInfo
              title="Submitted"
              text="Application received by the system."
            />

            <StatusInfo
              title="Under Review"
              text="Government review is in progress."
            />

            <StatusInfo
              title="More Information"
              text="Additional information is required."
            />

            <StatusInfo
              title="Approved"
              text="Application has been approved."
            />

            <StatusInfo
              title="Rejected"
              text="Application was not approved."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    draft: "bg-slate-100 text-slate-700",
    submitted: "bg-blue-50 text-blue-700",
    under_review: "bg-amber-50 text-amber-700",
    more_information_required:
      "bg-orange-50 text-orange-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold ${
        styles[status] ?? "bg-[#f0f1f3] text-[#475467]"
      }`}
    >
      {formatStatus(status)}
    </span>
  );
}

function StatusInfo({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-[#e2e6eb] bg-white p-4">
      <p className="text-xs font-bold text-[#202124]">
        {title}
      </p>

      <p className="mt-2 text-[11px] leading-5 text-[#667085]">
        {text}
      </p>
    </div>
  );
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string | null) {
  if (!value) {
    return "Not submitted";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}