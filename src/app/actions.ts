"use server";

import { triggerCallBell, type CallBellStatus } from "@/services/call-bell";

/**
 * Server action to trigger the call bell.
 * @returns A promise resolving to the status from the call bell service or an error object.
 */
export async function handleCallBellTrigger(): Promise<{ success: true; status: CallBellStatus } | { success: false; error: string }> {
  try {
    // For production, consider a more robust logging solution instead of console.log
    console.log("Server Action: Triggering call bell...");
    const status = await triggerCallBell();
    console.log("Server Action: Call bell triggered successfully.", status);

    // Add a slight delay to simulate network latency and allow user to see pending state
    // This should ideally only be for development/testing purposes.
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    return { success: true, status };
  } catch (error) {
    console.error("Server Action: Error triggering call bell:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}
