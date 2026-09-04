"use client";

import {
  submitIndividualApplication,
  type IndividualApplicationState,
} from "../actions";

import {
  Loader2,
  Send,
} from "lucide-react";

import {
  useActionState,
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import { toast } from "sonner";

const initialState: IndividualApplicationState =
  {};

export default function NewEmployeeApplicationPage() {
  const router =
    useRouter();

  const [
    state,
    action,
    pending,
  ] = useActionState(
    submitIndividualApplication,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(
        state.error
      );
    }

    if (state.success) {
      toast.success(
        state.success
      );

      const timer =
        window.setTimeout(
          () => {
            router.push(
              "/employee/applications"
            );

            router.refresh();
          },
          700
        );

      return () =>
        window.clearTimeout(
          timer
        );
    }
  }, [
    state,
    router,
  ]);

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
            Individual Application
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
            Start Migration Application
          </h1>

          <p className="mt-2 text-sm text-[#667085]">
            Submit your employment or migration details for Ministry review.
          </p>
        </header>

        <form
          action={action}
          className="mt-7 rounded-xl border border-[#e2e6eb] bg-white p-6 sm:p-8"
        >
          <h2 className="text-lg font-bold">
            Movement Details
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label>
              <span className="text-xs font-bold uppercase text-[#667085]">
                Application Type
              </span>

              <select
                name="applicationType"
                required
                defaultValue=""
                disabled={pending}
                className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm outline-none transition focus:border-[#202124] disabled:cursor-not-allowed disabled:bg-[#f8f9fa] disabled:opacity-60"
              >
                <option
                  value=""
                  disabled
                >
                  Select
                </option>

                <option value="outbound">
                  Going abroad for employment
                </option>

                <option value="inbound">
                  Entering the country for employment
                </option>

                <option value="refugee">
                  Refugee / Humanitarian Protection
                </option>
              </select>
            </label>

            <Field
              label="Full Name"
              name="fullName"
              disabled={pending}
            />

            <Field
              label="Nationality"
              name="nationality"
              disabled={pending}
            />

            <Field
              label="Passport Number"
              name="passportNumber"
              disabled={pending}
            />

            <Field
              label="Origin Country"
              name="originCountry"
              disabled={pending}
            />

            <Field
              label="Destination Country"
              name="destinationCountry"
              disabled={pending}
            />

            <Field
              label="Destination City"
              name="destinationCity"
              required={false}
              disabled={pending}
            />

            <Field
              label="Employer"
              name="employerName"
              required={false}
              disabled={pending}
            />

            <Field
              label="Position / Job Title"
              name="positionTitle"
              required={false}
              disabled={pending}
            />

            <Field
              label="Visa Type"
              name="visaType"
              required={false}
              disabled={pending}
            />
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-[#e2e6eb] pt-6">
            <button
              type="submit"
              disabled={pending}
              className="flex h-11 min-w-45 items-center justify-center gap-2 rounded-md bg-[#181818] px-6 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit to Ministry
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required = true,
  disabled = false,
}: {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label>
      <span className="text-xs font-bold uppercase text-[#667085]">
        {label}
      </span>

      <input
        name={name}
        required={required}
        disabled={disabled}
        className="mt-2 h-11 w-full rounded-md border border-[#d8dde5] px-3 text-sm outline-none transition focus:border-[#202124] disabled:cursor-not-allowed disabled:bg-[#f8f9fa] disabled:opacity-60"
      />
    </label>
  );
}