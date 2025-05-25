
"use server";

import { triggerCallBell, type CallBellStatus } from "@/services/call-bell";
import type { CallRequestType } from "@/types/call-requests";

/**
 * Server action to trigger the call bell with a specific request type.
 * @param requestType - The type of assistance requested.
 * @returns A promise resolving to the status from the call bell service or an error object.
 */
export async function handleCallBellTrigger(requestType: CallRequestType): Promise<{ success: true; status: CallBellStatus } | { success: false; error: string }> {
  try {
    // For production, consider a more robust logging solution instead of console.log
    console.log(`Server Action: Triggering call bell for ${requestType}...`);
    const status = await triggerCallBell(requestType);
    console.log(`Server Action: Call bell for ${requestType} triggered successfully.`, status);

    // Add a slight delay to simulate network latency and allow user to see pending state
    // This should ideally only be for development/testing purposes.
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    return { success: true, status };
  } catch (error) {
    console.error(`Server Action: Error triggering call bell for ${requestType}:`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}
