import {googleAI} from '@genkit-ai/googleai';
import {configureGenkit} from 'genkit';

export default configureGenkit({
  plugins: [
    googleAI({
      // You can specify your API key here, but we recommend using
      // environment variables for this.
      // apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  // Log developer-friendly errors to the console.
  logConfig: {
    logLevel: 'debug',
  },
  // We recommend using a tool like zod for developing structured flows.
  // See https://genkit.dev/docs/flows#defining-input-and-output-schemas
  enableTracingAndMetrics: true,
});
