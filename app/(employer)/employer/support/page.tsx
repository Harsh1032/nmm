import EmployerSupportForm from "@/components/employer/EmployerSupportForm";
import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  Building2,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EmployerSupportPage() {
  const { user } = await requireRole(["employer"]);

  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("support_incidents")
    .select(`
      id,
      reference_number,
      category,
      severity,
      status,
      created_at
    `)
    .eq("reported_by", user.id)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Employer Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Support & Assistance
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
            Request support for worker applications, compliance,
            documentation or technical issues.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5" />

              <h2 className="font-bold">
                Request Employer Assistance
              </h2>
            </div>

            <div className="mt-6">
              <EmployerSupportForm />
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <LifeBuoy className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Recent Requests
              </h2>

              <div className="mt-4 space-y-3">
                {(requests ?? []).map((request) => (
                  <Link
                    key={request.id}
                    href={`/employer/support/${request.id}`}
                    className="block rounded-lg border border-[#edf0f3] p-4 transition hover:bg-[#fafbfc]"
                  >
                    <div className="flex justify-between gap-3">
                      <span className="text-xs font-bold">
                        {request.reference_number}
                      </span>

                      <span className="text-[10px] capitalize text-[#667085]">
                        {request.status.replaceAll(
                          "_",
                          " "
                        )}
                      </span>
                    </div>

                    <p className="mt-2 text-sm capitalize">
                      {request.category}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] capitalize text-[#667085]">
                        Priority: {request.severity}
                      </span>

                      <span className="text-[10px] font-semibold text-[#202124]">
                        View Request →
                      </span>
                    </div>
                  </Link>
                ))}

                {!requests?.length && (
                  <p className="text-sm text-[#667085]">
                    No support requests submitted.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-xl bg-[#181818] p-5 text-white">
              <ShieldCheck className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Employer Support
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Use this channel for migration application issues,
                worker documentation and compliance assistance.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}