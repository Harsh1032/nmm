"use client";

import type { EmployerSupportReplyState } from "@/app/(employer)/employer/support/[id]/actions";
import { Send } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
} from "react";
import { toast } from "sonner";

type Props = {
  action: (
    state: EmployerSupportReplyState,
    formData: FormData
  ) => Promise<EmployerSupportReplyState>;
};

const initialState: EmployerSupportReplyState = {};

export default function EmployerSupportReplyForm({
  action,
}: Props) {
  const [state, formAction, pending] =
    useActionState(
      action,
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
      action={formAction}
      className="rounded-xl border border-[#e2e6eb] bg-white p-5"
    >
      <h2 className="font-bold">
        Send Follow-Up
      </h2>

      <p className="mt-1 text-xs leading-5 text-[#667085]">
        Reply to the technical team or provide additional
        information requested for this case.
      </p>

      <textarea
        name="message"
        rows={5}
        required
        placeholder="Provide additional information or reply to the technical team..."
        className="mt-4 w-full rounded-md border border-[#d8dde5] p-3 text-sm outline-none focus:border-[#202124]"
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#181818] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />

        {pending
          ? "Sending..."
          : "Send Message"}
      </button>
    </form>
  );
}