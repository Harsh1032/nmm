"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type RegisterState = {
  error?: string;
};

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
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

  const email = normalizeEmail(
    formData.get("email")
  );

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
      error:
        "Password must contain at least 8 characters.",
    };
  }

  const admin = createAdminClient();

  // Check duplicate registration number
  const { data: existingEmployer } = await admin
    .from("employers")
    .select("id")
    .eq(
      "registration_number",
      registrationNumber
    )
    .maybeSingle();

  if (existingEmployer) {
    return {
      error:
        "An organization with this registration number already exists.",
    };
  }

  // Create employer
  const {
    data: employer,
    error: employerError,
  } = await admin
    .from("employers")
    .insert({
      name: companyName,
      registration_number:
        registrationNumber,
      sector,
      country,
      city: city || null,

      // For demo, immediately usable.
      compliance_status: "verified",
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

  // Create Auth user
  const {
    data: userResult,
    error: userError,
  } =
    await admin.auth.admin.createUser({
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

  // Update representative profile
  const { error: profileError } = await admin
    .from("profiles")
    .update({
      email,
      full_name: representativeName,
      title:
        "Authorized Employer Representative",
      ministry: null,
      role: "employer",
      clearance_level: "organization",
      organization_name: companyName,
      employer_id: employer.id,
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

  // Sign in newly-created account
  const supabase = await createClient();

  const { error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    console.error(
      "Employer auto-login failed:",
      signInError
    );

    redirect(
      "/staff-login?registered=employer"
    );
  }

  redirect("/employer/dashboard");
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
      error:
        "Complete all required fields.",
    };
  }

  if (password.length < 8) {
    return {
      error:
        "Password must contain at least 8 characters.",
    };
  }

  const admin = createAdminClient();

  // Create Auth user
  const {
    data: userResult,
    error: userError,
  } =
    await admin.auth.admin.createUser({
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

  // Update profile
  const { error: profileError } = await admin
    .from("profiles")
    .update({
      email,
      full_name: fullName,
      title: "Registered Individual",
      ministry: null,
      role: "employee",
      clearance_level: "self",
      organization_name: null,
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

  // Sign in newly-created individual
  const supabase = await createClient();

  const { error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    console.error(
      "Individual auto-login failed:",
      signInError
    );

    redirect(
      "/staff-login?registered=individual"
    );
  }

  redirect("/employee/dashboard");
}