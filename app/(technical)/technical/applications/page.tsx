import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight, Building2, UserRound } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TechnicalApplicationsPage() {
  await requireRole(["admin"]);

  const supabase = await createClient();

  const { data: applications, error } = await supabase
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
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Technical applications error:", error);
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-362.5">
        <header className="border-b border-[#dfe3e8] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Technical Operations
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Application Review
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Review employer and individual migration applications.
          </p>
        </header>

        <section className="mt-7 overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
          <div className="border-b px-6 py-5">
            <h2 className="font-bold">Processing Queue</h2>

            <p className="mt-1 text-xs text-[#667085]">
              {applications?.length ?? 0} applications
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-262.5">
              <thead>
                <tr className="border-b bg-[#fafbfc] text-left text-[10px] font-bold uppercase text-[#667085]">
                  <th className="px-5 py-4">Application</th>
                  <th className="px-5 py-4">Applicant</th>
                  <th className="px-5 py-4">Submitted By</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Route</th>
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

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        {application.applicant_type === "employer" ? (
                          <Building2 className="h-4 w-4" />
                        ) : (
                          <UserRound className="h-4 w-4" />
                        )}

                        <span className="text-xs">
                          {application.applicant_type === "employer"
                            ? application.employer_name || "Employer"
                            : "Individual"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-xs">
                      {application.application_category === "refugee"
                        ? "Refugee"
                        : application.movement_direction === "outbound"
                          ? "Outbound Employment"
                          : "Inbound Employment"}
                    </td>

                    <td className="px-5 py-5 text-xs">
                      {application.origin_country || "—"}
                      {" → "}
                      {application.destination_country || "—"}
                    </td>

                    <td className="px-5 py-5">
                      <StatusBadge status={application.status} />
                    </td>

                    <td className="px-5 py-5">
                      <Link
                        href={`/technical/applications/${application.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold"
                      >
                        Review
                        <ArrowRight className="h-3.5 w-3.5" />
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

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    submitted: "bg-blue-50 text-blue-700",
    under_review: "bg-amber-50 text-amber-700",
    more_information_required: "bg-orange-50 text-orange-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
        styles[status] ?? "bg-[#f0f1f3]"
      }`}
    >
      {status
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())}
    </span>
  );
}