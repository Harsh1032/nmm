"use server";

import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

export type BulkWorkerRow = {
  fullName: string;
  nationality: string;
  passportNumber: string;
  applicationType: "outbound" | "inbound" | "refugee";
  originCountry: string;
  destinationCountry: string;
  destinationCity: string;
  positionTitle: string;
  visaType: string;
};

export type BulkImportState = {
  error?: string;
  success?: string;
  inserted?: number;
};

function applicationNumber() {
  return `APP-${new Date().getFullYear()}-${randomUUID()
    .slice(0, 8)
    .toUpperCase()}`;
}

export async function submitBulkWorkerApplications(
  _previousState: BulkImportState,
  formData: FormData
): Promise<BulkImportState> {
  const { user, profile } =
    await requireRole(["employer"]);

  if (!profile.employer_id) {
    return {
      error:
        "This account is not linked to an organization.",
    };
  }

  const rawRows = String(
    formData.get("rows") ?? ""
  );

  if (!rawRows) {
    return {
      error: "No worker records were submitted.",
    };
  }

  let rows: BulkWorkerRow[];

  try {
    rows = JSON.parse(rawRows);
  } catch {
    return {
      error: "The uploaded worker data is invalid.",
    };
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      error: "No worker records were found.",
    };
  }

  // Good demo protection against accidentally uploading
  // extremely large files.
  if (rows.length > 200) {
    return {
      error:
        "A maximum of 200 worker records can be uploaded at once.",
    };
  }

  const validApplicationTypes = [
    "outbound",
    "inbound",
    "refugee",
  ];

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    if (
      !row.fullName ||
      !row.nationality ||
      !row.passportNumber ||
      !row.originCountry ||
      !validApplicationTypes.includes(
        row.applicationType
      )
    ) {
      return {
        error:
          `Row ${index + 2} contains invalid or missing required information.`,
      };
    }

    if (
      row.applicationType !== "refugee" &&
      !row.destinationCountry
    ) {
      return {
        error:
          `Row ${index + 2}: destination country is required for employment applications.`,
      };
    }
  }

  const supabase = await createClient();

  const organizationName =
    profile.organization_name ||
    "Registered Employer";

  const now = new Date().toISOString();

  const records = rows.map((row) => {
    const applicationCategory =
      row.applicationType === "refugee"
        ? "refugee"
        : "employment";

    const movementDirection:
      | "inbound"
      | "outbound"
      | null =
      row.applicationType === "refugee"
        ? null
        : row.applicationType;

    return {
      application_number:
        applicationNumber(),

      submitted_by_user_id:
        user.id,

      // IMPORTANT:
      // Taken from authenticated profile,
      // not from uploaded Excel.
      employer_id:
        profile.employer_id,

      applicant_type:
        "employer",

      application_category:
        applicationCategory,

      movement_direction:
        movementDirection,

      full_name:
        row.fullName.trim(),

      nationality:
        row.nationality.trim(),

      passport_number:
        row.passportNumber.trim(),

      origin_country:
        row.originCountry.trim(),

      destination_country:
        row.destinationCountry?.trim() ||
        null,

      destination_city:
        row.destinationCity?.trim() ||
        null,

      employer_name:
        organizationName,

      position_title:
        applicationCategory === "employment"
          ? row.positionTitle?.trim() || null
          : null,

      visa_type:
        row.visaType?.trim() || null,

      status:
        "submitted",

      submitted_at:
        now,
    };
  });

  const { error } = await supabase
    .from("migration_applications")
    .insert(records);

  if (error) {
    console.error(
      "Bulk application insert error:",
      error
    );

    return {
      error:
        "The worker applications could not be submitted.",
    };
  }

  revalidatePath(
    "/employer/dashboard"
  );

  revalidatePath(
    "/employer/applications"
  );

  revalidatePath(
    "/employer/workers"
  );

  // Ministry inbox
  revalidatePath(
    "/applications"
  );

  return {
    success:
      `${records.length} worker applications were submitted to the Ministry for review.`,
    inserted:
      records.length,
  };
}