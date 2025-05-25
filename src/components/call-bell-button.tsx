"use client";

import * as React from 'react';
import { BellRing, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleCallBellTrigger } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/**
 * Represents the possible visual and operational states of the CallBellButton.
 */
type Status = 'idle' | 'pending' | 'success' | 'error';

/**
 * CallBellButton component allows users to trigger a call bell action.
 * It provides visual feedback for different states of the action (idle, pending, success, error)
 * and plays a sound upon successful activation.
 * It also includes error handling for audio loading and playback, and for the server action.
 */
export default function CallBellButton() {
  /**
   * Current status of the call bell button.
   */
  const [status, setStatus] = React.useState<Status>('idle');
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
    // Initialize Audio element on client-side only
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/success.mp3');
      audioRef.current.load(); // Preload the audio

      const handleCanPlayThrough = () => {
        console.log("Success sound ready to play.");
        setIsSoundReady(true);
      };

      const handleError = (e: Event) => {
        let errorMessage = "The audio could not be loaded. Please ensure the file exists at '/sounds/success.mp3' in the public directory and the format is supported.";
        let detailedErrorPayload: string | object = "Unknown error";

        if (audioRef.current && audioRef.current.error) {
            const mediaError = audioRef.current.error;
            const errorDetails = {
                code: mediaError.code,
                message: mediaError.message,
                type: "MediaError"
            };
            switch (mediaError.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    detailedErrorPayload = { ...errorDetails, specific: "The fetching process was aborted."};
                    userFriendlyMessage = "Audio loading was aborted by the browser.";
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    detailedErrorPayload = { ...errorDetails, specific: "A network error caused fetching to stop."};
                    userFriendlyMessage = "A network error prevented the sound from loading.";
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    detailedErrorPayload = { ...errorDetails, specific: "An error occurred while decoding the media resource."};
                     userFriendlyMessage = "The sound file could not be decoded. It might be corrupted.";
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    detailedErrorPayload = { ...errorDetails, specific: "The media resource format is not supported."};
                    userFriendlyMessage = "Sound file format may not be supported, or the file is missing/corrupted. Please check '/sounds/success.mp3'.";
                    break;
                default:
                    detailedErrorPayload = { ...errorDetails, specific: `An unknown MediaError occurred (code: ${mediaError.code}).`};
            }
            console.error("Audio Element Error Details:", detailedErrorPayload, e);
        } else if (e.target && (e.target as HTMLAudioElement).error) {
             const mediaError = (e.target as HTMLAudioElement).error;
              if (mediaError) {
                detailedErrorPayload = { code: mediaError.code, message: mediaError.message, type: "MediaErrorEventTarget" };
                // Update userFriendlyMessage based on common codes from event target if not already more specific
                 switch (mediaError.code) {
                        case MediaError.MEDIA_ERR_ABORTED:
                             if (detailedErrorPayload.specific === "Unknown error") userFriendlyMessage = "Audio loading was aborted by the browser.";
                            break;
                        case MediaError.MEDIA_ERR_NETWORK:
                             if (detailedErrorPayload.specific === "Unknown error") userFriendlyMessage = "A network error prevented the sound from loading.";
                            break;
                        case MediaError.MEDIA_ERR_DECODE:
                             if (detailedErrorPayload.specific === "Unknown error") userFriendlyMessage = "The sound file could not be decoded. It might be corrupted.";
                            break;
                        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                             if (detailedErrorPayload.specific === "Unknown error") userFriendlyMessage = "Sound file format may not be supported, or the file is missing/corrupted. Please check '/sounds/success.mp3'.";
                            break;
                    }
                console.error("Audio Element Error Details from event target:", detailedErrorPayload, e);
              } else {
                 console.error("Non-standard audio error event:", e);
                 detailedErrorPayload = "Non-standard error event on target.";
              }
        } else {
            console.error("Audio loading error event:", e);
        }

        console.error("Error loading success sound:", errorMessage, "Details:", detailedErrorPayload);
        setIsSoundReady(false);
         toast({
            title: "Audio Alert",
            description: userFriendlyMessage, // Use the potentially updated userFriendlyMessage
            variant: "default",
            duration: 5000, // Increased duration for visibility
         });
      };

      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.addEventListener('error', handleError);

      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.pause();
          audioRef.current.src = '';
          audioRef.current.load();
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [toast]);

  /**
   * Plays the success sound if it's ready.
   * Handles potential playback errors.
   */
  const playSuccessSound = React.useCallback(() => {
    if (audioRef.current && isSoundReady) {
        audioRef.current.currentTime = 0; // Rewind to start
        audioRef.current.play().catch(error => {
            console.error("Error playing success sound:", error);
            toast({
                title: "Playback Issue",
                description: "Could not play sound. Please interact with the page first or check browser permissions.",
                variant: "destructive",
                duration: 3000,
            });
        });
    } else if (audioRef.current && audioRef.current.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
         console.warn("Success sound not ready yet (isSoundReady: " + isSoundReady + ", readyState: " + audioRef.current.readyState + ").");
    } else if (!audioRef.current) {
        console.warn("Success sound audio element not available.");
    } else if (!isSoundReady) {
        console.warn("Success sound was not ready (isSoundReady: false).");
    }
  }, [isSoundReady, toast]);

  /**
   * Handles the click event on the call bell button.
   * It sets the status to 'pending', triggers the server action,
   * and updates the status and shows toasts based on the server response.
   */
  const handleClick = React.useCallback(async () => {
    if (status === 'pending') return;

    setStatus('pending');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      const result = await handleCallBellTrigger();
      if (result.success) {
        setStatus('success');
        playSuccessSound();
        toast({
          title: "Success!",
          description: "Help is on the way.",
          variant: "default",
          duration: 5000,
        });
        timeoutRef.current = setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        toast({
          title: "Error",
          description: `Failed to trigger call bell: ${result.error}`,
          variant: "destructive",
          duration: 5000,
        });
        timeoutRef.current = setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
       console.error("Error in handleClick during call bell trigger:", error);
       setStatus('error');
       const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
       toast({
          title: "System Error",
          description: `Could not process the request: ${errorMessage}`,
          variant: "destructive",
          duration: 5000,
       });
       timeoutRef.current = setTimeout(() => setStatus('idle'), 5000);
    }
  }, [status, toast, playSuccessSound]);

  /**
   * Determines the content (icon and text) of the button based on the current status.
   * @returns React elements representing the button's content.
   */
  const getButtonContent = () => {
    switch (status) {
      case 'pending':
        return (
          <>
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
            Calling...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="mr-2 h-10 w-10" />
            Called!
          </>
        );
       case 'error':
        return (
          <>
            <XCircle className="mr-2 h-10 w-10" />
            Error
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <BellRing className="mr-2 h-10 w-10" />
            Call Nurse
          </>
        );
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={status === 'pending'}
      variant={status === 'error' ? 'destructive' : status === 'success' ? 'default' : 'default'}
      className={cn(
        "h-48 w-64 text-2xl font-semibold rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2",
        status === 'idle' && "bg-accent text-accent-foreground hover:bg-accent/90",
        status === 'pending' && "bg-primary text-primary-foreground cursor-not-allowed",
        status === 'success' && "bg-success text-success-foreground hover:bg-success/90",
      )}
      aria-live="polite"
      aria-label={status === 'idle' ? "Call Nurse Button" : `Status: ${status}`}
    >
      {getButtonContent()}
    </Button>
  );
}
