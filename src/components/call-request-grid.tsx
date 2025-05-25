
"use client";

import * as React from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleCallBellTrigger } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { callRequestOptions, type CallRequestType, type CallRequestOption } from '@/types/call-requests';

/**
 * Represents the possible visual and operational states of the call requests.
 */
type Status = 'idle' | 'pending' | 'success' | 'error';

/**
 * CallRequestGrid component displays a grid of specific call request options
 * (e.g., Water, Restroom). It handles user interaction, triggers server actions,
 * provides visual feedback, and plays a sound on success.
 */
export default function CallRequestGrid() {
  /**
   * Current status of the last activated call request.
   */
  const [status, setStatus] = React.useState<Status>('idle');
  /**
   * The type of the currently active or last activated request.
   */
  const [activeRequestType, setActiveRequestType] = React.useState<CallRequestType | null>(null);
  const { toast } = useToast();
  /**
   * Ref to store the timeout ID for resetting the status to 'idle'.
   */
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  /**
   * Ref to the HTMLAudioElement for playing the success sound.
   */
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  /**
   * State to track if the success sound is loaded and ready to play.
   */
  const [isSoundReady, setIsSoundReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/success.mp3');
      audioRef.current.load();

      const handleCanPlayThrough = () => {
        console.log("Success sound ready to play.");
        setIsSoundReady(true);
      };
      
      const handleError = (e: Event) => {
        let userFriendlyMessage = "Call sound effect could not be loaded.";
        let detailedErrorPayload: string | object = "Unknown error";

        if (audioRef.current && audioRef.current.error) {
            const mediaError = audioRef.current.error;
            const errorDetails = { code: mediaError.code, message: mediaError.message, type: "MediaError" };
            switch (mediaError.code) {
                case MediaError.MEDIA_ERR_ABORTED: detailedErrorPayload = { ...errorDetails, specific: "The fetching process was aborted."}; userFriendlyMessage = "Audio loading was aborted."; break;
                case MediaError.MEDIA_ERR_NETWORK: detailedErrorPayload = { ...errorDetails, specific: "A network error caused fetching to stop."}; userFriendlyMessage = "Network error loading audio."; break;
                case MediaError.MEDIA_ERR_DECODE: detailedErrorPayload = { ...errorDetails, specific: "An error occurred while decoding."}; userFriendlyMessage = "Audio file corrupted or unreadable."; break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: detailedErrorPayload = { ...errorDetails, specific: "The media resource format is not supported."}; userFriendlyMessage = "Audio format not supported or file missing. Check '/sounds/success.mp3'."; break;
                default: detailedErrorPayload = { ...errorDetails, specific: `Unknown MediaError (code: ${mediaError.code}).`};
            }
            console.error("Audio Element Error Details:", detailedErrorPayload, e);
        } else if (e.target && (e.target as HTMLAudioElement).error) {
             const mediaError = (e.target as HTMLAudioElement).error;
              if (mediaError) { detailedErrorPayload = { code: mediaError.code, message: mediaError.message, type: "MediaErrorEventTarget" }; console.error("Audio Element Error Details from event target:", detailedErrorPayload, e); } 
              else { detailedErrorPayload = "Non-standard error event on target."; console.error("Non-standard audio error event:", e); }
        } else { console.error("Audio loading error event:", e); }
        
        console.error("Error loading success sound:", "Please ensure the file exists at '/sounds/success.mp3' and is a supported format.", "Internal Details:", detailedErrorPayload);
        setIsSoundReady(false);
        toast({ title: "Audio Alert", description: userFriendlyMessage, variant: "default", duration: 5000 });
      };

      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.addEventListener('error', handleError);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.pause(); audioRef.current.src = ''; audioRef.current.load();
        }
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [toast]);

  /**
   * Plays the success sound if it's ready.
   */
  const playSuccessSound = React.useCallback(() => {
    if (audioRef.current && isSoundReady) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Error playing success sound:", error);
        toast({ title: "Playback Issue", description: "Could not play sound. Browser interaction might be required.", variant: "destructive", duration: 3000 });
      });
    }
  }, [isSoundReady, toast]);

  /**
   * Resets the status of the component to 'idle'.
   */
  const resetToIdle = () => {
    setStatus('idle');
    setActiveRequestType(null);
  };

  /**
   * Handles a specific call request. Sets pending state, calls server action,
   * and updates UI based on the outcome.
   * @param requestType - The type of assistance requested.
   */
  const handleSpecificRequest = React.useCallback(async (requestType: CallRequestType) => {
    if (status === 'pending') return;

    setStatus('pending');
    setActiveRequestType(requestType);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      const result = await handleCallBellTrigger(requestType);
      if (result.success) {
        setStatus('success');
        playSuccessSound();
        toast({
          title: "Success!",
          description: result.status.message || `${requestType} request sent. Help is on the way.`,
          variant: "default",
          duration: 5000,
        });
      } else {
        setStatus('error');
        toast({
          title: "Error",
          description: `Failed to send ${requestType} request: ${result.error}`,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(`Error in handleSpecificRequest for ${requestType}:`, error);
      setStatus('error');
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "System Error",
        description: `Could not process ${requestType} request: ${errorMessage}`,
        variant: "destructive",
        duration: 5000,
      });
    }
    timeoutRef.current = setTimeout(resetToIdle, 5000);
  }, [status, toast, playSuccessSound]);

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-2xl">
      {/* Status Display Area */}
      <div className="h-10 mb-2"> {/* Reserve space for status message */}
        {status === 'pending' && activeRequestType && (
          <div className="flex items-center text-lg p-2 rounded-md bg-primary/10 text-primary-foreground animate-pulse">
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            Calling for {activeRequestType}...
          </div>
        )}
        {/* Success and error messages are primarily handled by toasts, but a temporary visual cue could be added here if desired */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {callRequestOptions.map((option: CallRequestOption) => (
          <Button
            key={option.type}
            onClick={() => handleSpecificRequest(option.type)}
            className={cn(
                "h-36 md:h-40 text-xl font-medium rounded-xl shadow-lg flex flex-col items-center justify-center p-3 transition-all",
                status === 'success' && activeRequestType === option.type && "bg-success text-success-foreground hover:bg-success/90",
                status === 'error' && activeRequestType === option.type && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}
            variant={
              (status === 'success' && activeRequestType === option.type) || (status === 'error' && activeRequestType === option.type)
              ? 'default' // Allows success/destructive colors to take over
              : 'secondary'
            }
            disabled={status === 'pending'}
            aria-label={`Request ${option.label}`}
          >
            <option.icon className="h-12 w-12 mb-2" />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
