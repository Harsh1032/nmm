"use client";

import {
  Download,
  FileText,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function getFilename(
  disposition: string | null,
  fallback: string,
) {
  if (!disposition) {
    return fallback;
  }

  const match = disposition.match(
    /filename="?([^"]+)"?/i,
  );

  return match?.[1] || fallback;
}

async function downloadFile(
  url: string,
  fallbackFilename: string,
) {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    let message =
      "Unable to generate the requested file.";

    try {
      const body = await response.json();

      if (body?.error) {
        message = body.error;
      }
    } catch {
      // Response was not JSON.
    }

    throw new Error(message);
  }

  const blob = await response.blob();

  const filename = getFilename(
    response.headers.get(
      "Content-Disposition",
    ),
    fallbackFilename,
  );

  const objectUrl =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = objectUrl;
  anchor.download = filename;

  document.body.appendChild(anchor);

  anchor.click();

  anchor.remove();

  URL.revokeObjectURL(objectUrl);
}

export default function DashboardReportActions() {
  const [exporting, setExporting] =
    useState(false);

  const [generating, setGenerating] =
    useState(false);

  async function handleExport() {
    if (exporting || generating) {
      return;
    }

    setExporting(true);

    const loadingToast =
      toast.loading(
        "Preparing application export...",
      );

    try {
      await downloadFile(
        "/api/reports/applications/export",
        "migration-applications.csv",
      );

      toast.success(
        "Application data exported successfully.",
        {
          id: loadingToast,
        },
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to export application data.",
        {
          id: loadingToast,
        },
      );
    } finally {
      setExporting(false);
    }
  }

  async function handleGenerateReport() {
    if (exporting || generating) {
      return;
    }

    setGenerating(true);

    const loadingToast =
      toast.loading(
        "Generating executive migration report...",
      );

    try {
      await downloadFile(
        "/api/reports/applications/executive",
        "executive-migration-report.pdf",
      );

      toast.success(
        "Executive report generated successfully.",
        {
          id: loadingToast,
        },
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to generate executive report.",
        {
          id: loadingToast,
        },
      );
    } finally {
      setGenerating(false);
    }
  }

  const busy =
    exporting || generating;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleExport}
        disabled={busy}
        className="inline-flex h-10 min-w-32 items-center justify-center gap-2 rounded-md border border-[#d9dee6] bg-white px-4 text-xs font-medium text-[#202124] transition hover:bg-[#f8f9fa] disabled:cursor-not-allowed disabled:opacity-55"
      >
        {exporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Export Data
          </>
        )}
      </button>

      <button
        type="button"
        onClick={
          handleGenerateReport
        }
        disabled={busy}
        className="inline-flex h-10 min-w-38 items-center justify-center gap-2 rounded-md bg-[#181818] px-4 text-xs font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-55"
      >
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FileText className="h-4 w-4" />
            Generate Report
          </>
        )}
      </button>
    </div>
  );
}