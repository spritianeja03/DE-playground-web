"use client";

import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card"; 
import type { MerchantConnector } from "@/lib/types";

interface MerchantConnectorListProps {
  connectors: MerchantConnector[];
}

export function MerchantConnectorList({
  connectors,
}: MerchantConnectorListProps) {
  if (!connectors || connectors.length === 0) {
    return (
      <div className="py-4">
        <p className="text-sm text-muted-foreground">
          No merchant connectors loaded. Please ensure Merchant ID and API Key are correctly set.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {connectors.map((connector) => {
        const key = connector.merchant_connector_id || connector.connector_name;
        const displayName = connector.connector_label || connector.connector_name;
        return (
          <Card key={key} className="shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <Label className="font-medium"> 
                  {displayName}
                </Label>
                <span className="text-xs text-muted-foreground">
                  ID: {connector.merchant_connector_id} (Name: {connector.connector_name})
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
