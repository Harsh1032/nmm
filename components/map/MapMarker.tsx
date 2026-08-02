// src/components/map/MapMarker.tsx

"use client";

import type { MapMarkerData } from "@/data/map";
import {
  Building2,
  Home,
  Plane,
  UsersRound,
} from "lucide-react";

type MapMarkerProps = {
  marker: MapMarkerData;
  selected: boolean;
  onSelect: (marker: MapMarkerData) => void;
};

const markerStyles = {
  arrival: {
    icon: Plane,
    wrapper: "bg-blue-600",
  },
  shelter: {
    icon: Home,
    wrapper: "bg-emerald-600",
  },
  employer: {
    icon: Building2,
    wrapper: "bg-orange-600",
  },
  cluster: {
    icon: UsersRound,
    wrapper: "bg-purple-600",
  },
};

export default function MapMarker({
  marker,
  selected,
  onSelect,
}: MapMarkerProps) {
  const config = markerStyles[marker.type];
  const Icon = config.icon;

  return (
    <button
      type="button"
      aria-label={marker.label}
      onClick={() => onSelect(marker)}
      style={{
        left: `${marker.x}%`,
        top: `${marker.y}%`,
      }}
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
    >
      {selected && (
        <span className="absolute bottom-[calc(100%+10px)] left-1/2 w-max max-w-52 -translate-x-1/2 rounded-md border border-black/10 bg-white px-3 py-2 text-[10px] font-bold uppercase text-[#202124] shadow-lg">
          {marker.label}
        </span>
      )}

      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-white shadow-lg transition group-hover:scale-110 ${
          config.wrapper
        } ${selected ? "ring-4 ring-black/10" : ""}`}
      >
        <Icon className="h-5 w-5" />
      </span>
    </button>
  );
}