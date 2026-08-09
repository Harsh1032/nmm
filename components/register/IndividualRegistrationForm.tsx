"use client";

import {
  registerIndividual,
  type RegisterState,
} from "@/app/register/actions";
import { ArrowRight, Info, UserRound } from "lucide-react";
import { useActionState } from "react";

const initialState: RegisterState = {};

export default function IndividualRegistrationForm() {
  const [state, action, pending] =
    useActionState(registerIndividual, initialState);

  return (
    <form action={action} className="space-y-7">
      <div className="flex items-center gap-3">
        <UserRound className="h-5 w-5" />
        <h2 className="text-lg font-bold">
          Personal Details
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full Name"
          name="fullName"
        />

        <Field
          label="Nationality"
          name="nationality"
          placeholder="e.g. Ugandan"
        />

        <Field
          label="Passport Number"
          name="passportNumber"
        />

        <Field
          label="Email Address"
          name="email"
          type="email"
        />

        <Field
          label="Create Password"
          name="password"
          type="password"
        />
      </div>

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
          ? "Creating Account..."
          : "Create Individual Account"}

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
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label>
      <span className="text-xs font-bold uppercase text-[#667085]">
        {label}
      </span>

      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] px-3 text-sm outline-none focus:border-[#202124]"
      />
    </label>
  );
}