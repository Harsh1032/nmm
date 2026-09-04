"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

export type IndividualApplicationState = {
  error?: string;
  success?: string;
};

function applicationNumber() {
  return `APP-${new Date().getFullYear()}-${randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;
}

export async function submitIndividualApplication(
  _previousState: IndividualApplicationState,
  formData: FormData
): Promise<IndividualApplicationState> {
  const { user } =
    await requireRole(["employee"]);

  const supabase =
    await createClient();

  const applicationType = String(
    formData.get("applicationType") ?? ""
  );

  if (
    !["outbound", "inbound", "refugee"].includes(
      applicationType
    )
  ) {
    return {
      error:
        "Select a valid application type.",
    };
  }

  const applicationCategory =
    applicationType === "refugee"
      ? "refugee"
      : "employment";

  const movementDirection =
    applicationType === "refugee"
      ? null
      : applicationType;

  const fullName = String(
    formData.get("fullName") ?? ""
  ).trim();

  const nationality = String(
    formData.get("nationality") ?? ""
  ).trim();

  const passportNumber = String(
    formData.get("passportNumber") ?? ""
  ).trim();

  const originCountry = String(
    formData.get("originCountry") ?? ""
  ).trim();

  const destinationCountry = String(
    formData.get("destinationCountry") ?? ""
  ).trim();

  const destinationCity = String(
    formData.get("destinationCity") ?? ""
  ).trim();

  const employerName = String(
    formData.get("employerName") ?? ""
  ).trim();

  const positionTitle = String(
    formData.get("positionTitle") ?? ""
  ).trim();

  const visaType = String(
    formData.get("visaType") ?? ""
  ).trim();

  if (
    !fullName ||
    !nationality ||
    !passportNumber ||
    !originCountry ||
    !destinationCountry
  ) {
    return {
      error:
        "Complete all required application fields.",
    };
  }

  const reference =
    applicationNumber();

  const { error } = await supabase
    .from("migration_applications")
    .insert({
      application_number:
        reference,

      applicant_user_id:
        user.id,

      submitted_by_user_id:
        user.id,

      applicant_type:
        "individual",

      application_category:
        applicationCategory,

      movement_direction:
        movementDirection,

      full_name:
        fullName,

      nationality,

      passport_number:
        passportNumber,

      origin_country:
        originCountry,

      destination_country:
        destinationCountry,

      destination_city:
        destinationCity || null,

      employer_name:
        employerName || null,

      position_title:
        positionTitle || null,

      visa_type:
        visaType || null,

      status:
        "submitted",

      submitted_at:
        new Date().toISOString(),
    });

  if (error) {
    console.error(
      "Individual application:",
      error
    );

    return {
      error:
        "Unable to submit your application.",
    };
  }

  revalidatePath(
    "/employee/dashboard"
  );

  revalidatePath(
    "/employee/applications"
  );

  revalidatePath(
    "/technical/applications"
  );

  revalidatePath(
    "/applications"
  );

  revalidatePath(
    "/dashboard"
  );

  return {
    success:
      `Application ${reference} submitted successfully.`,
  };
}