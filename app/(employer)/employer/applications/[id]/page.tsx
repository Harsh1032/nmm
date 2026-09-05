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
      application_category,
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
            <Plus className="h-4 w-4" />
            Submit Worker
          </Link>
        </header>

        <section className="mt-7 overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead>
                <tr className="border-b bg-[#fafbfc] text-left text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                  <th className="px-5 py-4">
                    Application
                  </th>

                  <th className="px-5 py-4">
                    Worker
                  </th>

                  <th className="px-5 py-4">
                    Movement
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
                {(applications ?? []).map(
                  (application) => (
                    <tr
                      key={application.id}
                      className="border-b border-[#edf0f3] transition last:border-0 hover:bg-[#fafbfc]"
                    >
                      <td className="px-5 py-5 text-xs font-semibold">
                        {
                          application.application_number
                        }
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm font-bold">
                          {
                            application.full_name
                          }
                        </p>

                        <p className="mt-1 text-[10px] text-[#667085]">
                          {
                            application.nationality
                          }
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {getMovementLabel(
                          application.application_category,
                          application.movement_direction
                        )}
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {
                          application.destination_country ||
                          "—"
                        }
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {
                          application.position_title ||
                          "—"
                        }
                      </td>

                      <td className="px-5 py-5">
                        <StatusBadge
                          status={
                            application.status
                          }
                        />
                      </td>

                      <td className="px-5 py-5">
                        <Link
                          href={`/employer/applications/${application.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold transition hover:underline"
                        >
                          View

                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  )
                )}

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
        : status === "under_review" ||
            status === "in_review"
          ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
          : status ===
                "more_information_required" ||
              status ===
                "needs_information"
            ? "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200"
            : "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100";

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-semibold ${styles}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(
  value: string
) {
  switch (value) {
    case "approved":
      return "Approved";

    case "rejected":
      return "Rejected";

    case "under_review":
    case "in_review":
      return "Under Review";

    case "more_information_required":
    case "needs_information":
      return "More Information";

    case "submitted":
      return "Submitted";

    default:
      return value
        .replaceAll("_", " ")
        .replace(
          /\b\w/g,
          (letter) =>
            letter.toUpperCase()
        );
  }
}

function getMovementLabel(
  applicationCategory:
    | string
    | null,
  movementDirection:
    | string
    | null
) {
  if (
    applicationCategory ===
    "refugee"
  ) {
    return "Refugee";
  }

  if (
    movementDirection ===
    "outbound"
  ) {
    return "Outbound";
  }

  if (
    movementDirection ===
    "inbound"
  ) {
    return "Inbound";
  }

  return "—";
}