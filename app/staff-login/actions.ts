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
  "employee",
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

  // -------------------------------------------------------
  // 1. Validate submitted credentials
  // -------------------------------------------------------

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

  // -------------------------------------------------------
  // 2. Authenticate user
  // -------------------------------------------------------

  const {
    data: authData,
    error: authError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return {
      error:
        "Invalid government email or security password.",
    };
  }

  // -------------------------------------------------------
  // 3. Get real application role from profiles table
  // -------------------------------------------------------

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      role,
      active,
      ministry,
      clearance_level,
      department,
      organization_name
    `)
    .eq("id", authData.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();

    return {
      error:
        "No authorized profile is assigned to this account.",
    };
  }

  if (!profile.active) {
    await supabase.auth.signOut();

    return {
      error: "This account has been suspended.",
    };
  }

  // -------------------------------------------------------
  // 4. Selected card must match assigned role
  // -------------------------------------------------------

  if (selectedRoleValue !== profile.role) {
    await supabase.auth.signOut();

    return {
      error:
        "The selected portal does not match the role assigned to this account.",
    };
  }

  // -------------------------------------------------------
  // 5. Redirect according to role
  // -------------------------------------------------------

  switch (profile.role) {
    case "ministry":
      redirect("/dashboard");

    case "admin":
      redirect("/technical/dashboard");

    case "police":
    case "agency":
      redirect("/agency/dashboard");

    case "employer":
      redirect("/employer/dashboard");

    case "employee":
      redirect("/employee/dashboard");

    case "ngo":
      redirect("/ngo/dashboard");

    default:
      await supabase.auth.signOut();

      return {
        error:
          "No portal is configured for this account.",
      };
  }
}