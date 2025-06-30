
import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-simulation-flow.ts';
// Removed imports for Sankey-dependent flows
// import '@/ai/flows/suggest-optimized-routing-rules.ts';
// import '@/ai/flows/analyze-transaction-anomalies.ts';

