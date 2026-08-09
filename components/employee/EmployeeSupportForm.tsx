"use client";

import {
  submitEmployeeSupportRequest,
  type EmployeeSupportState,
} from "@/app/(employee)/employee/support/action";
import {
  CheckCircle2,
  Info,
  Send,
} from "lucide-react";
import { useActionState } from "react";

const initialState: EmployeeSupportState = {};

export default function EmployeeSupportForm() {
  const [state, action, pending] = useActionState(
    submitEmployeeSupportRequest,
    initialState
  );

  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Type of Assistance
        </span>

        <select
          name="category"
          required
          className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm"
        >
          <option value="">Select assistance</option>
          <option value="medical">Medical Assistance</option>
          <option value="legal">Legal Assistance</option>
          <option value="employment">Employment Issue</option>
          <option value="shelter">Shelter / Accommodation</option>
          <option value="documents">Document Assistance</option>
          <option value="emergency">Emergency Support</option>
        </select>
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Description
        </span>

        <textarea
          name="description"
          rows={6}
          required
          placeholder="Explain the issue and the assistance you require..."
          className="mt-2 w-full resize-y rounded-md border border-[#d8dde5] p-3 text-sm"
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Priority
        </span>

        <select
          name="severity"
          defaultValue="low"
          className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm"
        >
          <option value="low">Normal</option>
          <option value="medium">Important</option>
          <option value="critical">Emergency</option>
        </select>
      </label>

      {state.error && (
        <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <Info className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="flex gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {state.success}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#181818] text-sm font-semibold text-white disabled:opacity-60"
      >
        <Send className="h-4 w-4" />

        {pending ? "Submitting..." : "Submit Support Request"}
      </button>
    </form>
  );
}