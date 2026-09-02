"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function replyToSupportRequest(
  incidentId: string,
  formData: FormData
) {
  const { user } = await requireRole(["admin"]);

  const message = String(
    formData.get("message") ?? ""
  ).trim();

  const status = String(
    formData.get("status") ?? "in_progress"
  );

  if (!message) {
    throw new Error(
      "Enter a response before submitting."
    );
  }

  const allowedStatuses = [
    "in_progress",
    "waiting_for_user",
    "resolved",
    "closed",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error(
      "Invalid support status."
    );
  }

  const supabase = await createClient();

  /*
   * Make sure the ticket exists.
   */
  const {
    data: incident,
    error: incidentLookupError,
  } = await supabase
    .from("support_incidents")
    .select(`
      id,
      status
    `)
    .eq("id", incidentId)
    .single();

  if (
    incidentLookupError ||
    !incident
  ) {
    console.error(
      "Incident lookup error:",
      incidentLookupError
    );

    throw new Error(
      "Support request could not be found."
    );
  }

  /*
   * Insert technical response.
   *
   * IMPORTANT:
   * Your DB uses author_user_id,
   * not sender_user_id.
   */
const { error: messageError } = await supabase
  .from("support_messages")
  .insert({
    incident_id: incidentId,
    author_user_id: user.id,
    author_role: "admin",
    message,
    is_internal: false,
  });

  if (messageError) {
    console.error(
      "TECHNICAL MESSAGE INSERT ERROR:",
      JSON.stringify(
        messageError,
        null,
        2
      )
    );

    throw new Error(
      `Unable to send response: ${messageError.message}`
    );
  }

  /*
   * Update ticket workflow status.
   */
  const {
    error: updateError,
  } = await supabase
    .from("support_incidents")
    .update({
      status,
      assigned_to: user.id,
      updated_at:
        new Date().toISOString(),

      resolved_at:
        status === "resolved"
          ? new Date().toISOString()
          : null,
    })
    .eq("id", incidentId);

  if (updateError) {
    console.error(
      "SUPPORT STATUS UPDATE ERROR:",
      JSON.stringify(
        updateError,
        null,
        2
      )
    );

    throw new Error(
      `Response was saved, but ticket status could not be updated: ${updateError.message}`
    );
  }

  revalidatePath(
    `/technical/support/${incidentId}`
  );

  revalidatePath(
    "/technical/support"
  );

  revalidatePath(
    `/employer/support/${incidentId}`
  );

  revalidatePath(
    "/employer/support"
  );

  revalidatePath(
    `/employee/support/${incidentId}`
  );

  revalidatePath(
    "/employee/support"
  );
}