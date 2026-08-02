"use client";

import {
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { FormEvent, useState } from "react";

type Severity = "Low" | "Medium" | "Critical";

export default function IncidentReportForm() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("Medium");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!category.trim() || !description.trim()) {
      return;
    }

    setSubmitted(true);
    setCategory("");
    setDescription("");
    setSeverity("Medium");

    window.setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  }

  return (
    <section className="rounded-xl border border-[#d8dde5] bg-white p-6 shadow-[0_3px_12px_rgba(16,24,40,0.06)]">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-500" />

        <h2 className="text-xl font-bold text-[#202124]">
          Report Technical Issue
        </h2>
      </div>

      <p className="mt-5 text-sm leading-6 text-[#667085]">
        Experiencing a bug or system lag? File an incident report with our
        technical team immediately.
      </p>

      <form onSubmit={handleSubmit} className="mt-7">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
            Issue Category
          </span>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
            className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm outline-none focus:border-[#202124]"
          >
            <option value="">Select a category</option>
            <option value="Authentication">Authentication</option>
            <option value="Record Data">Record Data</option>
            <option value="Reporting">Reporting</option>
            <option value="Performance">Performance</option>
            <option value="Map">Map and Tracking</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
            Incident Description
          </span>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            rows={5}
            placeholder="Please describe what happened, including record IDs if applicable..."
            className="mt-2 min-h-32 w-full resize-y rounded-md border border-[#d8dde5] bg-white p-4 text-sm outline-none placeholder:text-[#98a0ae] focus:border-[#202124]"
          />
        </label>

        <fieldset className="mt-5">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#667085]">
            Severity Level
          </legend>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {(["Low", "Medium", "Critical"] as Severity[]).map((item) => {
              const selected = severity === item;

              const styles =
                item === "Low"
                  ? "border-emerald-200 text-emerald-700"
                  : item === "Medium"
                    ? "border-amber-300 text-amber-700"
                    : "border-red-200 text-red-600";

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSeverity(item)}
                  className={`h-10 rounded-md border text-sm font-medium transition ${styles} ${
                    selected
                      ? "bg-[#f4f5f6] ring-2 ring-black/5"
                      : "bg-white hover:bg-[#fafbfc]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </fieldset>

        {submitted && (
          <div
            role="status"
            className="mt-5 flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            Incident report submitted. Reference: SUP-2026-1048.
          </div>
        )}

        <button
          type="submit"
          className="mt-6 h-11 w-full rounded-md bg-[#181818] text-sm font-semibold text-white transition hover:bg-black"
        >
          Submit Incident Report
        </button>

        <p className="mt-3 text-center text-[10px] italic text-[#667085]">
          All reports are logged with your User ID for accountability.
        </p>
      </form>
    </section>
  );
}