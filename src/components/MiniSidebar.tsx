import React from 'react';
import { Settings2, VenetianMaskIcon, Zap, TrendingUp, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useState } from 'react';

interface MiniSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const MiniSidebar: React.FC<MiniSidebarProps> = ({ activeSection, onSectionChange, collapsed, onToggleCollapse }) => {
  // Theme toggle state
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="bg-white dark:bg-card border-r border-gray-200 dark:border-border rounded-none flex flex-col h-full justify-between items-center w-16 py-4 gap-4 z-30">
      <div className="flex flex-col gap-4">
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <button
              className={`p-2 rounded ${activeSection === 'general' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
              onClick={() => onSectionChange('general')}
              aria-label="General"
            >
              <Settings2 className={`h-6 w-6 ${activeSection === 'general' ? 'stroke-primary text-primary' : ''}`} />
            </button>
          </Tooltip.Trigger>
          {collapsed && <Tooltip.Content side="right" align="center">General</Tooltip.Content>}
        </Tooltip.Root>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <button
              className={`p-2 rounded ${activeSection === 'processors' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
              onClick={() => onSectionChange('processors')}
              aria-label="Processors"
            >
              <VenetianMaskIcon className={`h-6 w-6 ${activeSection === 'processors' ? 'stroke-primary text-primary' : ''}`} />
            </button>
          </Tooltip.Trigger>
          {collapsed && <Tooltip.Content side="right" align="center">Processors</Tooltip.Content>}
        </Tooltip.Root>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <button
              className={`p-2 rounded ${activeSection === 'routing' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
              onClick={() => onSectionChange('routing')}
              aria-label="Routing"
            >
              <Zap className={`h-6 w-6 ${activeSection === 'routing' ? 'stroke-primary text-primary' : ''}`} />
            </button>
          </Tooltip.Trigger>
          {collapsed && <Tooltip.Content side="right" align="center">Routing</Tooltip.Content>}
        </Tooltip.Root>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <button
              className={`p-2 rounded ${activeSection === 'test-payment-data' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
              onClick={() => onSectionChange('test-payment-data')}
              aria-label="Test Payment Data"
            >
              <TrendingUp className={`h-6 w-6 ${activeSection === 'test-payment-data' ? 'stroke-primary text-primary' : ''}`} />
            </button>
          </Tooltip.Trigger>
          {collapsed && <Tooltip.Content side="right" align="center">Test Payment Data</Tooltip.Content>}
        </Tooltip.Root>
      </div>
      <div className="flex flex-col gap-4 items-center mb-2">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl border border-border bg-muted hover:bg-primary transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
        <button
          onClick={() => setIsDark((d) => !d)}
          className="p-2 rounded-xl border border-border bg-muted hover:bg-accent transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-600" />}
        </button>
      </div>
    </div>
  );
}; 