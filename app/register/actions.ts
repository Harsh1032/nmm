"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

export type RegisterState = {
  error?: string;
};

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value ?? "").trim().toLowerCase();
}

export async function registerEmployer(
  _previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const companyName = String(
    formData.get("companyName") ?? ""
  ).trim();

  const registrationNumber = String(
    formData.get("registrationNumber") ?? ""
  ).trim();

  const sector = String(
    formData.get("sector") ?? ""
  ).trim();

  const country = String(
    formData.get("country") ?? ""
  ).trim();

  const city = String(
    formData.get("city") ?? ""
  ).trim();

  const representativeName = String(
    formData.get("representativeName") ?? ""
  ).trim();

  const email = normalizeEmail(formData.get("email"));

  const password = String(
    formData.get("password") ?? ""
  );

  if (
    !companyName ||
    !registrationNumber ||
    !sector ||
    !country ||
    !representativeName ||
    !email ||
    !password
  ) {
    return {
      error: "Complete all required fields.",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must contain at least 8 characters.",
    };
  }

  const admin = createAdminClient();

  // Create employer entity first.
  const {
    data: employer,
    error: employerError,
  } = await admin
    .from("employers")
    .insert({
      name: companyName,
      registration_number: registrationNumber,
      sector,
      country,
      city: city || null,
      compliance_status: "under_review",
    })
    .select("id")
    .single();

  if (employerError || !employer) {
    return {
      error:
        employerError?.message ||
        "Unable to register the organization.",
    };
  }

  const {
    data: userResult,
    error: userError,
  } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: representativeName,
    },
  });

  if (userError || !userResult.user) {
    await admin
      .from("employers")
      .delete()
      .eq("id", employer.id);

    return {
      error:
        userError?.message ||
        "Unable to create the employer account.",
    };
  }

  const { error: profileError } = await admin
    .from("profiles")
    .update({
      full_name: representativeName,
      title: "Authorized Employer Representative",
      ministry: null,
      role: "employer",
      clearance_level: "organization",
      organization_name: companyName,
      employer_id: employer.id,

      // Demo behavior:
      active: true,
    })
    .eq("id", userResult.user.id);

  if (profileError) {
    await admin.auth.admin.deleteUser(
      userResult.user.id
    );

    await admin
      .from("employers")
      .delete()
      .eq("id", employer.id);

    return {
      error:
        "The employer account could not be completed.",
    };
  }

  redirect(
    "/staff-login?registered=employer"
  );
}

export async function registerIndividual(
  _previousState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const fullName = String(
    formData.get("fullName") ?? ""
  ).trim();

  const email = normalizeEmail(
    formData.get("email")
  );

  const password = String(
    formData.get("password") ?? ""
  );

  const nationality = String(
    formData.get("nationality") ?? ""
  ).trim();

  const passportNumber = String(
    formData.get("passportNumber") ?? ""
  ).trim();

  if (
    !fullName ||
    !email ||
    !password ||
    !nationality ||
    !passportNumber
  ) {
    return {
      error: "Complete all required fields.",
    };
  }

  if (password.length < 8) {
    return {
      error:
        "Password must contain at least 8 characters.",
    };
  }

  const admin = createAdminClient();

  const {
    data: userResult,
    error: userError,
  } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
    },
  });

  if (userError || !userResult.user) {
    return {
      error:
        userError?.message ||
        "Unable to create the account.",
    };
  }

  const { error: profileError } = await admin
    .from("profiles")
    .update({
      full_name: fullName,
      title: "Registered Individual",
      ministry: null,
      role: "employee",
      clearance_level: "self",
      organization_name: null,

      // No migration record yet.
      migration_record_id: null,

      active: true,
    })
    .eq("id", userResult.user.id);

  if (profileError) {
    await admin.auth.admin.deleteUser(
      userResult.user.id
    );

    return {
      error:
        "The individual account could not be completed.",
    };
  }

  /*
   * We don't create a migration_record here.
   * Registration and migration approval are different concepts.
   *
   * The person creates their migration application after login.
   */

  redirect(
    "/staff-login?registered=individual"
  );
}