"use client";

import type React from 'react';
import { SuccessRateOverTimeChart } from './analytics/SuccessRateOverTimeChart';
import { VolumeOverTimeChart } from './analytics/VolumeOverTimeChart';
import type { ProcessorMetricsHistory, MerchantConnector } from '@/lib/types'; 

interface AnalyticsGraphsViewProps {
  successRateHistory: ProcessorMetricsHistory;
  volumeHistory: ProcessorMetricsHistory;
  merchantConnectors: MerchantConnector[]; 
  connectorToggleStates: Record<string, boolean>;
}

export function AnalyticsGraphsView({
  successRateHistory,
  volumeHistory,
  merchantConnectors,
  connectorToggleStates,
}: AnalyticsGraphsViewProps) {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <SuccessRateOverTimeChart data={successRateHistory} merchantConnectors={merchantConnectors} connectorToggleStates={connectorToggleStates} />
      <VolumeOverTimeChart data={volumeHistory} merchantConnectors={merchantConnectors} connectorToggleStates={connectorToggleStates} />
     
    </div>
  );
}
