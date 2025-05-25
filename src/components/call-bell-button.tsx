
"use client";

import * as React from 'react';
import { BellRing, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleCallBellTrigger } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Status = 'idle' | 'pending' | 'success' | 'error';

export default function CallBellButton() {
  const [status, setStatus] = React.useState<Status>('idle');
  const { toast } = useToast();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
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
        let userFriendlyMessage = "Call sound effect could not be loaded.";
        const consoleErrorMessage = "The audio could not be loaded. Please ensure the file exists at '/sounds/success.mp3' in the public directory and the format is supported.";
        let detailedError: string | object = "Unknown error";

        if (audioRef.current && audioRef.current.error) {
            const mediaError = audioRef.current.error;
            switch (mediaError.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    detailedError = "The fetching process for the media resource was aborted by the user agent at the user's request.";
                    userFriendlyMessage = "Audio loading was aborted by the browser.";
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    detailedError = "A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.";
                    userFriendlyMessage = "A network error prevented the sound from loading.";
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    detailedError = "An error of some description occurred while decoding the media resource, after the resource was established to be usable.";
                    userFriendlyMessage = "The sound file could not be decoded. It might be corrupted.";
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    detailedError = "The media resource indicated by the src attribute or assigned media provider object was not suitable.";
                    userFriendlyMessage = "Sound file format may not be supported, or the file is missing/corrupted. Please check '/sounds/success.mp3'.";
                    break;
                default:
                    detailedError = `An unknown error occurred with the audio element (code: ${mediaError.code}).`;
            }
             console.error("Audio Element Error (audioRef.current.error):", { code: mediaError.code, message: mediaError.message, eventDetails: e });
        } else if (e.target && (e.target as HTMLAudioElement).error) {
             const mediaError = (e.target as HTMLAudioElement).error;
              if (mediaError) {
                const code = mediaError.code;
                // Update detailedError and userFriendlyMessage if not already set more specifically
                if (typeof detailedError === 'string' && detailedError === "Unknown error") {
                    switch (code) {
                        case MediaError.MEDIA_ERR_ABORTED:
                            detailedError = "The fetching process for the media resource was aborted by the user agent at the user's request (target.error).";
                            userFriendlyMessage = "Audio loading was aborted by the browser.";
                            break;
                        case MediaError.MEDIA_ERR_NETWORK:
                            detailedError = "A network error occurred while fetching the media resource (target.error).";
                            userFriendlyMessage = "A network error prevented the sound from loading.";
                            break;
                        case MediaError.MEDIA_ERR_DECODE:
                            detailedError = "An error occurred while decoding the media resource (target.error).";
                            userFriendlyMessage = "The sound file could not be decoded. It might be corrupted.";
                            break;
                        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                            detailedError = "The media resource was not suitable (target.error).";
                            userFriendlyMessage = "Sound file format may not be supported, or the file is missing/corrupted. Please check '/sounds/success.mp3'.";
                            break;
                        default:
                            detailedError = `An unknown error occurred with the audio element (target.error) (code: ${code}).`;
                    }
                }
                console.error("Audio Element Error (e.target.error):", { code: mediaError.code, message: mediaError.message, eventDetails: e });
              } else {
                 console.error("Non-standard audio error event:", e);
                 detailedError = "A non-standard error event occurred during audio loading.";
              }
        }
        console.error("Error loading success sound (final report):", consoleErrorMessage, "Details:", detailedError);
        setIsSoundReady(false);
        
         toast({
            title: "Audio Alert",
            description: userFriendlyMessage,
            variant: "default", 
            duration: 5000, 
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


  const playSuccessSound = React.useCallback(() => {
    if (audioRef.current && isSoundReady) {
        audioRef.current.currentTime = 0; 
        audioRef.current.play().catch(error => {
            console.error("Error playing success sound:", error);
            toast({
                title: "Playback Issue",
                description: "Could not play sound. Browser interaction might be required first.",
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
