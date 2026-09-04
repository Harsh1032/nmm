"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ApplicationDecisionState = {
  error?: string;
  success?: string;
  status?: string;
};

export async function updateApplicationStatus(
  applicationId: string,
  _previousState: ApplicationDecisionState,
  formData: FormData
): Promise<ApplicationDecisionState> {
  const { user } = await requireRole(["admin"]);

  const status = String(
    formData.get("status") ?? ""
  );

  const reviewNotes = String(
    formData.get("reviewNotes") ?? ""
  ).trim();

  const decisionReason = String(
    formData.get("decisionReason") ?? ""
  ).trim();

  const allowedStatuses = [
    "under_review",
    "more_information_required",
    "approved",
    "rejected",
  ];

  if (!allowedStatuses.includes(status)) {
    return {
      error: "Invalid application status.",
    };
  }

  if (
    (
      status === "more_information_required" ||
      status === "rejected"
    ) &&
    !decisionReason
  ) {
    return {
      error:
        "Applicant feedback / reason is required for this decision.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("migration_applications")
    .update({
      status,
      review_notes:
        reviewNotes || null,
      decision_reason:
        decisionReason || null,
      reviewed_by:
        user.id,
      reviewed_at:
        new Date().toISOString(),
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (error) {
    console.error(
      "Application status update:",
      error
    );

    return {
      error:
        "Unable to update application.",
    };
  }

  revalidatePath(
    `/technical/applications/${applicationId}`
  );

  revalidatePath(
    "/technical/applications"
  );

  revalidatePath(
    "/employer/applications"
  );

  revalidatePath(
    "/employer/workers"
  );

  revalidatePath(
    "/employee/applications"
  );

  revalidatePath(
    "/employee/dashboard"
  );

  revalidatePath(
    "/applications"
  );

  revalidatePath(
    "/dashboard"
  );

  const messages: Record<string, string> = {
    under_review:
      "Application marked as under review.",
    more_information_required:
      "More information has been requested from the applicant.",
    approved:
      "Application approved successfully.",
    rejected:
      "Application rejected.",
  };

  return {
    success:
      messages[status] ??
      "Application updated successfully.",
    status,
  };
}