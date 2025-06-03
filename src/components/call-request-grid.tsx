
"use client";

import * as React from 'react';
import { Loader2 } from 'lucide-react';
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
      
      const handleError = (event: Event) => {
        let userFriendlyMessage = "Call sound effect could not be loaded.";
        let consoleLogMessage = "Error loading success sound. Ensure '/sounds/success.mp3' exists in public/sounds and is a supported format.";
        let errorPayload: object | string = { eventType: event.type };
        const audioEl = audioRef.current;

        if (audioEl && audioEl.error) {
          const mediaError = audioEl.error;
          errorPayload = {
            code: mediaError.code,
            message: mediaError.message || "No specific message.",
            type: "MediaError",
          };
          switch (mediaError.code) {
            case MediaError.MEDIA_ERR_ABORTED:
              userFriendlyMessage = "Audio loading was aborted by the browser.";
              consoleLogMessage += " (MEDIA_ERR_ABORTED: Fetching process aborted by user agent.)";
              break;
            case MediaError.MEDIA_ERR_NETWORK:
              userFriendlyMessage = "A network error prevented the sound from loading.";
              consoleLogMessage += " (MEDIA_ERR_NETWORK: Network error.)";
              break;
            case MediaError.MEDIA_ERR_DECODE:
              userFriendlyMessage = "The sound file may be corrupted or unreadable.";
              consoleLogMessage += " (MEDIA_ERR_DECODE: Error decoding media resource.)";
              break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              userFriendlyMessage = "Audio format not supported or file missing/corrupted. Check '/sounds/success.mp3'.";
              consoleLogMessage += " (MEDIA_ERR_SRC_NOT_SUPPORTED: Media resource format not suitable.)";
              break;
            default:
              userFriendlyMessage = `An unexpected audio loading error occurred (code: ${mediaError.code}).`;
              consoleLogMessage += ` (Unknown MediaError code: ${mediaError.code})`;
          }
        } else {
          consoleLogMessage += " (No specific MediaError object found on audio element, or audio element is null). Event type: " + event.type;
          errorPayload = "No specific MediaError details. Original event: " + event.type;
        }
        
        console.error(consoleLogMessage, "Internal Details:", errorPayload, "Original Event:", event);
        setIsSoundReady(false);
        toast({ title: "Audio Alert", description: userFriendlyMessage, variant: "destructive", duration: 5000 });
      };

      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.addEventListener('error', handleError);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.pause(); 
          audioRef.current.src = ''; // Release the resource
          audioRef.current.load(); // Reset
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
    } else {
      console.warn("Attempted to play sound, but it was not ready or audioRef is null. isSoundReady:", isSoundReady, "audioRef.current:", audioRef.current);
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
    <div className="flex flex-col items-center space-y-4 w-full max-w-xl md:max-w-3xl">
      {/* Status Display Area */}
      <div className="h-10 mb-2 md:mb-3 flex items-center justify-center w-full">
        {status === 'pending' && activeRequestType && (
          <div className="flex items-center text-lg md:text-xl p-2 md:p-2.5 rounded-md bg-primary/10 text-primary animate-pulse">
            <Loader2 className="mr-2.5 h-6 w-6 md:mr-3 md:h-7 md:w-7 animate-spin" />
            Calling for {activeRequestType}...
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full">
        {callRequestOptions.map((option: CallRequestOption) => (
          <Button
            key={option.type}
            onClick={() => handleSpecificRequest(option.type)}
            className={cn(
                "h-32 md:h-40 text-lg md:text-xl font-semibold rounded-xl md:rounded-2xl shadow-lg md:shadow-xl flex flex-col items-center justify-center p-3 md:p-4 transition-all focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2",
                status === 'success' && activeRequestType === option.type && "bg-success text-success-foreground hover:bg-success/90",
                status === 'error' && activeRequestType === option.type && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}
            variant={ 
              status === 'error' && activeRequestType === option.type
              ? 'destructive' 
              : 'default' 
            }
            disabled={status === 'pending'}
            aria-label={`Request ${option.label}`}
          >
            <option.icon className="h-12 w-12 md:h-16 md:w-16 mb-2 md:mb-3" />
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
