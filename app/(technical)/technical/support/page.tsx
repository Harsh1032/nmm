import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  LifeBuoy,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TechnicalSupportPage() {
  await requireRole(["admin"]);

  const supabase = await createClient();

  const { data: requests, error } = await supabase
    .from("support_incidents")
    .select(`
      id,
      reference_number,
      reported_by,
      employer_id,
      category,
      description,
      severity,
      status,
      created_at,
      updated_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Technical support query error:",
      error
    );
  }

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-362.5">
        <header className="border-b border-[#dfe3e8] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Technical Operations
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Support Requests
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Review and respond to assistance requests submitted by
            individuals and registered organizations.
          </p>
        </header>

        <section className="mt-7 overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
          <div className="border-b border-[#e2e6eb] px-6 py-5">
            <h2 className="font-bold">
              Support Queue
            </h2>

            <p className="mt-1 text-xs text-[#667085]">
              {requests?.length ?? 0} requests
            </p>
          </div>

          {requests?.length ? (
            <div className="divide-y divide-[#edf0f3]">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="grid gap-5 p-5 lg:grid-cols-[160px_1fr_150px_150px_110px]"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#667085]">
                      Reference
                    </p>

                    <p className="mt-2 text-sm font-bold">
                      {request.reference_number}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#667085]">
                      Request
                    </p>

                    <p className="mt-2 text-sm font-semibold capitalize">
                      {request.category}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#667085]">
                      {request.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#667085]">
                      Submitted By
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      {request.employer_id ? (
                        <Building2 className="h-4 w-4" />
                      ) : (
                        <UserRound className="h-4 w-4" />
                      )}

                      <span className="text-xs">
                        {request.employer_id
                          ? "Employer"
                          : "Individual"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#667085]">
                      Priority
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs capitalize">
                      {request.severity === "critical" && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}

                      {request.severity}
                    </div>
                  </div>

                  <div className="flex items-center justify-start lg:justify-end">
                    <Link
                      href={`/technical/support/${request.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      Review
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <LifeBuoy className="mx-auto h-6 w-6" />

              <p className="mt-4 font-semibold">
                No support requests
              </p>

              <p className="mt-2 text-sm text-[#667085]">
                New requests submitted by users will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}