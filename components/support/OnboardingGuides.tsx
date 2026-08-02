import type { OnboardingGuide } from "@/data/support";
import { ArrowRight, UsersRound } from "lucide-react";

type OnboardingGuidesProps = {
  guides: OnboardingGuide[];
};

export default function OnboardingGuides({
  guides,
}: OnboardingGuidesProps) {
  return (
    <section>
      <div className="flex flex-col justify-between gap-4 border-b border-[#dfe3e8] pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <UsersRound className="h-5 w-5 text-[#202124]" />

          <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#202124]">
            Role-Based Onboarding
          </h2>
        </div>

        <button
          type="button"
          className="h-10 rounded-md border border-[#d8dde5] bg-white px-4 text-sm font-medium text-[#202124] transition hover:bg-[#f7f8fa]"
        >
          View All Guides
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {guides.map((guide) => {
          const Icon = guide.icon;

          return (
            <article
              key={guide.id}
              className="group flex min-h-71.25 flex-col rounded-xl border border-[#edf0f3] bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(16,24,40,0.08)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eeeeef] text-[#202124]">
                <Icon className="h-6 w-6" />
              </span>

              <span className="mt-5 inline-flex w-fit rounded-full border border-[#d8dde5] px-4 py-1 text-[10px] font-semibold text-[#202124]">
                {guide.category}
              </span>

              <h3 className="mt-4 text-lg font-bold text-[#202124]">
                {guide.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-[#667085]">
                {guide.description}
              </p>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#202124]"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}