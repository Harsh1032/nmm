"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type CaseNoteState = {
  error?: string;
  success?: string;
};

export async function addCaseNote(
  _previousState: CaseNoteState,
  formData: FormData
): Promise<CaseNoteState> {
  const migrationRecordId = String(
    formData.get("migrationRecordId") ?? ""
  );

  const migrationCode = String(
    formData.get("migrationCode") ?? ""
  );

  const note = String(
    formData.get("note") ?? ""
  ).trim();

  if (
    !migrationRecordId ||
    !migrationCode ||
    !note
  ) {
    return {
      error: "Enter a case note before submitting.",
    };
  }

  if (note.length > 3000) {
    return {
      error:
        "The case note cannot exceed 3,000 characters.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Your session has expired.",
    };
  }

  const { error } = await supabase
    .from("case_notes")
    .insert({
      migration_record_id: migrationRecordId,
      author_id: user.id,
      note,
      restricted: true,
    });

  if (error) {
    console.error("Case note insert failed:", error);

    return {
      error:
        "The case note could not be saved.",
    };
  }

  revalidatePath(`/records/${migrationCode}`);

  return {
    success: "Case note saved successfully.",
  };
}