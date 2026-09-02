"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

export type EmployerSupportState = {
  error?: string;
  success?: string;
};

export async function submitEmployerSupportRequest(
  _previousState: EmployerSupportState,
  formData: FormData
): Promise<EmployerSupportState> {
  const { user, profile } =
    await requireRole(["employer"]);

  if (!profile.employer_id) {
    return {
      error:
        "This account is not linked to an organization.",
    };
  }

  const category = String(
    formData.get("category") ?? ""
  ).trim();

  const description = String(
    formData.get("description") ?? ""
  ).trim();

  const severity = String(
    formData.get("severity") ?? "low"
  );

  if (!category || !description) {
    return {
      error:
        "Select a category and describe the support required.",
    };
  }

  if (
    !["low", "medium", "critical"].includes(
      severity
    )
  ) {
    return {
      error: "Invalid severity level.",
    };
  }

  const supabase = await createClient();

  const reference = `SUP-${randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;

  const { error } = await supabase
    .from("support_incidents")
    .insert({
      reference_number: reference,
      reported_by: user.id,

      employer_id:
        profile.employer_id,

      category,
      description,
      severity,
      status: "open",
    });

  if (error) {
    console.error(error);

    return {
      error:
        "Support request could not be submitted.",
    };
  }

  revalidatePath(
    "/employer/support"
  );

  return {
    success:
      `Support request ${reference} submitted successfully.`,
  };
}