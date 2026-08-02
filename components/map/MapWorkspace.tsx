// src/components/map/MapWorkspace.tsx

"use client";

import {
  mapMarkers,
  regionalRecords,
  type MapMarkerData,
} from "@/data/map";
import { useState } from "react";
import MapCanvas from "./MapCanvas";
import type {
  LayerVisibility,
  MapDisplayMode,
} from "./MapControls";
import RegionalRecords from "./RegionalRecords";

export default function MapWorkspace() {
  const [displayMode, setDisplayMode] =
    useState<MapDisplayMode>("standard");

  const [selectedMarker, setSelectedMarker] =
    useState<MapMarkerData | null>(mapMarkers[2]);

  const [layers, setLayers] = useState<LayerVisibility>({
    arrival: true,
    shelter: true,
    employer: true,
    cluster: true,
  });

  function handleLayerChange(key: keyof LayerVisibility) {
    setLayers((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <div className="grid min-w-0 xl:grid-cols-[minmax(0,1fr)_360px]">
      <MapCanvas
        markers={mapMarkers}
        selectedMarker={selectedMarker}
        onMarkerSelect={setSelectedMarker}
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        layers={layers}
        onLayerChange={handleLayerChange}
      />

      <RegionalRecords records={regionalRecords} />
    </div>
  );
}