'use server';
/**
 * @fileOverview A Genkit flow to summarize simulation performance.
 *
 * - summarizeSimulation - A function that generates a natural language summary of a simulation run.
 */
// No direct import of 'generate' is needed; we will call the defined prompt.
import { googleAI } from '@genkit-ai/googleai'; // For type reference if needed
import { ai } from '@/ai/genkit'; // The configured Genkit instance
// Removed unused 'z' import
// Removed 'defineFlow, generate' import as they are not used directly or come from 'ai'
import {
  SummarizeSimulationInputSchema,
  type AISummaryInput,
  SummarizeSimulationOutputSchema,
  type AISummaryOutput,
} from '@/lib/types';


export async function summarizeSimulation(input: AISummaryInput): Promise<AISummaryOutput> {
  return summarizeSimulationFlow(input);
}

// Define the prompt using ai.definePrompt
const summarizeSimulationUserApiKeyPrompt = ai.definePrompt({
  name: 'summarizeSimulationUserApiKeyPrompt', // Unique name
  input: { schema: SummarizeSimulationInputSchema }, // Includes apiKey
  output: { schema: SummarizeSimulationOutputSchema },
  // Associate the prompt with the googleAI plugin and specific model by default
  // This might help the plugin correctly interpret per-call config overrides.
  model: 'googleai/gemini-1.5-flash-latest', // Reverted to a known working model name
  prompt: `You are an expert payment routing analyst. Analyze the provided simulation data and transaction logs to generate a summary of critical switching triggers.

Overall Simulation Metrics:
- Target Payments: {{targetTotalPayments}}
- Processed Payments: {{totalPaymentsProcessed}}
- Overall Success Rate: {{overallSuccessRate}}% ({{totalSuccessful}} Succeeded, {{totalFailed}} Failed)
- Simulation Duration: {{simulationDurationSteps}} steps

Processor Performance Overview:
{{#each processorMetrics}}
- {{name}}: Processed {{volume}} transactions. Observed SR: {{observedSr}}%. Base SR: {{baseSr}}%.
{{/each}}

Active Incidents During Simulation:
{{#if incidents.length}}
{{#each incidents}}
{{#if this.isActive}}
- Incident was active for {{this.processorName}}.
{{/if}}
{{/each}}
{{else}}
- No incidents were active during the simulation.
{{/if}}

Transaction Log Analysis:
The following is a log of transactions showing the transaction number, status, and the connector used.
{{#each transactionLogs}}
Txn: {{this.transactionNumber}}, Status: {{this.status}}, Connector: {{this.connector}}, Timestamp: {{this.timestamp}}
{{/each}}

Based *primarily* on the detailed transactionLogs, identify and summarize the following in markdown format, similar to the example provided:

**Critical Switching Triggers**

**Major Transition Points:**
(List 2-3 major shifts in routing. Example: "1. Transaction [Number]: Biggest routing shift ([OldConnector] → [NewConnector])")

**Failure-Recovery Patterns:**
(List 2-3 observed patterns. Examples:
- Immediate Failover: PSP switches within 1-2 transactions after failures.
- Recovery Testing: Failed PSPs get retried after 10-20 transaction gaps.
- Performance-Based: Better-performing PSPs get more sustained usage.)

Focus on how dynamic successes and failures, as seen in the transaction logs, affected routing decisions to different processors.
The goal is to understand the switching patterns and how the system reacted to successes and failures.
Be specific with transaction numbers where possible when describing transition points.
`,
});

const summarizeSimulationFlow = ai.defineFlow(
  {
    name: 'summarizeSimulationFlow',
    inputSchema: SummarizeSimulationInputSchema,
    outputSchema: SummarizeSimulationOutputSchema,
    // Removed 'plugins' array from here, as it causes global API key issues
  },
  async (input: AISummaryInput) => {
    try {
      // Call the defined prompt.
      // The model is set in definePrompt.
      // The googleAI plugin will automatically use the GOOGLE_API_KEY environment variable.
      console.log('Calling AI model for simulation summary.');
      const result = await summarizeSimulationUserApiKeyPrompt(input);

      const output = result.output;
      if (!output) {
        console.error('AI prompt call returned no output for summarizeSimulationFlow.');
        throw new Error('AI failed to generate a summary (no output).');
      }
      return output;
    } catch (error) {
      console.error('Error calling AI model in summarizeSimulationFlow:', error);
      throw new Error(`AI summary generation encountered an error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);
