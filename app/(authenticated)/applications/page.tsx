import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const supabase = await createClient();

  const { data: applications } = await supabase
    .from("migration_applications")
    .select(
      `
        id,
        application_number,
        full_name,
        nationality,
        applicant_type,
        movement_direction,
        origin_country,
        destination_country,
        employer_name,
        status,
        submitted_at
      `,
    )
    .order("submitted_at", {
      ascending: false,
    });

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-375">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
            Government Review
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
            Migration Applications
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Review employer and individual submissions.
          </p>
        </header>

        <section className="mt-7 overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead>
                <tr className="border-b bg-[#fafbfc] text-left text-[10px] uppercase text-[#667085]">
                  <th className="px-5 py-4">Application</th>
                  <th className="px-5 py-4">Applicant</th>
                  <th className="px-5 py-4">Submitted By</th>
                  <th className="px-5 py-4">Movement</th>
                  <th className="px-5 py-4">Route</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {(applications ?? []).map((application) => (
                  <tr key={application.id} className="border-b last:border-0">
                    <td className="px-5 py-5 text-xs font-semibold">
                      {application.application_number}
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-sm font-bold">
                        {application.full_name}
                      </p>

                      <p className="text-[10px] text-[#667085]">
                        {application.nationality}
                      </p>
                    </td>

                    <td className="px-5 py-5 text-sm capitalize">
                      {application.applicant_type === "employer"
                        ? application.employer_name || "Employer"
                        : "Individual"}
                    </td>

                    <td className="px-5 py-5 text-sm capitalize">
                      {application.movement_direction}
                    </td>

                    <td className="px-5 py-5 text-sm">
                      {application.origin_country}
                      {" → "}
                      {application.destination_country}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold capitalize ${getApplicationStatusStyle(
                          application.status,
                        )}`}
                      >
                        {formatApplicationStatus(application.status)}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <Link
                        href={`/applications/${application.application_number}`}
                        className="text-xs font-semibold hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}


function getApplicationStatusStyle(status: string) {
  switch (status) {
    case "approved":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";

    case "rejected":
      return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";

    case "under_review":
    case "in_review":
      return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";

    case "more_information_required":
    case "needs_information":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";

    case "submitted":
    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
  }
}

function formatApplicationStatus(status: string) {
  switch (status) {
    case "under_review":
    case "in_review":
      return "Under Review";

    case "more_information_required":
    case "needs_information":
      return "More Information";

    case "approved":
      return "Approved";

    case "rejected":
      return "Rejected";

    case "submitted":
      return "Submitted";

    default:
      return status.replaceAll("_", " ");
  }
}