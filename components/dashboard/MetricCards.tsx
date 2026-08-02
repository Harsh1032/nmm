import type { DashboardMetric } from "@/data/dashboard";
import {
  ArrowDownRight,
  ArrowUpRight,
  ShieldAlert,
  Users,
} from "lucide-react";

type MetricCardsProps = {
  metrics: DashboardMetric[];
};

const iconConfig = {
  active: {
    icon: Users,
    classes: "bg-emerald-50 text-emerald-600",
  },
  arrival: {
    icon: ArrowUpRight,
    classes: "bg-blue-50 text-blue-600",
  },
  departure: {
    icon: ArrowDownRight,
    classes: "bg-amber-50 text-amber-600",
  },
  alert: {
    icon: ShieldAlert,
    classes: "bg-red-50 text-red-500",
  },
};

export default function MetricCards({
  metrics,
}: MetricCardsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const config = iconConfig[metric.icon];
        const Icon = config.icon;

        return (
          <article
            key={metric.label}
            className="rounded-lg border border-[#edf0f3] bg-white p-5 shadow-[0_2px_7px_rgba(16,24,40,0.04)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#667085]">
                  {metric.label}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#202124]">
                  {metric.value}
                </p>

                <p className="mt-2 text-[11px] text-[#667085]">
                  {metric.note}
                </p>
              </div>

              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.classes}`}
              >
                <Icon className="h-5 w-5" />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}