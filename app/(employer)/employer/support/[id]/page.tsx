import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import {
  Building2,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Send,
} from "lucide-react";
import { notFound } from "next/navigation";
import { replyToEmployerSupportRequest } from "./actions";

export const dynamic = "force-dynamic";

export default async function EmployerSupportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user, profile } = await requireRole(["employer"]);

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

  const replyAction = replyToEmployerSupportRequest.bind(null, incident.id);

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#dfe3e8] pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Employer Support
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {incident.reference_number}
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Track your request and communicate with the technical team.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5" />

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
                <p className="text-[10px] font-bold uppercase text-[#667085]">
                  Original Request
                </p>

                <p className="mt-3 text-sm leading-7 text-[#202124]">
                  {incident.description}
                </p>
              </div>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />

                <h2 className="font-bold">Conversation</h2>
              </div>

              <div className="mt-6 space-y-4">
                <div className="max-w-[85%] rounded-lg bg-[#f3f4f6] p-4">
                  <p className="text-[10px] font-bold uppercase text-[#667085]">
                    Your Request
                  </p>

                  <p className="mt-2 text-sm leading-6">
                    {incident.description}
                  </p>
                </div>

                {(messages ?? []).map((message) => {
                  const isOwnMessage = message.author_user_id === user.id;
                  user.id;

                  return (
                    <div
                      key={message.id}
                      className={
                        isOwnMessage
                          ? "ml-auto max-w-[85%] rounded-lg bg-[#181818] p-4 text-white"
                          : "max-w-[85%] rounded-lg bg-[#eef1f4] p-4 text-[#202124]"
                      }
                    >
                      <p
                        className={
                          isOwnMessage
                            ? "text-[10px] font-bold uppercase text-white/50"
                            : "text-[10px] font-bold uppercase text-[#667085]"
                        }
                      >
                        {isOwnMessage ? "You" : "Technical Team"}
                      </p>

                      <p className="mt-2 text-sm leading-6">
                        {message.message}
                      </p>

                      <p
                        className={
                          isOwnMessage
                            ? "mt-3 text-[10px] text-white/45"
                            : "mt-3 text-[10px] text-[#98a0ae]"
                        }
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
                  );
                })}

                {!messages?.length && (
                  <p className="text-sm text-[#667085]">
                    The technical team has not responded yet.
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            {incident.status !== "resolved" && incident.status !== "closed" && (
              <form
                action={replyAction}
                className="rounded-xl border border-[#e2e6eb] bg-white p-5"
              >
                <h2 className="font-bold">Send Follow-Up</h2>

                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Provide additional information or reply to the technical team..."
                  className="mt-4 w-full rounded-md border border-[#d8dde5] p-3 text-sm"
                />

                <button
                  type="submit"
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#181818] text-sm font-semibold text-white"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              {incident.status === "resolved" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <Clock3 className="h-5 w-5" />
              )}

              <h2 className="mt-4 font-bold capitalize">
                {incident.status.replaceAll("_", " ")}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                {incident.status === "waiting_for_user"
                  ? "The technical team requires additional information from your organization."
                  : incident.status === "resolved"
                    ? "The technical team has marked this issue as resolved."
                    : "Your request is being handled by the technical team."}
              </p>
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
