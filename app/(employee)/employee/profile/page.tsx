import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  CheckCircle2,
  IdCard,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EmployeeProfilePage() {
  const { user, profile } = await requireRole(["employee"]);

  const supabase = await createClient();

  let migrationRecord = null;

  if (profile.migration_record_id) {
    const { data } = await supabase
      .from("migration_records")
      .select(`
        migration_id,
        full_name,
        date_of_birth,
        gender,
        nationality,
        passport_number,
        visa_type,
        visa_status,
        destination_country,
        destination_city
      `)
      .eq("id", profile.migration_record_id)
      .single();

    migrationRecord = data;
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Individual Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Review your personal account and official migration information.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
            <div className="flex items-center gap-4 border-b border-[#e2e6eb] pb-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f2f4]">
                <UserRound className="h-6 w-6" />
              </span>

              <div>
                <h2 className="text-xl font-bold">
                  {profile.full_name}
                </h2>

                <p className="mt-1 text-sm text-[#667085]">
                  Registered Individual
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <Detail
                label="Account Email"
                value={profile.email ?? user.email ?? "—"}
              />

              <Detail
                label="Official Migration ID"
                value={migrationRecord?.migration_id ?? "Not Assigned"}
              />

              <Detail
                label="Nationality"
                value={migrationRecord?.nationality ?? "Pending application"}
              />

              <Detail
                label="Passport Number"
                value={migrationRecord?.passport_number ?? "Pending application"}
              />

              <Detail
                label="Visa Status"
                value={migrationRecord?.visa_status ?? "Not Assigned"}
              />

              <Detail
                label="Destination"
                value={
                  migrationRecord
                    ? [
                        migrationRecord.destination_city,
                        migrationRecord.destination_country,
                      ]
                        .filter(Boolean)
                        .join(", ")
                    : "Not Assigned"
                }
              />
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />

              <h2 className="mt-4 font-bold">
                Account Verified
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Your portal account is active and can submit migration
                applications.
              </p>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <ShieldCheck className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Data Protection
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                You can access only information associated with your own
                account and applications.
              </p>
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
    <div className="flex flex-col justify-between gap-2 border-b border-[#edf0f3] py-4 sm:flex-row sm:items-center">
      <span className="text-xs font-bold uppercase text-[#667085]">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#202124]">
        {value}
      </span>
    </div>
  );
}