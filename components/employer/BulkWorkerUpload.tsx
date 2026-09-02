"use client";

import {
  submitBulkWorkerApplications,
  type BulkImportState,
  type BulkWorkerRow,
} from "@/app/(employer)/employer/applications/import/actions";
import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import * as XLSX from "xlsx";

type PreviewRow =
  BulkWorkerRow & {
    rowNumber: number;
    errors: string[];
  };

const initialState: BulkImportState = {};

const REQUIRED_HEADERS = [
  "Full Name",
  "Nationality",
  "Passport Number",
  "Application Type",
  "Origin Country",
  "Destination Country",
  "Destination City",
  "Position / Job Title",
  "Visa Type",
];

function normalizeApplicationType(
  value: unknown
):
  | "outbound"
  | "inbound"
  | "refugee"
  | null {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();

  if (
    normalized === "outbound" ||
    normalized ===
      "going abroad for employment"
  ) {
    return "outbound";
  }

  if (
    normalized === "inbound" ||
    normalized ===
      "entering the country for employment"
  ) {
    return "inbound";
  }

  if (
    normalized === "refugee" ||
    normalized ===
      "refugee / humanitarian protection"
  ) {
    return "refugee";
  }

  return null;
}

export default function BulkWorkerUpload() {
  const router = useRouter();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [state, action, pending] =
    useActionState(
      submitBulkWorkerApplications,
      initialState
    );

  const [fileName, setFileName] =
    useState("");

  const [rows, setRows] = useState<
    PreviewRow[]
  >([]);

  const [fileError, setFileError] =
    useState("");

  useEffect(() => {
    if (
      state.success &&
      state.inserted
    ) {
      const timer = setTimeout(() => {
        router.push(
          "/employer/applications"
        );

        router.refresh();
      }, 1200);

      return () =>
        clearTimeout(timer);
    }
  }, [
    state.success,
    state.inserted,
    router,
  ]);

  async function handleFile(
    file: File
  ) {
    setFileError("");
    setRows([]);
    setFileName(file.name);

    try {
      const buffer =
        await file.arrayBuffer();

      const workbook =
        XLSX.read(buffer);

      const firstSheetName =
        workbook.SheetNames[0];

      if (!firstSheetName) {
        setFileError(
          "The spreadsheet contains no worksheet."
        );
        return;
      }

      const worksheet =
        workbook.Sheets[
          firstSheetName
        ];

      const json =
        XLSX.utils.sheet_to_json<
          Record<string, unknown>
        >(worksheet, {
          defval: "",
        });

      if (!json.length) {
        setFileError(
          "The spreadsheet contains no worker records."
        );
        return;
      }

      const firstRow =
        json[0];

      const existingHeaders =
        Object.keys(firstRow);

      const missingHeaders =
        REQUIRED_HEADERS.filter(
          (header) =>
            !existingHeaders.includes(
              header
            )
        );

      if (missingHeaders.length) {
        setFileError(
          `Missing required columns: ${missingHeaders.join(
            ", "
          )}`
        );

        return;
      }

      const parsedRows: PreviewRow[] =
        json.map(
          (
            raw,
            index
          ) => {
            const errors:
              string[] = [];

            const applicationType =
              normalizeApplicationType(
                raw[
                  "Application Type"
                ]
              );

            const fullName =
              String(
                raw["Full Name"] ??
                  ""
              ).trim();

            const nationality =
              String(
                raw[
                  "Nationality"
                ] ?? ""
              ).trim();

            const passportNumber =
              String(
                raw[
                  "Passport Number"
                ] ?? ""
              ).trim();

            const originCountry =
              String(
                raw[
                  "Origin Country"
                ] ?? ""
              ).trim();

            const destinationCountry =
              String(
                raw[
                  "Destination Country"
                ] ?? ""
              ).trim();

            const destinationCity =
              String(
                raw[
                  "Destination City"
                ] ?? ""
              ).trim();

            const positionTitle =
              String(
                raw[
                  "Position / Job Title"
                ] ?? ""
              ).trim();

            const visaType =
              String(
                raw[
                  "Visa Type"
                ] ?? ""
              ).trim();

            if (!fullName) {
              errors.push(
                "Full name is required"
              );
            }

            if (!nationality) {
              errors.push(
                "Nationality is required"
              );
            }

            if (!passportNumber) {
              errors.push(
                "Passport number is required"
              );
            }

            if (!applicationType) {
              errors.push(
                "Invalid application type"
              );
            }

            if (!originCountry) {
              errors.push(
                "Origin country is required"
              );
            }

            if (
              applicationType &&
              applicationType !==
                "refugee" &&
              !destinationCountry
            ) {
              errors.push(
                "Destination country is required"
              );
            }

            return {
              rowNumber:
                index + 2,

              fullName,
              nationality,
              passportNumber,

              applicationType:
                applicationType ??
                "outbound",

              originCountry,
              destinationCountry,
              destinationCity,
              positionTitle,
              visaType,

              errors,
            };
          }
        );

      /*
       * Detect duplicate passports within
       * the uploaded spreadsheet.
       */
      const passportCounts =
        new Map<string, number>();

      parsedRows.forEach(
        (row) => {
          if (
            row.passportNumber
          ) {
            passportCounts.set(
              row.passportNumber,
              (passportCounts.get(
                row.passportNumber
              ) ?? 0) + 1
            );
          }
        }
      );

      parsedRows.forEach(
        (row) => {
          if (
            row.passportNumber &&
            (
              passportCounts.get(
                row.passportNumber
              ) ?? 0
            ) > 1
          ) {
            row.errors.push(
              "Duplicate passport number in spreadsheet"
            );
          }
        }
      );

      setRows(parsedRows);
    } catch (error) {
      console.error(
        "Excel parsing error:",
        error
      );

      setFileError(
        "Unable to read the spreadsheet. Please use a valid XLSX or XLS file."
      );
    }
  }

  const validRows =
    rows.filter(
      (row) =>
        row.errors.length === 0
    );

  const invalidRows =
    rows.filter(
      (row) =>
        row.errors.length > 0
    );

  const serializedRows =
    validRows.map(
      ({
        rowNumber,
        errors,
        ...row
      }) => row
    );

  function resetUpload() {
    setRows([]);
    setFileName("");
    setFileError("");

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  }

  return (
    <div>
      {!rows.length && (
        <>
          <label className="flex min-h-62.5 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d8dde5] bg-[#fafbfc] p-8 text-center transition hover:border-[#202124]">
            <Upload className="h-8 w-8" />

            <p className="mt-4 font-bold">
              Select Excel Spreadsheet
            </p>

            <p className="mt-2 text-xs text-[#667085]">
              XLSX or XLS files
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(event) => {
                const file =
                  event.target
                    .files?.[0];

                if (file) {
                  handleFile(file);
                }
              }}
            />
          </label>

          {fileError && (
            <div className="mt-4 flex gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {fileError}
            </div>
          )}
        </>
      )}

      {!!rows.length && (
        <>
          {/* FILE SUMMARY */}
          <div className="flex flex-col justify-between gap-4 rounded-lg border border-[#e2e6eb] bg-[#fafbfc] p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white">
                <FileSpreadsheet className="h-5 w-5" />
              </span>

              <div>
                <p className="text-sm font-bold">
                  {fileName}
                </p>

                <p className="mt-1 text-xs text-[#667085]">
                  {rows.length} worker
                  {rows.length !== 1
                    ? "s"
                    : ""}{" "}
                  detected
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetUpload}
              className="inline-flex items-center gap-2 text-xs font-semibold"
            >
              <X className="h-4 w-4" />
              Choose Different File
            </button>
          </div>

          {/* COUNTS */}
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Total Records"
              value={rows.length}
            />

            <SummaryCard
              label="Valid"
              value={
                validRows.length
              }
              good
            />

            <SummaryCard
              label="Errors"
              value={
                invalidRows.length
              }
              error
            />
          </div>

          {/* PREVIEW */}
          <div className="mt-6 overflow-hidden rounded-lg border border-[#e2e6eb]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-250">
                <thead>
                  <tr className="border-b bg-[#fafbfc] text-left text-[10px] font-bold uppercase text-[#667085]">
                    <th className="px-4 py-3">
                      Row
                    </th>

                    <th className="px-4 py-3">
                      Worker
                    </th>

                    <th className="px-4 py-3">
                      Passport
                    </th>

                    <th className="px-4 py-3">
                      Type
                    </th>

                    <th className="px-4 py-3">
                      Route
                    </th>

                    <th className="px-4 py-3">
                      Position
                    </th>

                    <th className="px-4 py-3">
                      Validation
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map(
                    (row) => (
                      <tr
                        key={
                          row.rowNumber
                        }
                        className="border-b border-[#edf0f3] last:border-0"
                      >
                        <td className="px-4 py-4 text-xs text-[#667085]">
                          {
                            row.rowNumber
                          }
                        </td>

                        <td className="px-4 py-4">
                          <p className="text-sm font-bold">
                            {
                              row.fullName
                            }
                          </p>

                          <p className="mt-1 text-[10px] text-[#667085]">
                            {
                              row.nationality
                            }
                          </p>
                        </td>

                        <td className="px-4 py-4 text-xs">
                          {
                            row.passportNumber
                          }
                        </td>

                        <td className="px-4 py-4">
                          <span className="rounded-full bg-[#f0f1f3] px-2.5 py-1 text-[10px] capitalize">
                            {
                              row.applicationType
                            }
                          </span>
                        </td>

                        <td className="px-4 py-4 text-xs">
                          {
                            row.originCountry
                          }
                          {" → "}
                          {row.destinationCountry ||
                            "—"}
                        </td>

                        <td className="px-4 py-4 text-xs">
                          {row.positionTitle ||
                            "—"}
                        </td>

                        <td className="px-4 py-4">
                          {row.errors
                            .length ===
                          0 ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 className="h-4 w-4" />
                              Ready
                            </span>
                          ) : (
                            <div className="text-xs text-red-700">
                              {row.errors.map(
                                (
                                  error
                                ) => (
                                  <p
                                    key={
                                      error
                                    }
                                  >
                                    {
                                      error
                                    }
                                  </p>
                                )
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {state.error && (
            <div className="mt-5 flex gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {state.error}
            </div>
          )}

          {state.success && (
            <div className="mt-5 flex gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {state.success}
            </div>
          )}

          <form
            action={action}
            className="mt-6"
          >
            <input
              type="hidden"
              name="rows"
              value={JSON.stringify(
                serializedRows
              )}
            />

            <button
              type="submit"
              disabled={
                pending ||
                validRows.length === 0 ||
                invalidRows.length > 0
              }
              className="h-12 w-full rounded-md bg-[#181818] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {pending
                ? "Submitting Applications..."
                : invalidRows.length
                  ? "Correct Spreadsheet Errors Before Submission"
                  : `Submit ${validRows.length} Worker ${
                      validRows.length ===
                      1
                        ? "Application"
                        : "Applications"
                    } to Ministry`}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  good,
  error,
}: {
  label: string;
  value: number;
  good?: boolean;
  error?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[#e2e6eb] bg-white p-4">
      <p className="text-[10px] font-bold uppercase text-[#667085]">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-bold ${
          good
            ? "text-emerald-700"
            : error && value
              ? "text-red-700"
              : "text-[#202124]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}