// src/components/dashboard/AnalyticsPanel.tsx
import { CircleHelp, Clock3, Globe2 } from "lucide-react";

import type {
  NationalityDatum,
  SupportUsageDatum,
} from "@/data/dashboard";

type AnalyticsPanelProps = {
  nationalityData: NationalityDatum[];
  supportUsage: SupportUsageDatum[];
};

export default function AnalyticsPanel({
  nationalityData,
  supportUsage,
}: AnalyticsPanelProps) {
  return (
    <aside className="space-y-5">
      <section className="rounded-lg border border-[#edf0f3] bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Globe2 className="h-4 w-4" />
          Nationality Distribution
        </h2>

        <div className="mt-6 space-y-4">
          {nationalityData.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[64px_1fr] items-center gap-3"
            >
              <span className="text-[10px] text-[#475467]">{item.label}</span>

              <div className="h-8 rounded-sm bg-[#f2f3f5]">
                <div
                  className="h-full rounded-sm bg-[#181818]"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-[#edf0f3] bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Clock3 className="h-4 w-4 text-blue-500" />
          Visa Status Breakdown
        </h2>

        <div className="flex justify-center py-6">
          <div
            className="relative h-40 w-40 rounded-full"
            style={{
              background:
                "conic-gradient(#181818 0 62%, #2aa198 62% 77%, #274c5e 77% 88%, #e8bd57 88% 92%, #f0f1f3 92% 100%)",
            }}
          >
            <div className="absolute inset-8 rounded-full bg-white" />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {["#181818", "#2aa198", "#274c5e", "#e8bd57"].map(
            (color) => (
              <span
                key={color}
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: color }}
              />
            )
          )}
        </div>
      </section>

      <section className="rounded-lg border border-[#edf0f3] bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <CircleHelp className="h-4 w-4 text-emerald-500" />
          Support Services Usage
        </h2>

        <div className="mt-6 space-y-5">
          {supportUsage.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex justify-between gap-4 text-[10px]">
                <span className="text-[#202124]">{item.label}</span>
                <span className="text-[#667085]">{item.value} units</span>
              </div>

              <div className="h-1.5 rounded-full bg-[#edf0f3]">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-7 w-full text-center text-[10px] text-[#667085] hover:text-[#202124]"
        >
          View Service Utilization Report
        </button>
      </section>
    </aside>
  );
}