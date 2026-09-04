import EmployeeSupportReplyForm from "@/components/employee/EmployeeSupportReplyForm";
import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";

import {
  CheckCircle2,
  Clock3,
  HeartHandshake,
  MessageSquare,
} from "lucide-react";

import { notFound } from "next/navigation";
import { replyToEmployeeSupportRequest } from "./actions";

export const dynamic = "force-dynamic";

export default async function EmployeeSupportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await requireRole(["employee"]);

  const { id } = await params;

  const supabase = await createClient();

  const { data: incident, error } = await supabase
    .from("support_incidents")
    .select(
      `
      id,
      reference_number,
      reported_by,
      employer_id,
      category,
      description,
      severity,
      status,
      created_at,
      updated_at,
      resolved_at
    `,
    )
    .eq("id", id)
    .eq("reported_by", user.id)
    .single();

  if (error || !incident) {
    notFound();
  }

  const { data: messages } = await supabase
    .from("support_messages")
    .select(
      `
        id,
        author_user_id,
        author_role,
        message,
        is_internal,
        created_at
      `,
    )
    .eq("incident_id", incident.id)
    .eq("is_internal", false)
    .order("created_at", {
      ascending: true,
    });

  const replyAction = replyToEmployeeSupportRequest.bind(null, incident.id);

  const isClosed =
    incident.status === "resolved" || incident.status === "closed";

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#dfe3e8] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Individual Support
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
            {incident.reference_number}
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Track your support request and communicate with the technical team.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            {/* REQUEST DETAILS */}

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-5 w-5" />

                <h2 className="font-bold">Support Request</h2>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <Detail label="Category" value={incident.category} />

                <Detail label="Priority" value={incident.severity} />

                <Detail
                  label="Status"
                  value={incident.status.replaceAll("_", " ")}
                />
              </div>

              <div className="mt-6 border-t border-[#edf0f3] pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#667085]">
                  Original Request
                </p>

                <p className="mt-3 text-sm leading-7 text-[#202124]">
                  {incident.description}
                </p>
              </div>
            </section>

            {/* CONVERSATION */}

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />

                <div>
                  <h2 className="font-bold">Conversation</h2>

                  <p className="mt-1 text-xs text-[#667085]">
                    Messages between you and the technical support team.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {/* ORIGINAL REQUEST - EMPLOYEE'S MESSAGE */}

                <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-[#181818] px-5 py-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-white/50">
                    You · Original Request
                  </p>

                  <p className="mt-2 text-sm leading-6">
                    {incident.description}
                  </p>

                  <p className="mt-3 text-[10px] text-white/40">
                    {formatDate(incident.created_at)}
                  </p>
                </div>

                {(messages ?? []).map((message) => {
                  const isEmployee =
                    message.author_user_id === user.id ||
                    message.author_role === "employee";

                  return (
                    <div
                      key={message.id}
                      className={
                        isEmployee
                          ? "ml-auto w-fit max-w-[75%] rounded-2xl rounded-br-md bg-[#181818] px-4 py-3 text-white shadow-sm"
                          : "mr-auto w-fit max-w-[75%] rounded-2xl rounded-bl-md border border-[#e2e6eb] bg-[#f4f6f8] px-4 py-3 text-[#202124]"
                      }
                    >
                      <p
                        className={
                          isEmployee
                            ? "text-[10px] font-bold uppercase tracking-[0.06em] text-white/50"
                            : "text-[10px] font-bold uppercase tracking-[0.06em] text-[#667085]"
                        }
                      >
                        {isEmployee ? "You" : "Technical Team"}
                      </p>

                      <p className="mt-2 text-sm leading-6">
                        {message.message}
                      </p>

                      <p
                        className={
                          isEmployee
                            ? "mt-3 text-[10px] text-white/40"
                            : "mt-3 text-[10px] text-[#98a2b3]"
                        }
                      >
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                  );
                })}

                {!messages?.length && (
                  <div className="rounded-lg border border-dashed border-[#d8dde5] px-5 py-8 text-center">
                    <p className="text-sm font-medium">
                      Waiting for a response
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">
                      The technical team has not responded yet.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}

          <aside className="space-y-5">
            {!isClosed && <EmployeeSupportReplyForm action={replyAction} />}

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              {isClosed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <Clock3 className="h-5 w-5" />
              )}

              <h2 className="mt-4 font-bold capitalize">
                {incident.status.replaceAll("_", " ")}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                {incident.status === "waiting_for_user"
                  ? "The technical team requires additional information from you. Use the reply box above to provide it."
                  : incident.status === "resolved" ||
                      incident.status === "closed"
                    ? "The technical team has completed this support request."
                    : incident.status === "in_progress"
                      ? "The technical team is currently reviewing your request."
                      : "Your support request has been received and is waiting to be processed."}
              </p>
            </section>

            {incident.status === "waiting_for_user" && (
              <section className="rounded-xl bg-amber-50 p-5 ring-1 ring-inset ring-amber-200">
                <p className="text-xs font-bold uppercase text-amber-800">
                  Action Required
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  A response from you is required before the technical team can
                  continue processing this request.
                </p>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#667085]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold capitalize text-[#202124]">
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
