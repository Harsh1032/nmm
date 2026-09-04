"use client";

import type { EmployeeSupportReplyState } from "@/app/(employee)/employee/support/[id]/actions";

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

type Props = {
  action: (
    previousState: EmployeeSupportReplyState,
    formData: FormData
  ) => Promise<EmployeeSupportReplyState>;
};

const initialState: EmployeeSupportReplyState =
  {};

export default function EmployeeSupportReplyForm({
  action,
}: Props) {
  const [
    state,
    formAction,
    pending,
  ] = useActionState(
    action,
    initialState
  );

  const formRef =
    useRef<HTMLFormElement>(
      null
    );

  useEffect(() => {
    if (state.success) {
      toast.success(
        state.success
      );

      formRef.current?.reset();
    }

    if (state.error) {
      toast.error(
        state.error
      );
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-xl border border-[#e2e6eb] bg-white p-5"
    >
      <h2 className="font-bold">
        Send Follow-Up
      </h2>

      <p className="mt-1 text-xs leading-5 text-[#667085]">
        Provide additional information or respond to the technical team.
      </p>

      <textarea
        name="message"
        rows={5}
        required
        disabled={pending}
        placeholder="Write your response..."
        className="mt-4 w-full resize-y rounded-md border border-[#d8dde5] p-3 text-sm outline-none transition focus:border-[#202124] focus:ring-2 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#181818] text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}