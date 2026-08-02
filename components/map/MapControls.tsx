// src/components/map/MapControls.tsx

"use client";

import {
  Check,
  Layers3,
  MoreVertical,
} from "lucide-react";

export type MapDisplayMode = "standard" | "satellite" | "heatmap";

export type LayerVisibility = {
  arrival: boolean;
  shelter: boolean;
  employer: boolean;
  cluster: boolean;
};

type MapControlsProps = {
  displayMode: MapDisplayMode;
  onDisplayModeChange: (mode: MapDisplayMode) => void;
  layers: LayerVisibility;
  onLayerChange: (key: keyof LayerVisibility) => void;
};

const modes: Array<{
  label: string;
  value: MapDisplayMode;
}> = [
  { label: "Standard", value: "standard" },
  { label: "Satellite", value: "satellite" },
  { label: "Heatmap", value: "heatmap" },
];

const layerItems: Array<{
  key: keyof LayerVisibility;
  label: string;
  dotClassName: string;
}> = [
  {
    key: "arrival",
    label: "Arrival Points",
    dotClassName: "bg-blue-600",
  },
  {
    key: "shelter",
    label: "Support Shelters",
    dotClassName: "bg-emerald-600",
  },
  {
    key: "employer",
    label: "Employer Sites",
    dotClassName: "bg-orange-600",
  },
  {
    key: "cluster",
    label: "Regional Clusters",
    dotClassName: "bg-purple-600",
  },
];

export default function MapControls({
  displayMode,
  onDisplayModeChange,
  layers,
  onLayerChange,
}: MapControlsProps) {
  return (
    <>
      <div className="absolute left-5 top-5 z-30">
        <div className="flex rounded-lg border border-black/10 bg-white p-1 shadow-md">
          {modes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => onDisplayModeChange(mode.value)}
              className={`rounded-md px-4 py-2 text-xs font-medium transition ${
                displayMode === mode.value
                  ? "bg-[#f0f1f3] text-[#202124] shadow-sm"
                  : "text-[#667085] hover:text-[#202124]"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="mt-3 w-28 rounded-lg border border-black/10 bg-white p-3 shadow-md">
          <p className="text-[9px] font-bold uppercase text-[#667085]">
            Zoom
          </p>

          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d8dde5] text-lg"
            >
              +
            </button>

            <div className="h-1 w-7 rounded-full bg-[#202124]" />

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d8dde5] text-lg"
            >
              −
            </button>
          </div>
        </div>
      </div>

      <section className="absolute right-5 top-5 z-30 hidden w-72.5 rounded-xl border border-black/10 bg-white p-5 shadow-lg lg:block">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold text-[#202124]">
            <Layers3 className="h-4 w-4" />
            Map Layers
          </h2>

          <button
            type="button"
            aria-label="Map layer options"
            className="rounded p-1 hover:bg-[#f2f3f5]"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#667085]">
          Visibility
        </p>

        <div className="mt-3 space-y-3">
          {layerItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onLayerChange(item.key)}
              className="flex w-full items-center gap-2 text-left text-xs text-[#202124]"
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                  layers[item.key]
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-[#adb5c1] bg-white"
                }`}
              >
                {layers[item.key] && <Check className="h-3 w-3" />}
              </span>

              <span
                className={`h-2 w-2 rounded-full ${item.dotClassName}`}
              />

              {item.label}
            </button>
          ))}
        </div>

        <div className="my-5 h-px bg-[#e2e6eb]" />

        <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#667085]">
          Filter Data
        </p>

        <div className="mt-3 space-y-3">
          <select className="h-10 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-xs outline-none">
            <option>All Nationalities</option>
            <option>Ugandan</option>
            <option>Kenyan</option>
            <option>Rwandan</option>
            <option>Somalian</option>
          </select>

          <select className="h-10 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-xs outline-none">
            <option>All Visa Statuses</option>
            <option>Valid</option>
            <option>Expiring</option>
            <option>Pending</option>
          </select>

          <button
            type="button"
            className="h-10 w-full rounded-md bg-[#181818] text-xs font-semibold text-white"
          >
            Apply View
          </button>
        </div>
      </section>
    </>
  );
}