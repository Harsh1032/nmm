import { requireRole } from "@/lib/auth/requireRole";
import { createClient } from "@/lib/supabase/server";
import PDFDocument from "pdfkit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Application = {
  application_number: string;
  applicant_type: string | null;
  application_category: string | null;
  movement_direction: string | null;

  full_name: string;
  nationality: string;

  origin_country: string | null;

  destination_country: string | null;

  destination_city: string | null;

  employer_name: string | null;

  position_title: string | null;

  visa_type: string | null;

  status: string;

  submitted_at: string | null;

  created_at: string;
};

function formatLabel(value: string | null) {
  if (!value) {
    return "Not specified";
  }

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function percentage(value: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function createPdfBuffer(applications: Application[]) {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      bufferPages: true,
      margins: {
        top: 48,
        bottom: 48,
        left: 48,
        right: 48,
      },

      info: {
        Title: "Executive Migration Report",

        Author: "National Migration Monitor",

        Subject: "National migration application activity",
      },
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));

    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", reject);

    const total = applications.length;

    const submitted = applications.filter(
      (item) => item.status === "submitted",
    ).length;

    const underReview = applications.filter(
      (item) => item.status === "under_review" || item.status === "in_review",
    ).length;

    const approved = applications.filter(
      (item) => item.status === "approved",
    ).length;

    const rejected = applications.filter(
      (item) => item.status === "rejected",
    ).length;

    const moreInformation = applications.filter(
      (item) =>
        item.status === "more_information_required" ||
        item.status === "needs_information",
    ).length;

    const employerSubmissions = applications.filter(
      (item) => item.applicant_type === "employer",
    ).length;

    const individualSubmissions = total - employerSubmissions;

    const refugeeApplications = applications.filter(
      (item) =>
        item.application_category === "refugee" ||
        item.movement_direction === null,
    ).length;

    const employmentApplications = total - refugeeApplications;

    const nationalityMap = new Map<string, number>();

    for (const application of applications) {
      const nationality = application.nationality || "Unknown";

      nationalityMap.set(
        nationality,
        (nationalityMap.get(nationality) ?? 0) + 1,
      );
    }

    const topNationalities = Array.from(nationalityMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    /*
     * Helpers
     */

    const contentWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;

    function ensureSpace(height: number) {
      if (doc.y + height > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
      }
    }

    function sectionTitle(title: string) {
      ensureSpace(50);

      doc
        .moveDown(0.8)
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#667085")
        .text(title.toUpperCase(), {
          characterSpacing: 1.2,
        });

      doc
        .moveDown(0.4)
        .strokeColor("#D9DEE6")
        .lineWidth(0.7)
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.width - doc.page.margins.right, doc.y)
        .stroke();

      doc.moveDown(0.8);
    }

    function metric(
      x: number,
      y: number,
      width: number,
      label: string,
      value: string,
    ) {
      doc
        .roundedRect(x, y, width, 68, 5)
        .strokeColor("#DFE3E8")
        .lineWidth(0.7)
        .stroke();

      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor("#667085")
        .text(label.toUpperCase(), x + 12, y + 12, {
          width: width - 24,
        });

      doc
        .font("Helvetica-Bold")
        .fontSize(21)
        .fillColor("#202124")
        .text(value, x + 12, y + 31, {
          width: width - 24,
        });
    }

    function statRow(label: string, value: number, totalValue = total) {
      ensureSpace(30);

      const rowY = doc.y;

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#344054")
        .text(label, doc.page.margins.left, rowY);

      doc
        .font("Helvetica-Bold")
        .text(
          `${value} (${percentage(value, totalValue)}%)`,
          doc.page.width - doc.page.margins.right - 110,
          rowY,
          {
            width: 110,
            align: "right",
          },
        );

      doc.y = rowY + 18;
    }

    /*
     * Header
     */

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#667085")
      .text("NATIONAL MIGRATION MONITOR", {
        characterSpacing: 1.6,
      });

    doc
      .moveDown(0.5)
      .fontSize(25)
      .fillColor("#181818")
      .text("Executive Migration Report");

    doc
      .moveDown(0.3)
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#667085")
      .text(
        "National migration application activity and government processing overview.",
      );

    doc.moveDown(0.8);

    const metadataY = doc.y;

    doc
      .fontSize(8)
      .fillColor("#667085")
      .text(
        `Generated: ${formatDate(new Date().toISOString())}`,
        doc.page.margins.left,
        metadataY,
      );

    doc.text(
      "Classification: Executive Read-Only",
      doc.page.margins.left + 260,
      metadataY,
      {
        width: contentWidth - 260,
        align: "right",
      },
    );

    doc.y = metadataY + 26;

    doc
      .strokeColor("#202124")
      .lineWidth(1.2)
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke();

    doc.moveDown(1);

    /*
     * Executive summary
     */

    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#202124")
      .text("Executive Summary");

    doc
      .moveDown(0.4)
      .font("Helvetica")
      .fontSize(9.5)
      .fillColor("#475467")
      .text(
        total === 0
          ? "No migration applications are currently recorded in the National Migration Monitor."
          : `The system currently contains ${total} migration applications. ${approved} have been approved, while ${submitted + underReview + moreInformation} remain within the government processing workflow. Registered employers account for ${percentage(
              employerSubmissions,
              total,
            )}% of all submissions.`,
        {
          lineGap: 3,
        },
      );

    doc.moveDown(1);

    /*
     * KPI boxes
     */

    const gap = 10;

    const metricWidth = (contentWidth - gap * 3) / 4;

    const metricY = doc.y;

    metric(
      doc.page.margins.left,
      metricY,
      metricWidth,
      "Total Applications",
      String(total),
    );

    metric(
      doc.page.margins.left + metricWidth + gap,
      metricY,
      metricWidth,
      "Pending",
      String(submitted + underReview + moreInformation),
    );

    metric(
      doc.page.margins.left + (metricWidth + gap) * 2,
      metricY,
      metricWidth,
      "Approved",
      String(approved),
    );

    metric(
      doc.page.margins.left + (metricWidth + gap) * 3,
      metricY,
      metricWidth,
      "Rejected",
      String(rejected),
    );

    doc.y = metricY + 78;

    /*
     * Processing status
     */

    sectionTitle("Application Processing Status");

    statRow("Submitted", submitted);

    statRow("Under Review", underReview);

    statRow("More Information Required", moreInformation);

    statRow("Approved", approved);

    statRow("Rejected", rejected);

    /*
     * Submission source
     */

    sectionTitle("Submission Source");

    statRow("Registered Employers", employerSubmissions);

    statRow("Individuals", individualSubmissions);

    /*
     * Application type
     */

    sectionTitle("Application Type");

    statRow("Employment / Labour Migration", employmentApplications);

    statRow("Refugee / Humanitarian Protection", refugeeApplications);

    /*
     * Nationalities
     */

    sectionTitle("Leading Nationalities");

    if (topNationalities.length) {
      for (let index = 0; index < topNationalities.length; index++) {
        const [nationality, count] = topNationalities[index];

        ensureSpace(28);

        const y = doc.y;

        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor("#202124")
          .text(`${index + 1}. ${nationality}`, doc.page.margins.left, y);

        doc
          .font("Helvetica")
          .fillColor("#667085")
          .text(
            `${count} applications - ${percentage(count, total)}%`,
            doc.page.width - doc.page.margins.right - 150,
            y,
            {
              width: 150,
              align: "right",
            },
          );

        doc.y = y + 20;
      }
    } else {
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#667085")
        .text("No nationality data available.");
    }

    /*
     * Recent applications
     */

    sectionTitle("Recent Applications");

    const recent = applications.slice(0, 10);

    if (!recent.length) {
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#667085")
        .text("No applications are available.");
    } else {
      for (const application of recent) {
        ensureSpace(60);

        const rowY = doc.y;

        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor("#202124")
          .text(application.full_name, doc.page.margins.left, rowY, {
            width: 160,
          });

        doc
          .font("Helvetica")
          .fontSize(7.5)
          .fillColor("#667085")
          .text(
            `${application.application_number} | ${application.nationality}`,
            doc.page.margins.left,
            rowY + 14,
            {
              width: 180,
            },
          );

        const route = [
          application.origin_country,
          application.destination_country,
        ]
          .filter(Boolean)
          .join(" -> ");

        doc
          .fontSize(8)
          .fillColor("#475467")
          .text(
            route || "Route not recorded",
            doc.page.margins.left + 190,
            rowY,
            {
              width: 170,
            },
          );

        doc
          .font("Helvetica-Bold")
          .fillColor("#202124")
          .text(
            formatLabel(application.status),
            doc.page.width - doc.page.margins.right - 105,
            rowY,
            {
              width: 105,
              align: "right",
            },
          );

        doc.y = rowY + 42;

        doc
          .strokeColor("#EDF0F3")
          .lineWidth(0.5)
          .moveTo(doc.page.margins.left, doc.y)
          .lineTo(doc.page.width - doc.page.margins.right, doc.y)
          .stroke();

        doc.y += 10;
      }
    }

    /*
     * Footer
     */

    const pageRange = doc.bufferedPageRange();

    for (let index = 0; index < pageRange.count; index++) {
      doc.switchToPage(pageRange.start + index);

      const footerY = doc.page.height - 30;

      doc
        .font("Helvetica")
        .fontSize(7)
        .fillColor("#98A2B3")
        .text(
          "National Migration Monitor - Executive Read-Only Report",
          doc.page.margins.left,
          footerY,
          {
            width: 350,
          },
        );

      doc.text(
        `Page ${index + 1} of ${pageRange.count}`,
        doc.page.width - doc.page.margins.right - 100,
        footerY,
        {
          width: 100,
          align: "right",
        },
      );
    }

    doc.end();
  });
}

export async function GET() {
  await requireRole(["ministry"]);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("migration_applications")
    .select(
      `
        application_number,
        applicant_type,
        application_category,
        movement_direction,
        full_name,
        nationality,
        origin_country,
        destination_country,
        destination_city,
        employer_name,
        position_title,
        visa_type,
        status,
        submitted_at,
        created_at
      `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Executive PDF report:", error);

    return NextResponse.json(
      {
        error: "Unable to load migration data for the executive report.",
      },
      {
        status: 500,
      },
    );
  }

  try {
    const pdf = await createPdfBuffer((data ?? []) as Application[]);

    const date = new Date().toISOString().slice(0, 10);

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,

      headers: {
        "Content-Type": "application/pdf",

        "Content-Disposition": `attachment; filename="executive-migration-report-${date}.pdf"`,

        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    return NextResponse.json(
      {
        error: "The executive report could not be generated.",
      },
      {
        status: 500,
      },
    );
  }
}
