// src/components/alerts/AlertsList.tsx

"use client";

import type {
  AlertRecord,
  AlertSeverity,
} from "@/data/alerts";
import {
  AlertTriangle,
  CalendarClock,
  CircleAlert,
  Info,
  MapPin,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

type AlertsListProps = {
  alerts: AlertRecord[];
  selectedAlertId: string;
  onSelect: (alert: AlertRecord) => void;
};

const severityStyles: Record<
  AlertSeverity,
  {
    icon: typeof CircleAlert;
    badge: string;
  }
> = {
  Critical: {
    icon: CircleAlert,
    badge: "border-red-200 bg-red-50 text-red-500",
  },
  Warning: {
    icon: AlertTriangle,
    badge: "border-orange-200 bg-orange-50 text-orange-600",
  },
  Info: {
    icon: Info,
    badge: "border-blue-200 bg-blue-50 text-blue-600",
  },
};

export default function AlertsList({
  alerts,
  selectedAlertId,
  onSelect,
}: AlertsListProps) {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<
    "All" | AlertSeverity
  >("All");

  const filteredAlerts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return alerts.filter((alert) => {
      const matchesSearch =
        !query ||
        alert.title.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query);

      const matchesSeverity =
        severity === "All" || alert.severity === severity;

      return matchesSearch && matchesSeverity;
    });
  }, [alerts, search, severity]);

  return (
    <section className="flex min-h-[calc(100vh-122px)] flex-col border-r border-[#dfe3e8] bg-white">
      <div className="border-b border-[#dfe3e8] px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-[-0.03em] text-[#202124]">
              Incident Alerts
            </h1>

            <p className="mt-1 text-xs text-[#667085]">
              Review and respond to active migration incidents.
            </p>
          </div>

          <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-bold text-red-500">
            {alerts.filter((alert) => alert.status === "New").length} New
          </span>
        </div>

        <label className="relative mt-5 block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search alerts, locations or IDs..."
            className="h-10 w-full rounded-md border border-[#d8dde5] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#202124]"
          />
        </label>

        <div className="mt-3 flex flex-wrap gap-2">
          {(["All", "Critical", "Warning", "Info"] as const).map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSeverity(item)}
                className={`rounded-md border px-3 py-1.5 text-[10px] font-semibold transition ${
                  severity === item
                    ? "border-[#202124] bg-[#202124] text-white"
                    : "border-[#d8dde5] bg-white text-[#667085] hover:text-[#202124]"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex-1 divide-y divide-[#e2e6eb] overflow-y-auto">
        {filteredAlerts.map((alert) => {
          const selected = alert.id === selectedAlertId;
          const severityConfig = severityStyles[alert.severity];
          const SeverityIcon = severityConfig.icon;

          return (
            <button
              key={alert.id}
              type="button"
              onClick={() => onSelect(alert)}
              className={`block w-full border-l-[3px] px-5 py-5 text-left transition ${
                selected
                  ? "border-[#202124] bg-[#f8f9fa]"
                  : "border-transparent bg-white hover:bg-[#fafbfc]"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  aria-label={`Select ${alert.title}`}
                  onClick={(event) => event.stopPropagation()}
                  className="mt-1 h-4 w-4"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm font-bold text-[#202124]">
                      {alert.title}
                    </h2>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-bold uppercase ${severityConfig.badge}`}
                    >
                      <SeverityIcon className="h-3 w-3" />
                      {alert.severity}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#667085]">
                    {alert.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-[#667085]">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5" />
                      {alert.date}
                    </span>

                    <span className="inline-flex items-center gap-1.5 uppercase">
                      <MapPin className="h-3.5 w-3.5" />
                      {alert.location}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-semibold text-[#202124]">
              No matching alerts
            </p>

            <p className="mt-2 text-xs text-[#667085]">
              Change the search term or severity filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}