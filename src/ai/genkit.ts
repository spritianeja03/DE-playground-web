import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai'; // Import the Google AI plugin

// Removed GOOGLE_API_KEY constant and the warning block.
// The googleAI plugin will automatically use the GOOGLE_API_KEY environment variable.
// No explicit API key is passed here, relying on Genkit's default environment variable resolution.


export const ai = genkit({
  plugins: [
      googleAI()
  ],
});
