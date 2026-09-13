import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { jobs } from "@/data/jobs";

const categories = [
  "All Opportunities",
  "Healthcare",
  "Engineering",
  "Technology",
  "Hospitality",
  "Logistics",
  "Skilled Trade",
];

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#181818] text-white">
        <div className="absolute -right-30 -top-42.5 h-120 w-120 rounded-full border border-white/5" />
        <div className="absolute right-20 -top-32.5 h-85 w-85 rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-375 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
                <Sparkles className="h-3.5 w-3.5" />
                Verified International Opportunities
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                Your next opportunity
                <br />
                could take you anywhere.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                Discover verified employment opportunities from registered
                employers and recruitment partners participating in the
                National Migration Monitor.
              </p>

              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/55">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Verified employers
                </span>

                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {jobs.length} open positions
                </span>

                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Multiple destinations
                </span>
              </div>
            </div>

            {/* Hero side panel */}
            <div className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                Recruitment Portal
              </p>

              <p className="mt-3 text-lg font-semibold leading-7">
                Explore opportunities before creating your migration
                application.
              </p>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Once you choose a position, sign in or register to continue
                through the official application process.
              </p>
            </div>
          </div>

          {/* SEARCH */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_280px_180px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#98a2b3]" />

                <input
                  type="search"
                  placeholder="Search role, employer, skill or keyword..."
                  className="h-14 w-full rounded-xl border-0 bg-[#f7f8fa] pl-12 pr-4 text-sm text-[#202124] outline-none transition focus:bg-white focus:ring-2 focus:ring-black/10"
                />
              </div>

              <select className="h-14 rounded-xl border-0 bg-[#f7f8fa] px-4 text-sm text-[#202124] outline-none focus:ring-2 focus:ring-black/10">
                <option>All destinations</option>
                <option>United Arab Emirates</option>
                <option>Saudi Arabia</option>
                <option>Qatar</option>
                <option>Kuwait</option>
                <option>Oman</option>
              </select>

              <button
                type="button"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#181818] px-6 text-sm font-semibold text-white transition hover:bg-black"
              >
                Search Jobs
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}
      <section className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex max-w-375 items-center gap-2 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
          <span className="mr-2 inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-[#667085]">
            <SlidersHorizontal className="h-4 w-4" />
            Browse
          </span>

          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={
                index === 0
                  ? "shrink-0 rounded-full bg-[#181818] px-4 py-2 text-xs font-semibold text-white"
                  : "shrink-0 rounded-full border border-[#e2e6eb] bg-white px-4 py-2 text-xs font-medium text-[#475467] transition hover:border-[#181818] hover:text-[#181818]"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* JOBS */}
      <section className="mx-auto max-w-375 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Current Vacancies
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-[#202124]">
              Available opportunities
            </h2>

            <p className="mt-1 text-sm text-[#667085]">
              {jobs.length} verified positions currently available
            </p>
          </div>

          <select className="h-10 rounded-lg border border-[#d8dde5] bg-white px-3 text-xs font-medium text-[#475467]">
            <option>Newest first</option>
            <option>Salary: High to Low</option>
            <option>Closing soon</option>
          </select>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group relative flex min-h-88.75 flex-col overflow-hidden rounded-2xl border border-[#e4e7ec] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#cfd4dc] hover:shadow-[0_18px_45px_rgba(16,24,40,0.09)]"
            >
              {/* top accent */}
              <div className="absolute left-0 top-0 h-1 w-full bg-[#181818] opacity-0 transition group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f2f4] transition group-hover:bg-[#181818] group-hover:text-white">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>

                <div className="flex items-center gap-2">
                  {index < 2 && (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                      Featured
                    </span>
                  )}

                  <span className="rounded-full bg-[#f2f4f7] px-2.5 py-1 text-[10px] font-semibold text-[#475467]">
                    {job.type}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#98a2b3]">
                  {job.category}
                </p>

                <h3 className="mt-2 text-xl font-bold tracking-tight text-[#202124] transition group-hover:text-black">
                  {job.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#475467]">
                  <Building2 className="h-4 w-4 text-[#98a2b3]" />
                  {job.company}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f7f8fa] px-2.5 py-1.5 text-[11px] text-[#667085]">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}, {job.country}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f7f8fa] px-2.5 py-1.5 text-[11px] text-[#667085]">
                  <Clock3 className="h-3.5 w-3.5" />
                  {job.posted}
                </span>
              </div>

              <p className="mt-5 line-clamp-2 text-sm leading-6 text-[#667085]">
                {job.summary}
              </p>

              <div className="mt-auto border-t border-[#edf0f3] pt-5">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98a2b3]">
                      Monthly compensation
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <Banknote className="h-4 w-4 text-[#667085]" />

                      <p className="text-sm font-bold text-[#202124]">
                        {job.salary.replace(" / month", "")}
                      </p>
                    </div>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e2e6eb] transition group-hover:border-[#181818] group-hover:bg-[#181818] group-hover:text-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom information */}
        <div className="mt-10 flex flex-col justify-between gap-5 rounded-2xl border border-[#e2e6eb] bg-white p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </span>

            <div>
              <h3 className="text-sm font-bold text-[#202124]">
                Opportunities shown through the official portal
              </h3>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-[#667085]">
                Applicants should complete employment and migration processing
                only through authorized channels. Application access is
                provided after secure sign-in.
              </p>
            </div>
          </div>

          <Link
            href="/staff-login"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#d8dde5] px-4 text-xs font-semibold text-[#202124] transition hover:bg-[#f7f8fa]"
          >
            Applicant Login
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}