import {
  ArrowRight,
  Building2,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f8] px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#181818] text-white">
            <ShieldCheck className="h-6 w-6" />
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[#202124]">
            Create Your Access
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#667085]">
            Choose how you will use the National Migration Monitor.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          <Link
            href="/register/employer"
            className="group rounded-xl border border-[#dce1e7] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#202124]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f0f1f3]">
              <Building2 className="h-6 w-6" />
            </span>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#667085]">
              Organization
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Register an Employer
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#667085]">
              For registered businesses employing, sponsoring,
              sending, or receiving migrant workers.
            </p>

            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              Register Organization
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/register/individual"
            className="group rounded-xl border border-[#dce1e7] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#202124]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f0f1f3]">
              <UserRound className="h-6 w-6" />
            </span>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#667085]">
              Individual
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Register as an Individual
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#667085]">
              For employees and individuals managing their own
              migration, employment and support applications.
            </p>

            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              Create Individual Account
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        <p className="mt-8 text-center text-sm text-[#667085]">
          Already registered?{" "}
          <Link
            href="/staff-login"
            className="font-semibold text-[#202124] hover:underline"
          >
            Sign in to your portal
          </Link>
        </p>
      </div>
    </main>
  );
}