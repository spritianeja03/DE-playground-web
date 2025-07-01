import type React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-gray-50 dark:bg-background overflow-hidden">
      <main 
        className="flex-grow flex flex-col overflow-hidden h-full"
      >
        {children}
      </main>
    </div>
  );
}
