"use client";

import { MerchantConnectorList } from "./processors/MerchantConnectorList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { MerchantConnector } from "@/lib/types"; 

interface ProcessorsTabViewProps {
  merchantConnectors: MerchantConnector[];
  isLoadingConnectors?: boolean; // Optional: to show a loading state
}

export function ProcessorsTabView({
  merchantConnectors,
  isLoadingConnectors = false,
}: ProcessorsTabViewProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-2 md:p-4 lg:p-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Merchant Connector Configuration</CardTitle>
            <CardDescription>
              View and manage connectors configured for your merchant account. 
              Toggles are currently for display purposes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingConnectors ? (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-muted-foreground">Loading merchant connectors...</p>
              </div>
            ) : (
              <MerchantConnectorList
                connectors={merchantConnectors}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
