import { PlayCircle, Loader2, PauseCircle, StopCircle } from 'lucide-react'; // Removed Zap
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  onStartSimulation: () => void;
  onPauseSimulation: () => void;
  onStopSimulation: () => void;
  simulationState: 'idle' | 'running' | 'paused';
}

export function Header({
  activeTab,
  onTabChange,
  onStartSimulation,
  onPauseSimulation,
  onStopSimulation,
  simulationState
}: HeaderProps) {
  const isSimulating = simulationState === 'running';
  const isPaused = simulationState === 'paused';
  const isIdle = simulationState === 'idle';

  return (
    <header className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="flex items-center gap-x-6">
        <div className="flex items-center gap-2">
          {/* Light mode logo */}
          <img
            src="/juspay-hyperswitch-1.jpg"
            alt="Hyperswitch Logo Light"
            className="block dark:hidden"
            style={{ height: 40 }}
          />
          {/* Dark mode logo (existing) */}
          <img
            src="https://hyperswitch.io/logos/juspay-hyperswitch.svg"
            alt="Hyperswitch Logo Dark"
            className="hidden dark:block"
            style={{ height: 40 }}
          />
        </div>
      </div>

      {/* Centered Tabs */}
      <div className="flex-grow flex justify-center">
        <Tabs value={activeTab} onValueChange={onTabChange} className="">
          <TabsList>
            <TabsTrigger value="intelligent-routing">Intelligent Routing</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center gap-2">
        {(isIdle || isPaused) && (
          <Button onClick={onStartSimulation} disabled={isSimulating} variant="primary" size="default">
            {isSimulating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <PlayCircle className="mr-2 h-5 w-5" />}
            {isPaused ? 'Resume Simulation' : 'Start Simulation'}
          </Button>
        )}
        {isSimulating && (
          <Button onClick={onPauseSimulation} variant="outline" size="default">
            <PauseCircle className="mr-2 h-5 w-5" />
            Pause Simulation
          </Button>
        )}
        {(isSimulating || isPaused) && (
          <Button onClick={onStopSimulation} variant="destructive" size="default">
            <StopCircle className="mr-2 h-5 w-5" />
            Stop Simulation
          </Button>
        )}
      </div>
    </header>
  );
}
