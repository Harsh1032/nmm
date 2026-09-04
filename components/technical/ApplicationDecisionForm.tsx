"use client";

import type { ApplicationDecisionState } from "@/app/(technical)/technical/applications/[id]/actions";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Loader2,
  XCircle,
} from "lucide-react";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

type Props = {
  action: (
    previousState: ApplicationDecisionState,
    formData: FormData
  ) => Promise<ApplicationDecisionState>;

  reviewNotes?: string | null;
  decisionReason?: string | null;
};

const initialState: ApplicationDecisionState =
  {};

export default function ApplicationDecisionForm({
  action,
  reviewNotes,
  decisionReason,
}: Props) {
  const [
    state,
    formAction,
    pending,
  ] = useActionState(
    action,
    initialState
  );

  const [
    clickedStatus,
    setClickedStatus,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (state.success) {
      toast.success(
        state.success
      );

      setClickedStatus(
        null
      );
    }

    if (state.error) {
      toast.error(
        state.error
      );

      setClickedStatus(
        null
      );
    }
  }, [state]);

  function handleSubmit(
    status: string
  ) {
    setClickedStatus(
      status
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-xl border bg-white p-6"
    >
      <h2 className="font-bold">
        Processing Decision
      </h2>

      <label className="mt-5 block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Internal Review Note
        </span>

        <textarea
          name="reviewNotes"
          rows={4}
          defaultValue={
            reviewNotes || ""
          }
          disabled={pending}
          className="mt-2 w-full rounded-md border p-3 text-sm outline-none transition focus:border-[#202124] disabled:cursor-not-allowed disabled:bg-[#f8f9fa] disabled:opacity-60"
        />
      </label>

      <label className="mt-5 block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Applicant Feedback / Reason
        </span>

        <textarea
          name="decisionReason"
          rows={4}
          defaultValue={
            decisionReason || ""
          }
          disabled={pending}
          placeholder="Required when requesting more information or rejecting."
          className="mt-2 w-full rounded-md border p-3 text-sm outline-none transition focus:border-[#202124] disabled:cursor-not-allowed disabled:bg-[#f8f9fa] disabled:opacity-60"
        />
      </label>

      <div className="mt-6 space-y-3">
        <button
          type="submit"
          name="status"
          value="under_review"
          disabled={pending}
          onClick={() =>
            handleSubmit(
              "under_review"
            )
          }
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md border font-semibold transition hover:bg-[#fafafa] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending &&
          clickedStatus ===
            "under_review" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Clock3 className="h-4 w-4" />
              Mark Under Review
            </>
          )}
        </button>

        <button
          type="submit"
          name="status"
          value="more_information_required"
          disabled={pending}
          onClick={() =>
            handleSubmit(
              "more_information_required"
            )
          }
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-orange-300 bg-orange-50 font-semibold text-orange-800 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending &&
          clickedStatus ===
            "more_information_required" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Requesting...
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4" />
              Request More Information
            </>
          )}
        </button>

        <button
          type="submit"
          name="status"
          value="approved"
          disabled={pending}
          onClick={() =>
            handleSubmit(
              "approved"
            )
          }
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending &&
          clickedStatus ===
            "approved" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Approving...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Approve Application
            </>
          )}
        </button>

        <button
          type="submit"
          name="status"
          value="rejected"
          disabled={pending}
          onClick={() =>
            handleSubmit(
              "rejected"
            )
          }
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-red-600 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending &&
          clickedStatus ===
            "rejected" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Rejecting...
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              Reject Application
            </>
          )}
        </button>
      </div>
    </form>
  );
}