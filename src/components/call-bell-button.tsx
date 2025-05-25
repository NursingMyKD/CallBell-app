
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
        let errorMessage = "The audio could not be loaded. Please ensure the file exists at '/sounds/success.mp3' in the public directory and the format is supported.";
        let detailedError: string | object = "Unknown error";

        if (audioRef.current && audioRef.current.error) {
            const mediaError = audioRef.current.error;
            switch (mediaError.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    detailedError = "The fetching process for the media resource was aborted by the user agent at the user's request.";
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    detailedError = "A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.";
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    detailedError = "An error of some description occurred while decoding the media resource, after the resource was established to be usable.";
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    detailedError = "The media resource indicated by the src attribute or assigned media provider object was not suitable.";
                    break;
                default:
                    detailedError = `An unknown error occurred with the audio element (code: ${mediaError.code}).`;
            }
             console.error("Audio Element Error Details:", { code: mediaError.code, message: mediaError.message }, e);
        } else if (e.target && (e.target as HTMLAudioElement).error) {
             const mediaError = (e.target as HTMLAudioElement).error;
              if (mediaError) {
                detailedError = `MediaError code: ${mediaError.code}, message: ${mediaError.message}`;
                console.error("Audio Element Error Details:", { code: mediaError.code, message: mediaError.message }, e);
              } else {
                 console.error("Non-standard audio error event:", e);
                 detailedError = "Non-standard error event";
              }
        }
        console.error("Error loading success sound:", errorMessage, "Details:", detailedError);
        setIsSoundReady(false);
        // Optional: Notify user sound won't play
         toast({
            title: "Audio Alert",
            description: "Call sound effect could not be loaded.",
            variant: "default", // Or a custom "warning" variant
            duration: 3000,
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
          audioRef.current.src = ''; // Release the audio resource
          audioRef.current.load(); // Reset the media element
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
                description: "Could not play sound. Please interact with the page first.",
                variant: "destructive",
                duration: 3000,
            });
        });
    } else if (audioRef.current && audioRef.current.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
         console.warn("Success sound not ready yet, readyState:", audioRef.current.readyState);
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
        // Error state is handled by variant="destructive" which uses theme's destructive colors
      )}
      aria-live="polite"
      aria-label={status === 'idle' ? "Call Nurse Button" : `Status: ${status}`}
    >
      {getButtonContent()}
    </Button>
  );
}
