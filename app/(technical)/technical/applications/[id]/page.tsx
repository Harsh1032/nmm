import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";
import { notFound } from "next/navigation";
import { updateApplicationStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function TechnicalApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole(["admin"]);

  const { id } = await params;

  const supabase = await createClient();

  const { data: application } = await supabase
    .from("migration_applications")
    .select(`
      *
    `)
    .eq("id", id)
    .single();

  if (!application) {
    notFound();
  }

  const action = updateApplicationStatus.bind(
    null,
    application.id
  );

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#dfe3e8] pb-6">
          <p className="text-xs font-bold uppercase text-[#667085]">
            Technical Review
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {application.application_number}
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Review submitted migration information and issue a processing decision.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <section className="rounded-xl border bg-white p-6">
              <h2 className="font-bold">
                Applicant Information
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Detail
                  label="Full Name"
                  value={application.full_name}
                />

                <Detail
                  label="Nationality"
                  value={application.nationality}
                />

                <Detail
                  label="Passport Number"
                  value={application.passport_number}
                />

                <Detail
                  label="Submitted By"
                  value={
                    application.applicant_type === "employer"
                      ? application.employer_name || "Employer"
                      : "Individual"
                  }
                />
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <h2 className="font-bold">
                Migration Details
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Detail
                  label="Application Type"
                  value={
                    application.application_category === "refugee"
                      ? "Refugee / Humanitarian"
                      : application.movement_direction === "outbound"
                        ? "Going Abroad for Employment"
                        : "Entering Country for Employment"
                  }
                />

                <Detail
                  label="Origin"
                  value={application.origin_country || "—"}
                />

                <Detail
                  label="Destination"
                  value={
                    [
                      application.destination_city,
                      application.destination_country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "—"
                  }
                />

                <Detail
                  label="Position"
                  value={application.position_title || "—"}
                />

                <Detail
                  label="Visa Type"
                  value={application.visa_type || "—"}
                />

                <Detail
                  label="Current Status"
                  value={application.status.replaceAll("_", " ")}
                />
              </div>
            </section>

            {application.decision_reason && (
              <section className="rounded-xl border border-orange-200 bg-orange-50 p-6">
                <h2 className="font-bold">
                  Review Feedback
                </h2>

                <p className="mt-3 text-sm leading-6">
                  {application.decision_reason}
                </p>
              </section>
            )}
          </div>

          <aside>
            <form
              action={action}
              className="rounded-xl border bg-white p-6"
            >
              <h2 className="font-bold">
                Processing Decision
              </h2>

              <label className="mt-5 block">
                <span className="text-xs font-bold uppercase text-[#667085]">
                  Internal Review Note
                </span>

                <textarea
                  name="reviewNotes"
                  rows={4}
                  defaultValue={
                    application.review_notes || ""
                  }
                  className="mt-2 w-full rounded-md border p-3 text-sm"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-xs font-bold uppercase text-[#667085]">
                  Applicant Feedback / Reason
                </span>

                <textarea
                  name="decisionReason"
                  rows={4}
                  defaultValue={
                    application.decision_reason || ""
                  }
                  placeholder="Required when requesting more information or rejecting."
                  className="mt-2 w-full rounded-md border p-3 text-sm"
                />
              </label>

              <div className="mt-6 space-y-3">
                <button
                  name="status"
                  value="under_review"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md border font-semibold"
                >
                  <Clock3 className="h-4 w-4" />
                  Mark Under Review
                </button>

                <button
                  name="status"
                  value="more_information_required"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-orange-300 bg-orange-50 font-semibold text-orange-800"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Request More Information
                </button>

                <button
                  name="status"
                  value="approved"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-600 font-semibold text-white"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve Application
                </button>

                <button
                  name="status"
                  value="rejected"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-red-600 font-semibold text-white"
                >
                  <XCircle className="h-4 w-4" />
                  Reject Application
                </button>
              </div>
            </form>
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
      <p className="text-[10px] font-bold uppercase text-[#667085]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}