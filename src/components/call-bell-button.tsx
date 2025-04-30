
"use client";

import * as React from 'react';
import { BellRing, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleCallBellTrigger } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Status = 'idle' | 'pending' | 'success' | 'error';

// NOTE: Ensure you have a sound file at /sounds/success.mp3 in your public directory.
const SUCCESS_SOUND_PATH = '/sounds/success.mp3';

export default function CallBellButton() {
  const [status, setStatus] = React.useState<Status>('idle');
  const [isSoundReady, setIsSoundReady] = React.useState(false);
  const { toast } = useToast();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Initialize audio element on the client side after mount
  React.useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== 'undefined') {
      try {
        audioRef.current = new Audio(SUCCESS_SOUND_PATH);
        audioRef.current.load(); // Preload the audio file

        const handleCanPlay = () => {
          console.log("Success sound ready to play.");
          setIsSoundReady(true);
        };

        const handleError = (e: Event | string) => {
            let errorMessage = "Unknown audio error";
            let detailedError: MediaError | null | string = null;

            if (typeof e === 'string') {
                errorMessage = e;
                detailedError = e;
            } else if (e.target instanceof HTMLMediaElement && e.target.error) {
                const mediaError = e.target.error;
                detailedError = mediaError; // Keep the MediaError object
                switch (mediaError.code) {
                    case MediaError.MEDIA_ERR_ABORTED:
                        errorMessage = 'Audio playback aborted.';
                        break;
                    case MediaError.MEDIA_ERR_NETWORK:
                        errorMessage = 'A network error caused the audio download to fail.';
                        break;
                    case MediaError.MEDIA_ERR_DECODE:
                        errorMessage = 'The audio playback was aborted due to a corruption problem or because the audio used features your browser did not support.';
                        break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        errorMessage = `The audio could not be loaded. Please ensure the file exists at '${SUCCESS_SOUND_PATH}' in the public directory and the format is supported.`;
                        break;
                    default:
                        errorMessage = `An unknown error occurred (code: ${mediaError.code}, message: ${mediaError.message}).`;
                }
                // Log more specific details from the MediaError object
                console.error("Audio Element Error Details:", { code: mediaError.code, message: mediaError.message }, e);
            } else {
                // Log the event object itself if it's not a standard MediaError event
                console.error("Non-standard audio error event:", e);
                detailedError = "Non-standard error event";
            }
          console.error("Error loading success sound:", errorMessage, "Details:", detailedError);
          setIsSoundReady(false);
          // Optional: Notify user sound won't play
           toast({
             title: "Audio Issue",
             description: `Confirmation sound could not be loaded: ${errorMessage}`,
             variant: "destructive",
             duration: 7000, // Increased duration for visibility
           });
        };

        // Add event listeners
        audioRef.current.addEventListener('canplaythrough', handleCanPlay);
        audioRef.current.addEventListener('error', handleError);

        // Cleanup function to remove listeners
        const cleanup = () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
            audioRef.current.removeEventListener('error', handleError);
            // Pause and release resources
            audioRef.current.pause();
            audioRef.current.src = ""; // Detach source
            audioRef.current.load(); // Reset state
            audioRef.current = null; // Release the reference
          }
        };
        return cleanup;

      } catch (error) {
         console.error("Failed to initialize Audio element:", error);
         setIsSoundReady(false);
      }
    }

    // Cleanup timeout on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [toast]); // Add toast to dependency array

  const playSuccessSound = React.useCallback(() => {
    if (audioRef.current && isSoundReady) {
       // Double-check readiness state just before playing
       if (audioRef.current.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        audioRef.current.currentTime = 0; // Rewind to the start
        audioRef.current.play().then(() => {
          console.log("Success sound played.");
        }).catch(error => {
          console.error("Error playing success sound:", error);
          // Provide feedback to the user that sound failed
          toast({
            title: "Audio Playback Issue",
            description: "Could not play the confirmation sound. Please check browser permissions or audio settings.",
            variant: "destructive",
            duration: 3000,
          });
        });
      } else {
        console.warn("Success sound reported ready, but readyState is low. Attempting to play might fail.", audioRef.current.readyState);
        // Avoid playing if not truly ready to prevent errors like "The operation is not supported."
      }
    } else if (!audioRef.current) {
        console.warn("Audio element reference is null. Cannot play sound.");
    } else if (!isSoundReady) {
        console.warn("Success sound not ready (isSoundReady=false). Skipping playback.");
    }
  }, [isSoundReady, toast]); // Add dependencies

  const handleClick = React.useCallback(async () => {
    if (status === 'pending') return; // Prevent multiple clicks while pending

    setStatus('pending');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any existing reset timeout
    }

    try {
      const result = await handleCallBellTrigger();

      if (result.success) {
        setStatus('success');
        playSuccessSound(); // Play confirmation sound if ready
        toast({
          title: "Success!",
          description: "Help is on the way.",
          variant: "default",
          duration: 5000,
        });
        // Reset to idle after a delay
        timeoutRef.current = setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        toast({
          title: "Error",
          description: `Failed to trigger call bell: ${result.error}`,
          variant: "destructive",
          duration: 5000,
        });
         // Reset to idle after a delay
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
       // Reset to idle after a delay
       timeoutRef.current = setTimeout(() => setStatus('idle'), 5000);
    }
  }, [status, playSuccessSound, toast]); // Add dependencies

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
      variant={status === 'error' ? 'destructive' : 'default'}
      className={cn(
        "h-48 w-64 text-2xl font-semibold rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2",
        status === 'idle' && "bg-accent text-accent-foreground hover:bg-accent/90",
        status === 'pending' && "bg-primary text-primary-foreground cursor-not-allowed",
        status === 'success' && "bg-green-600 hover:bg-green-700 text-white", // Success specific color
        status === 'error' && "bg-destructive text-destructive-foreground" // Destructive is already handled by variant
      )}
      aria-live="polite" // Announce status changes to screen readers
      aria-label={status === 'idle' ? "Call Nurse Button" : `Status: ${status}`}
    >
      {getButtonContent()}
    </Button>
  );
}

