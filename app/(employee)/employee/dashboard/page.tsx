import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  IdCard,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EmployeeDashboardPage() {
  const { user, profile } = await requireRole(["employee"]);

  const supabase = await createClient();

  const { data: applications } = await supabase
    .from("migration_applications")
    .select(`
      id,
      application_number,
      movement_direction,
      origin_country,
      destination_country,
      destination_city,
      employer_name,
      status,
      submitted_at,
      created_at
    `)
    .eq("applicant_user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  const latestApplication = applications?.[0] ?? null;

  let migrationRecord = null;

  if (profile.migration_record_id) {
    const { data } = await supabase
      .from("migration_records")
      .select(`
        migration_id,
        full_name,
        nationality,
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
      <div className="mx-auto max-w-362.5">
        {/* HEADER */}
        <header className="flex flex-col justify-between gap-5 border-b border-[#dfe3e8] pb-6 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Individual Migration Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#202124]">
              Welcome, {profile.full_name}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
              Apply for migration and employment services, submit required
              information, and track your application through government
              review.
            </p>
          </div>

          <Link
            href="/employee/applications/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white transition hover:bg-black"
          >
            <Plus className="h-4 w-4" />
            Start New Application
          </Link>
        </header>

        {/* MAIN STATUS */}
        <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatusCard
            label="Official Migration ID"
            value={migrationRecord?.migration_id ?? "Not Assigned"}
            note={
              migrationRecord
                ? "Official record active"
                : "Issued after application approval"
            }
            icon={IdCard}
          />

          <StatusCard
            label="Applications"
            value={String(applications?.length ?? 0)}
            note="Applications submitted by you"
            icon={FileText}
          />

          <StatusCard
            label="Latest Status"
            value={
              latestApplication
                ? formatStatus(latestApplication.status)
                : "No Application"
            }
            note={
              latestApplication?.application_number ??
              "Start your first application"
            }
            icon={Clock3}
          />

          <StatusCard
            label="Account Status"
            value="Verified"
            note="Individual portal access active"
            icon={ShieldCheck}
          />
        </section>

        <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            {/* APPLICATION CTA */}
            {!latestApplication && (
              <section className="rounded-xl border border-[#dce1e7] bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f1f2f4]">
                  <Globe2 className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-[#202124]">
                  Start Your Migration Application
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                  Apply if you are travelling abroad for employment or
                  entering the country for employment. Your application will
                  be submitted to the relevant government authorities for
                  review.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <ApplicationType
                    title="Going Abroad"
                    description="Submit an outbound employment or migration application."
                  />

                  <ApplicationType
                    title="Entering the Country"
                    description="Submit an inbound employment or migration application."
                  />
                </div>

                <Link
                  href="/employee/applications/new"
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-[#181818] px-5 text-sm font-semibold text-white"
                >
                  <span className="text-white">Begin Application</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>
            )}

            {/* LATEST APPLICATION */}
            {latestApplication && (
              <section className="rounded-xl border border-[#e2e6eb] bg-white">
                <div className="flex flex-col justify-between gap-3 border-b border-[#e2e6eb] px-6 py-5 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="font-bold text-[#202124]">
                      Latest Application
                    </h2>

                    <p className="mt-1 text-xs text-[#667085]">
                      Follow the progress of your most recent submission.
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-[#f0f1f3] px-3 py-1 text-xs font-semibold capitalize">
                    {formatStatus(latestApplication.status)}
                  </span>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
                  <Detail
                    label="Application Number"
                    value={latestApplication.application_number}
                  />

                  <Detail
                    label="Movement"
                    value={
                      latestApplication.movement_direction === "outbound"
                        ? "Going Abroad"
                        : "Entering Country"
                    }
                  />

                  <Detail
                    label="Origin"
                    value={latestApplication.origin_country ?? "—"}
                  />

                  <Detail
                    label="Destination"
                    value={latestApplication.destination_country ?? "—"}
                  />
                </div>

                <div className="border-t border-[#e2e6eb] px-6 py-4">
                  <Link
                    href="/employee/applications"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#202124]"
                  >
                    View All Applications
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            )}

            {/* PROCESS */}
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <h2 className="font-bold text-[#202124]">
                How the Process Works
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-4">
                <ProcessStep
                  number="01"
                  title="Submit"
                  text="Complete your personal and migration details."
                />

                <ProcessStep
                  number="02"
                  title="Review"
                  text="Government officials verify your application."
                />

                <ProcessStep
                  number="03"
                  title="Decision"
                  text="Receive approval or a request for more information."
                />

                <ProcessStep
                  number="04"
                  title="Official Record"
                  text="An approved application becomes an official migration record."
                />
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />

              <h2 className="mt-4 font-bold text-[#202124]">
                Account Ready
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Your individual account is active. You can submit and track
                migration applications from this portal.
              </p>
            </section>

            <section className="rounded-xl bg-[#181818] p-6 text-white">
              <FileText className="h-6 w-6" />

              <h2 className="mt-4 text-lg font-bold">
                Application Requirements
              </h2>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <p>• Valid passport details</p>
                <p>• Origin and destination information</p>
                <p>• Employment details where applicable</p>
                <p>• Supporting documents</p>
              </div>

              <Link
                href="/employee/applications/new"
                className="mt-6 flex h-11 items-center justify-center rounded-md bg-white text-sm font-semibold text-[#181818]"
              >
                <span className="text-[#181818]">Start Application</span>
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function StatusCard({
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-[#202124]">
            {value}
          </p>

          <p className="mt-2 text-xs text-[#667085]">
            {note}
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2f3f5]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

function ApplicationType({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-[#dfe3e8] bg-[#fafbfc] p-5">
      <Globe2 className="h-5 w-5" />

      <h3 className="mt-4 font-bold">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[#667085]">
        {description}
      </p>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <span className="text-xs font-bold text-[#98a0ae]">
        {number}
      </span>

      <h3 className="mt-2 text-sm font-bold text-[#202124]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[#667085]">
        {text}
      </p>
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

      <p className="mt-2 text-sm font-semibold text-[#202124]">
        {value}
      </p>
    </div>
  );
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}