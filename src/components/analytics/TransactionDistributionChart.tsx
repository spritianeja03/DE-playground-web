"use client"

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react'; // Renamed to avoid conflict
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"; // Removed Text
import React, { useEffect, useRef, useMemo, useCallback } from 'react'; // Added useCallback
import type { MerchantConnector } from '@/lib/types'; // Import MerchantConnector

interface TransactionDistributionChartProps {
  data: Array<{ name: string; value: number; fill?: string }>; // Made fill optional
  merchantConnectors: MerchantConnector[]; // Added merchantConnectors prop
}

// Predefined direct HSL color strings for the pie chart
// These correspond to --chart-1 to --chart-5 from globals.css's dark theme
const PIE_CHART_COLORS = [
  'hsl(44, 96%, 51%)',
  'hsl(218, 57%, 54%)',
  'hsl(354, 70%, 50%)',
  'hsl(112, 16%, 52%)',
  'hsl(274, 74%, 66%)',
];

// Helper function to get all unique names from the merchantConnectors for stable ordering
const getAllNamesFromConnectors = (merchantConnectors: MerchantConnector[]): string[] => {
  if (!merchantConnectors || merchantConnectors.length === 0) {
    return [];
  }
  // Use connector_name for stable ordering
  return merchantConnectors.map(connector => connector.connector_name).sort(); // Sort to ensure consistent order
};

export function TransactionDistributionChart({ data, merchantConnectors }: TransactionDistributionChartProps) {
  const previousDataRef = useRef<Array<{ name: string; value: number; fill?: string }>>([]);

  // Use merchantConnectors to get unique names for stable color mapping
  const uniqueNames = getAllNamesFromConnectors(merchantConnectors); 

  const nameColorMap = useMemo(() => {
    const map = new Map<string, string>();
    uniqueNames.forEach((name, i) => {
      map.set(name, PIE_CHART_COLORS[i % PIE_CHART_COLORS.length]);
    });
    console.log('Generated nameColorMap:', map); // Debugging output
    return map;
  }, [uniqueNames]);

  useEffect(() => {
    if (data && data.length > 0 && data.some(item => item.value > 0)) {
      previousDataRef.current = data;
    }
  }, [data]);

  const currentData = (data && data.length > 0 && data.some(item => item.value > 0)) ? data : previousDataRef.current;
  const hasData = currentData && currentData.length > 0 && currentData.some(item => item.value > 0);
  const totalValue = useMemo(() => currentData.reduce((sum, entry) => sum + entry.value, 0), [currentData]);

  const renderCustomizedLabel = useCallback(({ cx, cy, midAngle, outerRadius, percent, index, name }: any) => {
    if (totalValue === 0) return null; // Avoid division by zero

    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20; // Distance from the center to the label
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="hsl(var(--foreground))"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }, [totalValue]);

  return (
    <Card>
      <CardHeader className="pt-6 pl-6 pr-6">
        <CardTitle className="flex items-center"><PieChartIcon className="mr-2 h-6 w-6 text-primary" /> Transaction Distribution</CardTitle>
        <CardDescription>Processor-wise distribution of transactions.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-[300px]">
        {hasData ? (
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Legend 
                wrapperStyle={{ color: 'hsl(var(--foreground))', fontSize: '12px', paddingTop: '10px' }}
                formatter={(value, entry) => (
                  <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
                )}
              />
              <Pie
                data={currentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
                label={renderCustomizedLabel} // Add the label prop here
                fontSize={12}
                stroke="hsl(var(--background))" // Use direct background for stroke between cells
                strokeWidth={2}
              >
                {currentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={nameColorMap.get(entry.name)} // Use stable color map
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-10">
             <Image
                src="https://placehold.co/300x150.png?text=No+Distribution+Data"
                alt="Distribution Chart Placeholder"
                width={300}
                height={150}
                className="rounded-md shadow-sm opacity-50"
                data-ai-hint="pie chart"
            />
            <p className="mt-2 text-sm text-muted-foreground">Chart data will appear here after simulation.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
