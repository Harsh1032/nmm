// src/components/map/MapCanvas.tsx

"use client";

import type { MapMarkerData } from "@/data/map";
import MapMarker from "./MapMarker";
import type {
  LayerVisibility,
  MapDisplayMode,
} from "./MapControls";
import MapControls from "./MapControls";

type MapCanvasProps = {
  markers: MapMarkerData[];
  selectedMarker: MapMarkerData | null;
  onMarkerSelect: (marker: MapMarkerData) => void;
  displayMode: MapDisplayMode;
  onDisplayModeChange: (mode: MapDisplayMode) => void;
  layers: LayerVisibility;
  onLayerChange: (key: keyof LayerVisibility) => void;
};

function getCanvasBackground(mode: MapDisplayMode) {
  if (mode === "satellite") {
    return {
      backgroundColor: "#d7d9d4",
      backgroundImage:
        "linear-gradient(45deg, rgba(82,91,76,0.15) 25%, transparent 25%), linear-gradient(-45deg, rgba(82,91,76,0.15) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(82,91,76,0.15) 75%), linear-gradient(-45deg, transparent 75%, rgba(82,91,76,0.15) 75%)",
      backgroundSize: "80px 80px",
      backgroundPosition: "0 0, 0 40px, 40px -40px, -40px 0px",
    };
  }

  if (mode === "heatmap") {
    return {
      backgroundColor: "#f1f2f4",
      backgroundImage:
        "radial-gradient(circle at 42% 45%, rgba(168,85,247,0.28), transparent 18%), radial-gradient(circle at 70% 38%, rgba(249,115,22,0.25), transparent 19%), radial-gradient(circle at 52% 76%, rgba(16,185,129,0.22), transparent 20%)",
    };
  }

  return {
    backgroundColor: "#f3f4f6",
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)",
    backgroundSize: "52px 52px",
  };
}

export default function MapCanvas({
  markers,
  selectedMarker,
  onMarkerSelect,
  displayMode,
  onDisplayModeChange,
  layers,
  onLayerChange,
}: MapCanvasProps) {
  const visibleMarkers = markers.filter((marker) => layers[marker.type]);

  return (
    <section className="relative min-h-170 overflow-hidden bg-[#f3f4f6] xl:min-h-[calc(100vh-122px)]">
      <div
        className="absolute inset-0 transition-all duration-300"
        style={getCanvasBackground(displayMode)}
      />

      <div className="absolute left-[38%] top-[42%] h-24 w-28 bg-black/8" />

      <MapControls
        displayMode={displayMode}
        onDisplayModeChange={onDisplayModeChange}
        layers={layers}
        onLayerChange={onLayerChange}
      />

      {visibleMarkers.map((marker) => (
        <MapMarker
          key={marker.id}
          marker={marker}
          selected={selectedMarker?.id === marker.id}
          onSelect={onMarkerSelect}
        />
      ))}

      <div className="absolute bottom-5 left-5 z-30 hidden rounded-lg border border-black/5 bg-white px-4 py-3 shadow-md sm:block">
        <div className="flex flex-wrap items-center gap-4 text-[9px] font-bold uppercase">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Arrivals
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            Shelters
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-600" />
            Employers
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-600" />
            Clusters
          </span>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-30 rounded-md bg-white/80 px-3 py-2 text-[9px] uppercase text-[#98a0ae] backdrop-blur">
        LOC: 1.2921° S, 36.8219° E | Zoom: 12.4x
      </div>
    </section>
  );
}