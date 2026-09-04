"use client";

import {
  submitEmployerSupportRequest,
  type EmployerSupportState,
} from "@/app/(employer)/employer/support/actions";
import { Send } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
} from "react";
import { toast } from "sonner";

const initialState: EmployerSupportState = {};

export default function EmployerSupportForm() {
  const [state, action, pending] =
    useActionState(
      submitEmployerSupportRequest,
      initialState
    );

  const formRef =
    useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);

      formRef.current?.reset();
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={action}
      className="space-y-5"
    >
      <label className="block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Type of Assistance
        </span>

        <select
          name="category"
          required
          defaultValue=""
          className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm"
        >
          <option value="">
            Select assistance
          </option>

          <option value="application">
            Application Assistance
          </option>

          <option value="worker">
            Worker Registration Issue
          </option>

          <option value="documents">
            Document Assistance
          </option>

          <option value="compliance">
            Employer Compliance
          </option>

          <option value="technical">
            Technical Support
          </option>

          <option value="emergency">
            Emergency Worker Support
          </option>
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
          placeholder="Explain the issue and the assistance your organization requires..."
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
          <option value="low">
            Normal
          </option>

          <option value="medium">
            Important
          </option>

          <option value="critical">
            Critical
          </option>
        </select>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#181818] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />

        {pending
          ? "Submitting..."
          : "Submit Support Request"}
      </button>
    </form>
  );
}