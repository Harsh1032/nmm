"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type TechnicalSupportReplyState = {
  success?: string;
  error?: string;
};

export async function replyToSupportRequest(
  incidentId: string,
  _previousState: TechnicalSupportReplyState,
  formData: FormData
): Promise<TechnicalSupportReplyState> {
  const { user } =
    await requireRole(["admin"]);

  const message = String(
    formData.get("message") ?? ""
  ).trim();

  const status = String(
    formData.get("status") ?? "in_progress"
  );

  if (!message) {
    return {
      error:
        "Enter a response before sending.",
    };
  }

  const allowedStatuses = [
    "in_progress",
    "waiting_for_user",
    "resolved",
    "closed",
  ];

  if (!allowedStatuses.includes(status)) {
    return {
      error: "Invalid support status.",
    };
  }

  const supabase =
    await createClient();

  const {
    data: incident,
    error: lookupError,
  } = await supabase
    .from("support_incidents")
    .select(`
      id,
      status
    `)
    .eq("id", incidentId)
    .single();

  if (
    lookupError ||
    !incident
  ) {
    console.error(
      "Support incident lookup error:",
      lookupError
    );

    return {
      error:
        "Support request could not be found.",
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
        "admin",

      message,

      is_internal:
        false,
    });

  if (messageError) {
    console.error(
      "Technical response error:",
      messageError
    );

    return {
      error:
        "The response could not be sent.",
    };
  }

  const {
    error: updateError,
  } = await supabase
    .from("support_incidents")
    .update({
      status,

      assigned_to:
        user.id,

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
      "Support status update:",
      updateError
    );

    return {
      error:
        "The response was sent, but the request status could not be updated.",
    };
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

  return {
    success:
      status === "waiting_for_user"
        ? "Response sent. Additional information has been requested."
        : status === "resolved"
          ? "Response sent and support request marked as resolved."
          : status === "closed"
            ? "Response sent and support request closed."
            : "Response sent successfully.",
  };
}