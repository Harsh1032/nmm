// src/components/alerts/AlertsWorkspace.tsx

"use client";

import { alerts, type AlertRecord } from "@/data/alerts";
import { useState } from "react";
import AlertDetails from "./AlertDetails";
import AlertsList from "./AlertsList";

export default function AlertsWorkspace() {
  const [selectedAlert, setSelectedAlert] =
    useState<AlertRecord>(alerts[0]);

  return (
    <div className="grid min-w-0 xl:grid-cols-[540px_minmax(0,1fr)]">
      <AlertsList
        alerts={alerts}
        selectedAlertId={selectedAlert.id}
        onSelect={setSelectedAlert}
      />

      <AlertDetails
        key={selectedAlert.id}
        alert={selectedAlert}
      />
    </div>
  );
}