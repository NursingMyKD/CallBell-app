
import type { CallRequestType } from '@/types/call-requests';

/**
 * Represents the status of the call bell system.
 */
export interface CallBellStatus {
  /**
   * Indicates whether the call bell is currently active.
   */
  isCallBellActive: boolean;
  /**
   * The type of request made, if applicable.
   */
  requestType?: CallRequestType;
  /**
   * A message associated with the call status.
   */
  message?: string;
}

/**
 * Asynchronously triggers the call bell for a specific request type.
 * @param requestType - The type of assistance requested by the patient.
 * @returns A promise that resolves to a CallBellStatus object indicating the new status of the call bell.
 */
export async function triggerCallBell(requestType: CallRequestType): Promise<CallBellStatus> {
  // TODO: Implement the call to the hospital's call bell system API,
  // including the requestType.
  // Replace this with the actual API call.

  console.log(`Call bell triggered for request: ${requestType}`);
  return {
    isCallBellActive: true,
    requestType: requestType,
    message: `Assistance for ${requestType} has been requested.`,
  };
}
