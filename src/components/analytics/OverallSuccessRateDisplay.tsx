"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, Tooltip, YAxis } from 'recharts';
import type { OverallSRHistory } from '@/lib/types';

interface OverallSuccessRateDisplayProps {
  rate: number;
  history: OverallSRHistory;
}

export function OverallSuccessRateDisplay({ rate, history }: OverallSuccessRateDisplayProps) {
  // Ensure history has at least two points for a line to be drawn meaningfully
  const hasEnoughDataForChart = history && history.length >= 1;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6 pl-6 pr-6">
        <CardTitle className="text-sm font-medium">Overall Success Rate</CardTitle>
        <TrendingUp className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="flex flex-col p-6">
        <div className="text-4xl font-bold text-primary">{rate.toFixed(1)}%</div>
        <p className="text-xs text-muted-foreground mb-2">
          Based on current simulation parameters
        </p>
        {hasEnoughDataForChart ? (
          <div className="h-[80px] w-full mt-2"> {/* Adjusted height */}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 5, right: 0, left: -55, bottom: 0 }}> {/* Adjusted left margin for YAxis */}
                <YAxis 
                  hide={false} // Show YAxis
                  domain={[0, 100]} 
                  tickFormatter={(value) => `${value}%`} 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 10 }}
                  width={50} // Give some space for YAxis ticks
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--popover-foreground))',
                    fontSize: '0.75rem', // text-xs
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)'
                  }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                  labelFormatter={(label) => `Step ${label}`}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, "Overall SR"]}
                />
                <Line
                  type="monotone"
                  dataKey="overallSR"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[80px] w-full mt-2 flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Run simulation to see trend.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
