"use client";

import {
  registerEmployer,
  type RegisterState,
} from "@/app/register/actions";
import { ArrowRight, Building2, Info } from "lucide-react";
import { useActionState } from "react";

const initialState: RegisterState = {};

export default function EmployerRegistrationForm() {
  const [state, action, pending] =
    useActionState(registerEmployer, initialState);

  return (
    <form action={action} className="space-y-8">
      <section>
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5" />
          <h2 className="text-lg font-bold">
            Organization Details
          </h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Legal Company Name"
            name="companyName"
            placeholder="e.g. Emaar Construction"
          />

          <Field
            label="Registration Number"
            name="registrationNumber"
            placeholder="Company registration number"
          />

          <Field
            label="Industry / Sector"
            name="sector"
            placeholder="e.g. Construction"
          />

          <Field
            label="Country"
            name="country"
            placeholder="e.g. Uganda"
          />

          <Field
            label="City"
            name="city"
            placeholder="e.g. Kampala"
            required={false}
          />
        </div>
      </section>

      <section className="border-t border-[#e2e6eb] pt-7">
        <h2 className="text-lg font-bold">
          Authorized Representative
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Representative Full Name"
            name="representativeName"
          />

          <Field
            label="Business Email"
            name="email"
            type="email"
          />

          <Field
            label="Create Password"
            name="password"
            type="password"
          />
        </div>
      </section>

      {state.error && (
        <div className="flex gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <Info className="h-4 w-4 shrink-0" />
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#181818] font-semibold text-white disabled:opacity-60"
      >
        {pending
          ? "Registering Organization..."
          : "Submit Organization Registration"}

        {!pending && (
          <ArrowRight className="h-5 w-5" />
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-xs font-bold uppercase text-[#667085]">
        {label}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] px-3 text-sm outline-none focus:border-[#202124]"
      />
    </label>
  );
}