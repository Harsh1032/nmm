import BulkWorkerUpload from "@/components/employer/BulkWorkerUpload";
import {
  Download,
  FileSpreadsheet,
  Info,
} from "lucide-react";

export default function EmployerBulkImportPage() {
  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Employer Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Bulk Worker Upload
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Submit migration applications for multiple employees using
            the official spreadsheet format.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-xl border border-[#e2e6eb] bg-white p-7">
            <FileSpreadsheet className="h-7 w-7" />

            <h2 className="mt-5 text-xl font-bold">
              Upload Worker Spreadsheet
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Upload an Excel file containing one row for each worker
              application.
            </p>

            <div className="mt-7">
              <BulkWorkerUpload />
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-5">
              <Download className="h-5 w-5" />

              <h2 className="mt-4 font-bold">
                Official Template
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#667085]">
                Download the approved spreadsheet template before
                preparing a bulk worker submission.
              </p>

              <button
                type="button"
                className="mt-5 h-10 w-full rounded-md border border-[#d8dde5] text-sm font-semibold"
              >
                Download Excel Template
              </button>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-[#fafbfc] p-5">
              <div className="flex gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />

                <div>
                  <p className="text-sm font-bold">
                    Required columns
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-[#667085]">
                    <p>Full Name</p>
                    <p>Nationality</p>
                    <p>Passport Number</p>
                    <p>Application Type</p>
                    <p>Origin Country</p>
                    <p>Destination Country</p>
                    <p>Destination City</p>
                    <p>Position / Job Title</p>
                    <p>Visa Type</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}