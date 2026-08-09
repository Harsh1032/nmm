// src/app/register/individual/page.tsx

import IndividualRegistrationForm from "@/components/register/IndividualRegistrationForm";
import Link from "next/link";

export default function IndividualRegistrationPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f8] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/register"
          className="text-sm text-[#667085]"
        >
          ← Back to account selection
        </Link>

        <div className="mt-6 rounded-xl border border-[#dde2e8] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
            Individual Registration
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
            Create Individual Account
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Register to submit and track your own migration
            and employment applications.
          </p>

          <div className="my-7 h-px bg-[#e2e6eb]" />

          <IndividualRegistrationForm />
        </div>
      </div>
    </main>
  );
}