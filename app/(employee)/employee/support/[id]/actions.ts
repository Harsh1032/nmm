"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type EmployeeSupportReplyState = {
  error?: string;
  success?: string;
};

export async function replyToEmployeeSupportRequest(
  incidentId: string,
  _previousState: EmployeeSupportReplyState,
  formData: FormData
): Promise<EmployeeSupportReplyState> {
  const { user } =
    await requireRole(["employee"]);

  const message = String(
    formData.get("message") ?? ""
  ).trim();

  if (!message) {
    return {
      error:
        "Enter a message before sending.",
    };
  }

  const supabase =
    await createClient();

  /*
   * Verify that this ticket belongs
   * to this employee.
   */
  const {
    data: incident,
    error: incidentLookupError,
  } = await supabase
    .from("support_incidents")
    .select(`
      id,
      reported_by,
      status
    `)
    .eq("id", incidentId)
    .eq("reported_by", user.id)
    .single();

  if (
    incidentLookupError ||
    !incident
  ) {
    return {
      error:
        "Support request not found.",
    };
  }

  if (
    incident.status === "resolved" ||
    incident.status === "closed"
  ) {
    return {
      error:
        "This support request is already closed.",
    };
  }

  const {
    error: messageError,
  } = await supabase
    .from("support_messages")
    .insert({
      incident_id:
        incidentId,

      author_user_id:
        user.id,

      author_role:
        "employee",

      message,

      is_internal:
        false,
    });

  if (messageError) {
    console.error(
      "Employee support reply:",
      messageError
    );

    return {
      error:
        "Unable to send your message.",
    };
  }

  /*
   * If technical team was waiting for the user,
   * employee's reply returns ticket to processing.
   */
  const {
    error: updateError,
  } = await supabase
    .from("support_incidents")
    .update({
      status:
        "in_progress",

      updated_at:
        new Date().toISOString(),
    })
    .eq("id", incidentId)
    .eq(
      "reported_by",
      user.id
    );

  if (updateError) {
    console.error(
      "Employee support status update:",
      updateError
    );
  }

  revalidatePath(
    `/employee/support/${incidentId}`
  );

  revalidatePath(
    "/employee/support"
  );

  revalidatePath(
    `/technical/support/${incidentId}`
  );

  revalidatePath(
    "/technical/support"
  );

  return {
    success:
      "Message sent successfully.",
  };
}