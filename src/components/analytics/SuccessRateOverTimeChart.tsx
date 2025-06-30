"use client";

import React, { useMemo } from 'react'; // Added useMemo
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart } from 'lucide-react';
import type { ProcessorMetricsHistory, MerchantConnector } from '@/lib/types';

interface SuccessRateOverTimeChartProps {
  data: ProcessorMetricsHistory;
  merchantConnectors: MerchantConnector[];
  connectorToggleStates: Record<string, boolean>;
}

const chartColorKeys = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'] as const;

// Helper function to get all unique processor IDs from the data
const getAllProcessorIds = (history: ProcessorMetricsHistory): string[] => {
  if (!history || history.length === 0) {
    return [];
  }
  const processorIdSet = new Set<string>();
  history.forEach(dataPoint => {
    Object.keys(dataPoint).forEach(key => {
      if (key !== 'time') {
        processorIdSet.add(key);
      }
    });
  });
  return Array.from(processorIdSet);
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, merchantConnectors }: any) => { 
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-popover border border-border rounded-lg shadow-xs text-popover-foreground text-xs">
        <p className="mb-2 font-semibold text-sm">Time: {label}</p>
        {payload.map((pld: any, index: number) => {
          // pld.name is the processorId (dataKey). We need to resolve it to connector_label.
          const connector = merchantConnectors?.find((mc: MerchantConnector) => (mc.merchant_connector_id || mc.connector_name) === pld.name);
          const displayName = connector ? connector.connector_name : pld.name;
          return (
            <div key={index} className="mb-1.5 last:mb-0">
              <div className="flex items-center mb-0.5">
                <div style={{ width: '10px', height: '10px', backgroundColor: pld.stroke, marginRight: '6px', borderRadius: '2px' }} />
                <span className="font-medium text-popover-foreground">{displayName}</span>
              </div>
              <p className="pl-[16px]">
                Success Rate: <span className="font-semibold">{parseFloat(pld.value).toFixed(1)}%</span>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};


export function SuccessRateOverTimeChart({ data, merchantConnectors, connectorToggleStates }: SuccessRateOverTimeChartProps) {
  const uniqueProcessorIds = getAllProcessorIds(data); // Get processor IDs from original data to ensure all are included

  const processorColorMap = useMemo(() => {
    const map = new Map<string, string>();
    uniqueProcessorIds.forEach((processorId, i) => {
      map.set(processorId, `hsl(var(${chartColorKeys[i % chartColorKeys.length]}))`);
    });
    return map;
  }, [uniqueProcessorIds]);

  if (!data || data.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="p-6">
          <CardTitle className="flex items-center"><LineChart className="mr-2 h-5 w-5 text-primary" /> Success Rate Over Time</CardTitle>
          <CardDescription>Processor success rates as the simulation progresses.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center p-6">
          <p className="text-muted-foreground">No success rate data available yet. Run a simulation.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center"><LineChart className="mr-2 h-5 w-5 text-primary" /> Success Rate Over Time</CardTitle>
        <CardDescription>Processor success rates as the simulation progresses.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))" 
              tickFormatter={(timestamp) => {
                if (typeof timestamp !== 'number') return ''; // Handle cases where timestamp might not be a number
                const date = new Date(timestamp);
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
              }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              domain={[0, 100]}
              tickFormatter={(value) => String(Math.round(value))} // Display numbers for percentage
              width={45} // Slightly increased width for potential 3-digit numbers if label is very close
              label={{ value: 'Success Rate', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))', fontSize: 12, dy: 40, dx: -10 }}
            />
            <Tooltip 
              content={<CustomTooltip merchantConnectors={merchantConnectors} />} // Pass merchantConnectors to CustomTooltip
              labelFormatter={(timestamp) => { // Format time in tooltip header
                if (typeof timestamp !== 'number') return '';
                const date = new Date(timestamp);
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
              }}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))', paddingTop: '10px' }} />
            {data && data.length > 0 && Object.keys(data[0])
              .filter(key => key !== 'time' && connectorToggleStates[key] === true)
              .map((processorId, index) => {
              const connector = merchantConnectors.find(mc => (mc.merchant_connector_id || mc.connector_name) === processorId);
              const displayName = connector ? connector.connector_name : processorId;
              return (
                <Area
                  key={processorId}
                  type="monotone"
                  dataKey={processorId}
                  name={displayName} // Use resolved displayName for Legend
                  stroke={processorColorMap.get(processorId)}
                  fill={processorColorMap.get(processorId)}
                  fillOpacity={0.2}
                  strokeWidth={2}
                  dot={{ r: 1, strokeWidth: 1 }}
                  activeDot={{ r: 4, strokeWidth: 1 }}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
