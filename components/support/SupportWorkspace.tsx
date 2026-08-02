"use client";

import CommonQuestions from "@/components/support/CommonQuestions";
import DirectAssistance from "@/components/support/DirectAssistance";
import IncidentReportForm from "@/components/support/IncidentReportForm";
import KnowledgeBase from "@/components/support/KnowledgeBase";
import OnboardingGuides from "@/components/support/OnboardingGuides";
import {
  frequentlyAskedQuestions,
  knowledgeArticles,
  onboardingGuides,
} from "@/data/support";
import {
  Clock3,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function SupportWorkspace() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-full bg-white">
      <section className="border-b border-[#d8dde5] bg-[#e3e4e6] px-4 py-12 text-center sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#202124] sm:text-4xl">
            Support &amp; Knowledge Center
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-[#667085] sm:text-lg">
            Access official documentation, training guides, and technical
            assistance for the National Migration Monitor.
          </p>

          <label className="relative mx-auto mt-7 block max-w-3xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by topic, keyword, or error code..."
              className="h-13 w-full rounded-lg border border-[#d2d7de] bg-white py-4 pl-12 pr-4 text-sm shadow-sm outline-none focus:border-[#202124] focus:ring-2 focus:ring-black/5"
            />
          </label>

          <div className="mt-6 flex flex-col justify-center gap-3 text-xs text-[#667085] sm:flex-row sm:gap-8">
            <span className="inline-flex items-center justify-center gap-2">
              <Clock3 className="h-4 w-4" />
              Average response time: 12 minutes
            </span>

            <span className="inline-flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Data security certified system
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
        <OnboardingGuides guides={onboardingGuides} />

        <div className="mt-14 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="min-w-0 space-y-12">
            <KnowledgeBase articles={knowledgeArticles} />

            <CommonQuestions questions={frequentlyAskedQuestions} />
          </div>

          <aside className="space-y-8">
            <IncidentReportForm />
            <DirectAssistance />
          </aside>
        </div>
      </div>
    </div>
  );
}