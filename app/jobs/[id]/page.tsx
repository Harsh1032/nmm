import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  MapPin,
  WalletCards,
} from "lucide-react";

import { jobs } from "@/data/jobs";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = jobs.find(
    (item) => item.id === id
  );

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <section className="border-b border-[#e2e6eb] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#667085] hover:text-[#202124]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <span className="inline-flex rounded-full bg-[#f2f4f7] px-3 py-1 text-xs font-semibold text-[#475467]">
                {job.category}
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tighter">
                {job.title}
              </h1>

              <p className="mt-2 text-lg text-[#475467]">
                {job.company}
              </p>

              <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#667085]">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {job.location}, {job.country}
                </span>

                <span className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {job.type}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  Deadline {job.deadline}
                </span>
              </div>
            </div>

            <Link
              href="/staff-login"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-[#181818] px-7 text-sm font-semibold text-white"
            >
              <span className="text-white">Apply Now</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-8">
        <div className="space-y-6">
          <section className="rounded-xl border border-[#e2e6eb] bg-white p-7">
            <h2 className="text-xl font-bold">
              Job Description
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#667085]">
              {job.description}
            </p>
          </section>

          <section className="rounded-xl border border-[#e2e6eb] bg-white p-7">
            <h2 className="text-xl font-bold">
              Requirements
            </h2>

            <div className="mt-5 space-y-3">
              {job.requirements.map(
                (requirement) => (
                  <div
                    key={requirement}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                    <p className="text-sm text-[#475467]">
                      {requirement}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>

          <section className="rounded-xl border border-[#e2e6eb] bg-white p-7">
            <h2 className="text-xl font-bold">
              Benefits
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {job.benefits.map(
                (benefit) => (
                  <div
                    key={benefit}
                    className="rounded-lg bg-[#f8f9fa] px-4 py-3 text-sm text-[#475467]"
                  >
                    {benefit}
                  </div>
                )
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
            <h2 className="font-bold">
              Position Overview
            </h2>

            <JobInfo
              icon={WalletCards}
              label="Salary"
              value={job.salary}
            />

            <JobInfo
              icon={Building2}
              label="Employer"
              value={job.company}
            />

            <JobInfo
              icon={MapPin}
              label="Location"
              value={`${job.location}, ${job.country}`}
            />

            <JobInfo
              icon={BriefcaseBusiness}
              label="Employment Type"
              value={job.type}
            />
          </section>

          <section className="rounded-xl bg-[#181818] p-6 text-white">
            <h2 className="text-lg font-bold">
              Interested in this position?
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/60">
              Sign in or create an individual account to continue with
              your application.
            </p>

            <Link
              href="/staff-login"
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-white text-sm font-semibold text-[#181818]"
            >
              <span className="text-black">Apply for this Job</span>
            </Link>

            <Link
              href="/register/individual"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-md border border-white/20 text-sm font-semibold text-white"
            >
              Create Individual Account
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}

function JobInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="mt-5 flex gap-3 border-b border-[#edf0f3] pb-5 last:border-0">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />

      <div>
        <p className="text-[10px] font-bold uppercase text-[#667085]">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}