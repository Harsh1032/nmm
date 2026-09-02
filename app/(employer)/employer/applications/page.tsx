import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowRight,
  Plus,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EmployerApplicationsPage() {
  const { profile } =
    await requireRole(["employer"]);

  const supabase = await createClient();

  const { data: applications } = await supabase
    .from("migration_applications")
    .select(`
      id,
      application_number,
      full_name,
      nationality,
      passport_number,
      movement_direction,
      destination_country,
      position_title,
      status,
      submitted_at
    `)
    .eq("employer_id", profile.employer_id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-362.5">
        <header className="flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-6 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Employer Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
              Worker Applications
            </h1>

            <p className="mt-2 text-sm text-[#667085]">
              Submit and track migration applications for your workforce.
            </p>
          </div>

          <Link
            href="/employer/applications/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4 text-white" />
            <span className="text-white">Submit Worker</span>
          </Link>
        </header>

        <section className="mt-7 overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead>
                <tr className="border-b bg-[#fafbfc] text-left text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                  <th className="px-5 py-4">Application</th>
                  <th className="px-5 py-4">Worker</th>
                  <th className="px-5 py-4">Movement</th>
                  <th className="px-5 py-4">Destination</th>
                  <th className="px-5 py-4">Position</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {(applications ?? []).map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-[#edf0f3] last:border-0"
                  >
                    <td className="px-5 py-5 text-xs font-semibold">
                      {application.application_number}
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-sm font-bold">
                        {application.full_name}
                      </p>

                      <p className="mt-1 text-[10px] text-[#667085]">
                        {application.nationality}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-sm capitalize">
                      {application.movement_direction}
                    </td>

                    <td className="px-5 py-5 text-sm">
                      {application.destination_country}
                    </td>

                    <td className="px-5 py-5 text-sm">
                      {application.position_title || "—"}
                    </td>

                    <td className="px-5 py-5">
                      <span className="rounded-full bg-[#f0f1f3] px-3 py-1 text-[10px] font-medium capitalize">
                        {formatStatus(application.status)}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <button className="inline-flex items-center gap-1 text-xs font-semibold">
                        View
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {!applications?.length && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center"
                    >
                      <p className="font-semibold">
                        No worker applications yet
                      </p>

                      <Link
                        href="/employer/applications/new"
                        className="mt-3 inline-block text-sm underline"
                      >
                        Submit your first worker
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}