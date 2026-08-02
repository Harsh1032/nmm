// src/app/staff-login/actions.ts

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
};

const validRoles = [
  "ministry",
  "admin",
  "agency",
  "ngo",
  "police",
  "employer",
  "public",
] as const;

type LoginRole = (typeof validRoles)[number];

function isValidRole(value: string): value is LoginRole {
  return validRoles.includes(value as LoginRole);
}

export async function login(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") ?? ""
  );

  const selectedRoleValue = String(
    formData.get("selectedRole") ?? ""
  );

  if (!email || !password) {
    return {
      error:
        "Enter your government ID or email and security password.",
    };
  }

  if (!isValidRole(selectedRoleValue)) {
    return {
      error: "Select a valid official role.",
    };
  }

  const supabase = await createClient();

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError || !authData.user) {
    return {
      error:
        "Invalid government email or security password.",
    };
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        role,
        active,
        ministry
      `)
      .eq("id", authData.user.id)
      .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();

    return {
      error:
        "No authorized government profile is assigned to this account.",
    };
  }

  if (!profile.active) {
    await supabase.auth.signOut();

    return {
      error: "This government account has been suspended.",
    };
  }

  // For now, only Ministry accounts exist in the demo.
  if (profile.role !== "ministry") {
    await supabase.auth.signOut();

    return {
      error:
        "This account is not authorized for the current demo portal.",
    };
  }

  // Compare selected role with the real profile role.
  if (selectedRoleValue !== profile.role) {
    await supabase.auth.signOut();

    return {
      error:
        "The selected portal does not match the role assigned to this account.",
    };
  }

  redirect("/dashboard");
}