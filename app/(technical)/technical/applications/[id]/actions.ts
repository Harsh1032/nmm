"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateApplicationStatus(
  applicationId: string,
  formData: FormData
) {
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
    throw new Error("Invalid application status.");
  }

  if (
    (status === "more_information_required" ||
      status === "rejected") &&
    !decisionReason
  ) {
    throw new Error(
      "A reason is required for this decision."
    );
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("migration_applications")
    .update({
      status,
      review_notes: reviewNotes || null,
      decision_reason: decisionReason || null,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (error) {
    console.error(error);
    throw new Error(
      "Unable to update application."
    );
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
    "/employee/applications"
  );
}