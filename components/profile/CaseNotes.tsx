"use client";

import {
  addCaseNote,
  type CaseNoteState,
} from "@/app/(authenticated)/records/actions";
import type { CaseNote } from "@/data/profile";
import {
  CheckCircle2,
  FileText,
  Info,
} from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
} from "react";

type CaseNotesProps = {
  recordId: string;
  migrationCode: string;
  notes: CaseNote[];
};

const initialState: CaseNoteState = {};

export default function CaseNotes({
  recordId,
  migrationCode,
  notes,
}: CaseNotesProps) {
  const [state, formAction, pending] =
    useActionState(addCaseNote, initialState);

  const formRef =
    useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section>
      <div className="flex items-center gap-2 border-b border-[#dfe3e8] pb-4">
        <FileText className="h-4 w-4" />

        <h2 className="text-sm font-bold text-[#202124]">
          Official Case Notes &amp; Internal Log
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {notes.length === 0 && (
          <div className="rounded-md border border-dashed border-[#d8dde5] px-4 py-8 text-center text-sm text-[#667085]">
            No case notes have been recorded.
          </div>
        )}

        {notes.map((note, index) => (
          <article
            key={`${note.author}-${note.date}-${index}`}
            className="rounded-md border border-[#e2e6eb] bg-[#fafbfc] p-4"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <p className="text-[9px] font-bold uppercase text-[#202124]">
                {note.author}
              </p>

              <time className="text-[9px] text-[#667085]">
                {note.date}
              </time>
            </div>

            <p className="mt-3 whitespace-pre-wrap text-[11px] leading-5 text-[#475467]">
              {note.content}
            </p>
          </article>
        ))}
      </div>

      <form
        ref={formRef}
        action={formAction}
        className="mt-6"
      >
        <input
          type="hidden"
          name="migrationRecordId"
          value={recordId}
        />

        <input
          type="hidden"
          name="migrationCode"
          value={migrationCode}
        />

        <label
          htmlFor="case-note"
          className="text-[9px] font-bold uppercase text-[#667085]"
        >
          Add New Case Note
        </label>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end">
          <textarea
            id="case-note"
            name="note"
            placeholder="Enter restricted access case note here..."
            rows={4}
            maxLength={3000}
            required
            className="min-h-28 flex-1 resize-y rounded-md border border-[#d8dde5] bg-white p-4 text-sm outline-none placeholder:text-[#98a0ae] focus:border-[#202124] focus:ring-2 focus:ring-black/5"
          />

          <button
            type="submit"
            disabled={pending}
            className="h-11 rounded-md bg-[#181818] px-6 text-xs font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Saving..." : "Submit Note"}
          </button>
        </div>

        {state.error && (
          <div className="mt-3 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="mt-3 flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            {state.success}
          </div>
        )}
      </form>
    </section>
  );
}