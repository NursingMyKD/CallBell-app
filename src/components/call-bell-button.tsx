
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
  const { toast } = useToast();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Initialize audio element on the client side after mount
  React.useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(SUCCESS_SOUND_PATH);
      audioRef.current.load(); // Preload the audio file

      // Optional: Log successful loading or handle loading errors
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log("Success sound ready to play.");
      });
      audioRef.current.addEventListener('error', (e) => {
        console.error("Error loading success sound:", e);
        // Maybe disable sound playing or notify user
      });
    }

    // Cleanup timeout and audio object on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause(); // Stop playback if any
        // Remove event listeners if added
        // audioRef.current.removeEventListener('canplaythrough', ...);
        // audioRef.current.removeEventListener('error', ...);
        audioRef.current = null; // Release the reference
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const playSuccessSound = () => {
    if (audioRef.current) {
       // Check if the audio is ready to play to avoid interruptions
       if (audioRef.current.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        audioRef.current.currentTime = 0; // Rewind to the start
        audioRef.current.play().catch(error => {
          console.error("Error playing success sound:", error);
          // Optionally, provide feedback to the user that sound failed
          toast({
            title: "Audio Playback Issue",
            description: "Could not play the confirmation sound.",
            variant: "destructive",
            duration: 3000,
          });
        });
      } else {
        console.warn("Success sound not ready to play yet (readyState:", audioRef.current.readyState, "). Attempting anyway...");
         // You might still try to play, or wait for 'canplaythrough' event
         audioRef.current.currentTime = 0;
         audioRef.current.play().catch(error => console.error("Error playing not-ready sound:", error));
      }
    } else {
      console.warn("Success sound audio element not available or not initialized.");
    }
  };

  const handleClick = async () => {
    if (status === 'pending') return; // Prevent multiple clicks while pending

    setStatus('pending');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any existing reset timeout
    }

    const result = await handleCallBellTrigger();

    if (result.success) {
      setStatus('success');
      playSuccessSound(); // Play confirmation sound
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
  };

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
