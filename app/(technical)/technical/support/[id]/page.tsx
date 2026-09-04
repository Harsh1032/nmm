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
import TechnicalSupportReplyForm from "@/components/technical/TechnicalSupportReplyForm";

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
    .single();

  if (!incident) {
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
    .order("created_at", {
      ascending: true,
    });

  const replyAction = replyToSupportRequest.bind(null, incident.id);

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

                <h2 className="font-bold">Request Details</h2>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Detail label="Category" value={incident.category} />

                <Detail label="Priority" value={incident.severity} />

                <Detail
                  label="Status"
                  value={incident.status.replaceAll("_", " ")}
                />

                <Detail
                  label="Submitted By"
                  value={
                    incident.employer_id ? "Registered Employer" : "Individual"
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

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.03)]">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />

                <div>
                  <h2 className="font-bold">Conversation</h2>

                  <p className="mt-1 text-xs text-[#667085]">
                    Communication history for this support request.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-xl bg-[#fbfcfd] p-4">
                <div className="rounded-xl border border-[#e4e7ec] bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
                      Original Request
                    </p>

                    <span className="rounded-full bg-[#f2f4f7] px-2.5 py-1 text-[10px] font-medium text-[#475467]">
                      Submitted
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#202124]">
                    {incident.description}
                  </p>
                </div>

                {(messages ?? []).map((message) => {
                  const isTechnical = message.author_role === "admin";

                  const senderLabel = isTechnical
                    ? "Technical Team"
                    : message.author_role === "employer"
                      ? "Employer"
                      : "Individual";

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isTechnical ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`w-fit max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                          isTechnical
                            ? "rounded-br-md bg-[#181818] text-white"
                            : "rounded-bl-md border border-[#e4e7ec] bg-[#f4f6f8] text-[#202124]"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-bold uppercase tracking-[0.08em] ${
                            isTechnical ? "text-white/55" : "text-[#667085]"
                          }`}
                        >
                          {senderLabel}
                        </p>

                        <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6">
                          {message.message}
                        </p>

                        <p
                          className={`mt-2 text-[10px] ${
                            isTechnical ? "text-white/40" : "text-[#98a2b3]"
                          }`}
                        >
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(message.created_at))}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {!messages?.length && (
                  <div className="py-8 text-center">
                    <MessageSquare className="mx-auto h-5 w-5 text-[#98a2b3]" />

                    <p className="mt-3 text-sm text-[#667085]">
                      No responses have been sent yet.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside>
            <TechnicalSupportReplyForm
              action={replyAction}
              currentStatus={incident.status}
            />

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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase text-[#667085]">{label}</p>

      <p className="mt-2 text-sm font-semibold capitalize">{value}</p>
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
        <p className="text-xs font-bold">{label}</p>

        <p className="mt-1 text-[11px] leading-5 text-[#667085]">{text}</p>
      </div>
    </div>
  );
}
