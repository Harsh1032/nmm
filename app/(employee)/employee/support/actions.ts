"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

export type EmployeeSupportState = {
  error?: string;
  success?: string;
};

export async function submitEmployeeSupportRequest(
  _previousState: EmployeeSupportState,
  formData: FormData
): Promise<EmployeeSupportState> {
  const { user } =
    await requireRole(["employee"]);

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
        "Select a category and describe the support you need.",
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

  const supabase =
    await createClient();

  const reference = `SUP-${randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;

  const { error } =
    await supabase
      .from("support_incidents")
      .insert({
        reference_number:
          reference,

        reported_by:
          user.id,

        employer_id:
          null,

        category,
        description,
        severity,

        status:
          "open",
      });

  if (error) {
    console.error(
      "Employee support request:",
      error
    );

    return {
      error:
        "The support request could not be submitted.",
    };
  }

  revalidatePath(
    "/employee/support"
  );

  revalidatePath(
    "/technical/support"
  );

  return {
    success:
      `Support request ${reference} submitted successfully.`,
  };
}