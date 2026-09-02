import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  LifeBuoy,
  MessageSquare,
} from "lucide-react";
import { notFound } from "next/navigation";
import { replyToSupportRequest } from "./actions";

export const dynamic = "force-dynamic";

export default async function TechnicalSupportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole(["admin"]);

  const { id } = await params;

  const supabase = await createClient();

  const { data: incident } = await supabase
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
      updated_at,
      resolved_at
    `)
    .eq("id", id)
    .single();

  if (!incident) {
    notFound();
  }

  const { data: messages } = await supabase
    .from("support_messages")
    .select(`
      id,
  author_user_id,
  author_role,
      message,
      is_internal,
      created_at
    `)
    .eq("incident_id", incident.id)
    .order("created_at", {
      ascending: true,
    });

  const replyAction =
    replyToSupportRequest.bind(
      null,
      incident.id
    );

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#dfe3e8] pb-6">
          <p className="text-xs font-bold uppercase text-[#667085]">
            Technical Support
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {incident.reference_number}
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Review and respond to this support request.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <section className="rounded-xl border bg-white p-6">
              <div className="flex items-center gap-3">
                <LifeBuoy className="h-5 w-5" />

                <h2 className="font-bold">
                  Request Details
                </h2>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Detail
                  label="Category"
                  value={incident.category}
                />

                <Detail
                  label="Priority"
                  value={incident.severity}
                />

                <Detail
                  label="Status"
                  value={incident.status.replaceAll(
                    "_",
                    " "
                  )}
                />

                <Detail
                  label="Submitted By"
                  value={
                    incident.employer_id
                      ? "Registered Employer"
                      : "Individual"
                  }
                />
              </div>

              <div className="mt-6 border-t pt-5">
                <p className="text-[10px] font-bold uppercase text-[#667085]">
                  Original Request
                </p>

                <p className="mt-3 text-sm leading-7 text-[#202124]">
                  {incident.description}
                </p>
              </div>
            </section>

            <section className="rounded-xl border bg-white p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />

                <h2 className="font-bold">
                  Conversation
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                <div className="max-w-[85%] rounded-lg bg-[#f3f4f6] p-4">
                  <p className="text-[10px] font-bold uppercase text-[#667085]">
                    Original Request
                  </p>

                  <p className="mt-2 text-sm leading-6">
                    {incident.description}
                  </p>
                </div>

                {(messages ?? []).map(
                  (message) => (
                    <div
                      key={message.id}
                      className="ml-auto max-w-[85%] rounded-lg bg-[#181818] p-4 text-white"
                    >
                      <p className="text-[10px] font-bold uppercase text-white/50">
                        Technical Team
                      </p>

                      <p className="mt-2 text-sm leading-6">
                        {message.message}
                      </p>

                      <p className="mt-3 text-[10px] text-white/45">
                        {new Intl.DateTimeFormat(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        ).format(
                          new Date(
                            message.created_at
                          )
                        )}
                      </p>
                    </div>
                  )
                )}

                {!messages?.length && (
                  <p className="text-sm text-[#667085]">
                    No responses have been sent yet.
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside>
            <form
              action={replyAction}
              className="rounded-xl border bg-white p-6"
            >
              <h2 className="font-bold">
                Respond to Request
              </h2>

              <label className="mt-5 block">
                <span className="text-xs font-bold uppercase text-[#667085]">
                  Response
                </span>

                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="Write a response to the user..."
                  className="mt-2 w-full rounded-md border border-[#d8dde5] p-3 text-sm"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-xs font-bold uppercase text-[#667085]">
                  Update Status
                </span>

                <select
                  name="status"
                  defaultValue={
                    incident.status === "open"
                      ? "in_progress"
                      : incident.status
                  }
                  className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm"
                >
                  <option value="in_progress">
                    In Progress
                  </option>

                  <option value="waiting_for_user">
                    Waiting for User
                  </option>

                  <option value="resolved">
                    Resolved
                  </option>

                  <option value="closed">
                    Closed
                  </option>
                </select>
              </label>

              <button
                type="submit"
                className="mt-6 h-11 w-full rounded-md bg-[#181818] text-sm font-semibold text-white"
              >
                Send Response
              </button>
            </form>

            <section className="mt-5 rounded-xl border bg-white p-5">
              <p className="text-xs font-bold uppercase text-[#667085]">
                Status Guide
              </p>

              <div className="mt-4 space-y-4">
                <StatusInfo
                  icon={Clock3}
                  label="In Progress"
                  text="Technical team is reviewing the request."
                />

                <StatusInfo
                  icon={AlertTriangle}
                  label="Waiting for User"
                  text="Additional information is required."
                />

                <StatusInfo
                  icon={CheckCircle2}
                  label="Resolved"
                  text="Issue has been resolved."
                />
              </div>
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
    <div>
      <p className="text-[10px] font-bold uppercase text-[#667085]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold capitalize">
        {value}
      </p>
    </div>
  );
}

function StatusInfo({
  icon: Icon,
  label,
  text,
}: {
  icon: React.ElementType;
  label: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />

      <div>
        <p className="text-xs font-bold">
          {label}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-[#667085]">
          {text}
        </p>
      </div>
    </div>
  );
}