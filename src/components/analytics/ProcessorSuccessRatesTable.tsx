import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProcessorSuccessRate } from '@/lib/types';
import { BarChart3 } from "lucide-react";

interface ProcessorSuccessRatesTableProps {
  data: ProcessorSuccessRate[];
}

export function ProcessorSuccessRatesTable({ data }: ProcessorSuccessRatesTableProps) {
  return (
    <Card>
      <CardHeader className="pt-6 pl-6 pr-6">
        <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-6 w-6 text-primary" /> Connector-wise Stats</CardTitle>
        <CardDescription>Success and failure data per connector, with detailed breakdown.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Accordion type="multiple" className="w-full">
          {data.map((item) => {
            const failedPaymentCount = item.totalPaymentCount - item.successfulPaymentCount;
            return (
              <AccordionItem value={item.processor} key={item.processor}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4">
                    <span>{item.processor}</span>
                    <span className={item.sr >= 70 ? "text-green-500" : item.sr >= 40 ? "text-yellow-500" : "text-red-500"}>
                      Success Rate: {item.sr.toFixed(1)}%
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-2 space-y-3">
                    <div className="pt-2"> {/* This div acts as a container for the "cards" */}
                      <h4 className="text-sm font-semibold mb-2">Detailed Stats:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs p-2 border rounded-md bg-muted/40">
                        <div>
                          <div className="font-medium text-center">Total Payments:</div>
                          <div className="text-center">{item.totalPaymentCount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="font-medium text-green-600 text-center">Successful Payments:</div>
                          <div className="text-green-600 text-center">{item.successfulPaymentCount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="font-medium text-red-600 text-center">Failed Payments:</div>
                          <div className="text-red-600 text-center">{failedPaymentCount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
