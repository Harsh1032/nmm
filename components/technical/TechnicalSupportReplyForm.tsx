"use client";

import { Send } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export type TechnicalSupportReplyState = {
  success?: string;
  error?: string;
};

type Props = {
  action: (
    state: TechnicalSupportReplyState,
    formData: FormData
  ) => Promise<TechnicalSupportReplyState>;

  currentStatus: string;
};

const initialState: TechnicalSupportReplyState = {};

export default function TechnicalSupportReplyForm({
  action,
  currentStatus,
}: Props) {
  const [state, formAction, pending] =
    useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="rounded-xl border border-[#e2e6eb] bg-white p-6"
    >
      <h2 className="font-bold">
        Respond to Request
      </h2>

      <label className="mt-5 block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Response
        </span>

        <textarea
          name="message"
          rows={6}
          required
          placeholder="Write a response to the user..."
          className="mt-2 w-full rounded-md border border-[#d8dde5] p-3 text-sm outline-none focus:border-[#202124]"
        />
      </label>

      <label className="mt-5 block">
        <span className="text-xs font-bold uppercase text-[#667085]">
          Update Status
        </span>

        <select
          name="status"
          defaultValue={
            currentStatus === "open"
              ? "in_progress"
              : currentStatus
          }
          className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm"
        >
          <option value="in_progress">
            In Progress
          </option>

          <option value="waiting_for_user">
            Waiting for User
          </option>

          <option value="resolved">
            Resolved
          </option>

          <option value="closed">
            Closed
          </option>
        </select>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#181818] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />

        {pending
          ? "Sending..."
          : "Send Response"}
      </button>
    </form>
  );
}