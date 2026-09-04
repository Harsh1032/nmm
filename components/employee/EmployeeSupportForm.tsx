"use client";

import {
  submitEmployeeSupportRequest,
  type EmployeeSupportState,
} from "@/app/(employee)/employee/support/actions";

import {
  Loader2,
  Send,
} from "lucide-react";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";

import { toast } from "sonner";

const initialState: EmployeeSupportState = {};

export default function EmployeeSupportForm() {
  const [state, action, pending] =
    useActionState(
      submitEmployeeSupportRequest,
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
          disabled={pending}
          className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm outline-none focus:border-[#202124] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option
            value=""
            disabled
          >
            Select assistance
          </option>

          <option value="medical">
            Medical Assistance
          </option>

          <option value="legal">
            Legal Assistance
          </option>

          <option value="employment">
            Employment Issue
          </option>

          <option value="shelter">
            Shelter / Accommodation
          </option>

          <option value="documents">
            Document Assistance
          </option>

          <option value="technical">
            Technical Support
          </option>

          <option value="emergency">
            Emergency Support
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
          disabled={pending}
          placeholder="Explain the issue and the assistance you require..."
          className="mt-2 w-full resize-y rounded-md border border-[#d8dde5] p-3 text-sm outline-none focus:border-[#202124] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Priority
        </span>

        <select
          name="severity"
          defaultValue="low"
          disabled={pending}
          className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm outline-none focus:border-[#202124] disabled:cursor-not-allowed disabled:opacity-60"
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
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#181818] text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting Request...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Support Request
          </>
        )}
      </button>
    </form>
  );
}