"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function replyToEmployerSupportRequest(
  incidentId: string,
  formData: FormData,
) {
  const { user } = await requireRole(["employer"]);

  const message = String(formData.get("message") ?? "").trim();

  if (!message) {
    throw new Error("Enter a message before submitting.");
  }

  const supabase = await createClient();

  /*
   * Security check:
   * make sure this support ticket actually belongs
   * to the logged-in employer representative.
   */
  const { data: incident } = await supabase
    .from("support_incidents")
    .select(
      `
        id,
        reported_by,
        status
      `,
    )
    .eq("id", incidentId)
    .eq("reported_by", user.id)
    .single();

  if (!incident) {
    throw new Error("Support request not found.");
  }

  if (incident.status === "resolved" || incident.status === "closed") {
    throw new Error("This support request is already closed.");
  }

  const { error: messageError } = await supabase
    .from("support_messages")
    .insert({
      incident_id: incidentId,

      author_user_id: user.id,
      author_role: "employer",

      message,

      is_internal: false,
    });

  if (messageError) {
    console.error("Employer support reply:", messageError);

    throw new Error("Unable to send your message.");
  }

  /*
   * Once the employer responds,
   * put the ticket back into progress.
   */
  await supabase
    .from("support_incidents")
    .update({
      status: "in_progress",
      updated_at: new Date().toISOString(),
    })
    .eq("id", incidentId);

  revalidatePath(`/employer/support/${incidentId}`);

  revalidatePath("/employer/support");

  revalidatePath(`/technical/support/${incidentId}`);

  revalidatePath("/technical/support");
}
