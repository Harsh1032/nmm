import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EmployerProfilePage() {
  const { user, profile } =
    await requireRole(["employer"]);

  if (!profile.employer_id) {
    throw new Error(
      "Employer account is not linked to an organization."
    );
  }

  const supabase = await createClient();

  const {
    data: employer,
    error,
  } = await supabase
    .from("employers")
    .select(`
      id,
      name,
      registration_number,
      sector,
      country,
      city,
      compliance_status,
      created_at
    `)
    .eq("id", profile.employer_id)
    .single();

  if (error || !employer) {
    throw new Error(
      "Unable to load organization profile."
    );
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Employer Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Organization Profile
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Review registered organization and representative
            information.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-4 border-b border-[#e2e6eb] pb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#f1f2f4]">
                  <Building2 className="h-6 w-6" />
                </span>

                <div>
                  <h2 className="text-xl font-bold">
                    {employer.name}
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    Registered Employer
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <Detail
                  label="Registration Number"
                  value={
                    employer.registration_number
                  }
                />

                <Detail
                  label="Industry / Sector"
                  value={
                    employer.sector || "—"
                  }
                />

                <Detail
                  label="Country"
                  value={
                    employer.country || "—"
                  }
                />

                <Detail
                  label="City"
                  value={
                    employer.city || "—"
                  }
                />

                <Detail
                  label="Compliance Status"
                  value={formatStatus(
                    employer.compliance_status
                  )}
                />
              </div>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-3">
                <UserRound className="h-5 w-5" />

                <h2 className="font-bold">
                  Authorized Representative
                </h2>
              </div>

              <div className="mt-5">
                <Detail
                  label="Full Name"
                  value={profile.full_name}
                />

                <Detail
                  label="Email"
                  value={
                    profile.email ||
                    user.email ||
                    "—"
                  }
                />

                <Detail
                  label="Role"
                  value={
                    profile.title ||
                    "Authorized Employer Representative"
                  }
                />

                <Detail
                  label="Access Level"
                  value="Organization"
                />
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />

              <h2 className="mt-4 font-bold">
                Organization Verified
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                This organization is authorized to submit and
                manage worker migration applications.
              </p>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <ShieldCheck className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Data Access
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Employer users can access only worker records and
                applications associated with their organization.
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
    <div className="flex flex-col justify-between gap-2 border-b border-[#edf0f3] py-4 last:border-0 sm:flex-row sm:items-center">
      <span className="text-xs font-bold uppercase text-[#667085]">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#202124]">
        {value}
      </span>
    </div>
  );
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}