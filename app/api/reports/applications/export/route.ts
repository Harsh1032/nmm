import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function escapeCsv(
  value: unknown,
) {
  const text = String(
    value ?? "",
  );

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\n")
  ) {
    return `"${text.replaceAll(
      '"',
      '""',
    )}"`;
  }

  return text;
}

export async function GET() {
  await requireRole(["ministry"]);

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from(
        "migration_applications",
      )
      .select(`
        application_number,
        full_name,
        nationality,
        applicant_type,
        application_category,
        movement_direction,
        origin_country,
        destination_country,
        destination_city,
        employer_name,
        position_title,
        visa_type,
        status,
        submitted_at
      `)
      .order("submitted_at", {
        ascending: false,
      });

  if (error) {
    console.error(
      "CSV export error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to export application data.",
      },
      {
        status: 500,
      },
    );
  }

  const headers = [
    "Application Number",
    "Full Name",
    "Nationality",
    "Submitted By",
    "Application Category",
    "Movement Direction",
    "Origin Country",
    "Destination Country",
    "Destination City",
    "Employer",
    "Position",
    "Visa Type",
    "Status",
    "Submitted At",
  ];

  const rows = (data ?? []).map(
    (application) => [
      application.application_number,
      application.full_name,
      application.nationality,
      application.applicant_type,
      application.application_category,
      application.movement_direction ??
        "refugee",
      application.origin_country,
      application.destination_country,
      application.destination_city,
      application.employer_name,
      application.position_title,
      application.visa_type,
      application.status,
      application.submitted_at,
    ],
  );

  const csv = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map(escapeCsv)
        .join(","),
    )
    .join("\n");

  const date = new Date()
    .toISOString()
    .slice(0, 10);

  return new NextResponse(
    "\uFEFF" + csv,
    {
      status: 200,

      headers: {
        "Content-Type":
          "text/csv; charset=utf-8",

        "Content-Disposition":
          `attachment; filename="migration-applications-${date}.csv"`,

        "Cache-Control":
          "no-store",
      },
    },
  );
}