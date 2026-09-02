"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";

function applicationNumber() {
  return `APP-${new Date().getFullYear()}-${randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;
}

export async function submitEmployerApplication(
  formData: FormData
) {
  const { user, profile } =
    await requireRole(["employer"]);

  if (!profile.employer_id) {
    throw new Error(
      "This account is not linked to an employer."
    );
  }

  const supabase = await createClient();

  const applicationType = String(
    formData.get("applicationType") ?? ""
  );

  if (
    !["outbound", "inbound", "refugee"].includes(
      applicationType
    )
  ) {
    throw new Error(
      "Select a valid application type."
    );
  }

  const applicationCategory =
    applicationType === "refugee"
      ? "refugee"
      : "employment";

  const movementDirection: "inbound" | "outbound" | null =
    applicationType === "refugee"
      ? null
      : (applicationType as "inbound" | "outbound");

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
    !originCountry
  ) {
    throw new Error(
      "Required application information is missing."
    );
  }

  if (
    applicationCategory === "employment" &&
    !destinationCountry
  ) {
    throw new Error(
      "Destination country is required for employment applications."
    );
  }

  const { error } = await supabase
    .from("migration_applications")
    .insert({
      application_number: applicationNumber(),

      submitted_by_user_id: user.id,

      employer_id: profile.employer_id,

      applicant_type: "employer",

      application_category: applicationCategory,

      movement_direction: movementDirection,

      full_name: fullName,
      nationality,
      passport_number: passportNumber,

      origin_country: originCountry,

      destination_country:
        destinationCountry || null,

      destination_city:
        destinationCity || null,

      employer_name:
        profile.organization_name || null,

      position_title:
        applicationCategory === "employment"
          ? positionTitle || null
          : null,

      visa_type:
        visaType || null,

      status: "submitted",

      submitted_at:
        new Date().toISOString(),
    });

  if (error) {
    console.error(error);

    throw new Error(
      "Unable to submit worker application."
    );
  }

  redirect("/employer/applications");
}