// src/components/landing/FinalCallToAction.tsx

import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export default function FinalCallToAction() {
  return (
    <section className="bg-white px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl bg-[#181818] px-6 py-16 text-center text-white shadow-[0_25px_70px_rgba(0,0,0,0.22)] sm:px-10 sm:py-20 lg:px-16">
        <Building2
          aria-hidden="true"
          className="absolute right-8 top-8 h-28 w-28 text-white/9 sm:right-14 sm:top-10 sm:h-36 sm:w-36"
        />

        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Ready to secure our national future?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Institutional access is strictly managed. Please ensure you have
            your official security credentials ready before attempting to log
            in.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/staff-login"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-7 py-3 text-sm font-semibold  transition hover:bg-[#eeeeec]"
            >
              <span className="text-[#202124]">Login to Staff Portal</span>
            </Link>

            <Link
              href="/request-access"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/60 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Request Access
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}