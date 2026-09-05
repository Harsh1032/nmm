import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, Plus, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EmployerWorkersPage() {
  const { profile } = await requireRole(["employer"]);

  if (!profile.employer_id) {
    throw new Error(
      "Employer account is not linked to an organization."
    );
  }

  const supabase = await createClient();

  const { data: workers, error } = await supabase
    .from("migration_applications")
    .select(`
      id,
      application_number,
      full_name,
      nationality,
      passport_number,
      application_category,
      movement_direction,
      destination_country,
      destination_city,
      position_title,
      status,
      submitted_at
    `)
    .eq("employer_id", profile.employer_id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Unable to load employer workers:",
      error
    );
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-362.5">
        <header className="flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-6 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Employer Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Workers
            </h1>

            <p className="mt-2 text-sm text-[#667085]">
              View workers submitted by your organization and track
              their government processing status.
            </p>
          </div>

          <Link
            href="/employer/applications/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4 text-white" />
            <span className="text-white">Add Worker</span>
          </Link>
        </header>

        <section className="mt-7 overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
          <div className="flex items-center gap-3 border-b border-[#e2e6eb] px-6 py-5">
            <Users className="h-5 w-5" />

            <div>
              <h2 className="font-bold">
                Registered & Submitted Workers
              </h2>

              <p className="mt-1 text-xs text-[#667085]">
                {workers?.length ?? 0} worker records
              </p>
            </div>
          </div>

          {workers?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-250">
                <thead>
                  <tr className="border-b bg-[#fafbfc] text-left text-[10px] font-bold uppercase tracking-wider text-[#667085]">
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
                      Position
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {workers.map((worker) => (
                    <tr
                      key={worker.id}
                      className="border-b border-[#edf0f3] last:border-0"
                    >
                      <td className="px-5 py-5">
                        <p className="text-sm font-bold">
                          {worker.full_name}
                        </p>

                        <p className="mt-1 text-[10px] text-[#667085]">
                          {worker.nationality}
                          {" • "}
                          {worker.passport_number}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-xs font-semibold">
                        {worker.application_number}
                      </td>

                      <td className="px-5 py-5 text-xs">
                        {worker.application_category === "refugee"
                          ? "Refugee"
                          : worker.movement_direction === "outbound"
                            ? "Outbound"
                            : "Inbound"}
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {worker.destination_country || "—"}

                        {worker.destination_city && (
                          <p className="mt-1 text-[10px] text-[#667085]">
                            {worker.destination_city}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {worker.position_title || "—"}
                      </td>

                      <td className="px-5 py-5">
                        <StatusBadge
                          status={worker.status}
                        />
                      </td>

                      <td className="px-5 py-5">
                        <Link
                          href={`/employer/workers/${worker.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold"
                        >
                          View
                          {/* <ArrowRight className="h-3.5 w-3.5" /> */}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <p className="font-semibold">
                No workers submitted yet
              </p>

              <p className="mt-2 text-sm text-[#667085]">
                Add a single worker or upload workers using Excel.
              </p>
            </div>
          )}
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
    draft:
      "bg-slate-100 text-slate-700",

    submitted:
      "bg-blue-50 text-blue-700",

    under_review:
      "bg-amber-50 text-amber-700",

    more_information_required:
      "bg-orange-50 text-orange-700",

    approved:
      "bg-emerald-50 text-emerald-700",

    rejected:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold ${
        styles[status] ??
        "bg-[#f0f1f3] text-[#475467]"
      }`}
    >
      {status
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )}
    </span>
  );
}