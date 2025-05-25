
"use client";

import * as React from 'react';
import { BellRing, CheckCircle, XCircle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleCallBellTrigger } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { callRequestOptions, type CallRequestType, type CallRequestOption } from '@/types/call-requests';

/**
 * Represents the possible visual and operational states of the CallBellButton.
 */
type Status = 'idle' | 'pending' | 'success' | 'error';

/**
 * CallBellButton component allows users to trigger a call bell action,
 * either for general assistance or for specific needs selected from a menu.
 * It provides visual feedback for different states and includes error handling.
 */
export default function CallBellButton() {
  const [status, setStatus] = React.useState<Status>('idle');
  const [requestSelectionMode, setRequestSelectionMode] = React.useState(false);
  const [activeRequestType, setActiveRequestType] = React.useState<CallRequestType | null>(null);
  const { toast } = useToast();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isSoundReady, setIsSoundReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/success.mp3');
      audioRef.current.load();

      const handleCanPlayThrough = () => setIsSoundReady(true);
      const handleError = (e: Event) => {
        let userFriendlyMessage = "Call sound effect could not be loaded.";
        // Enhanced error logging from previous iteration
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

  const playSuccessSound = React.useCallback(() => {
    if (audioRef.current && isSoundReady) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Error playing success sound:", error);
        toast({ title: "Playback Issue", description: "Could not play sound. Browser interaction might be required.", variant: "destructive", duration: 3000 });
      });
    }
  }, [isSoundReady, toast]);

  const resetToIdle = () => {
    setStatus('idle');
    setActiveRequestType(null);
    setRequestSelectionMode(false);
  };

  const handleSpecificRequest = React.useCallback(async (requestType: CallRequestType) => {
    if (status === 'pending') return;

    setStatus('pending');
    setActiveRequestType(requestType);
    setRequestSelectionMode(false); // Show main button area for status
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


  const getButtonContent = () => {
    switch (status) {
      case 'pending':
        return (
          <>
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
            Calling {activeRequestType ? `for ${activeRequestType}` : ''}...
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="mr-2 h-10 w-10" />
            {activeRequestType ? `${activeRequestType} Called!` : 'Called!'}
          </>
        );
      case 'error':
        return (
          <>
            <XCircle className="mr-2 h-10 w-10" />
            Error {activeRequestType ? `with ${activeRequestType}` : ''}
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

  if (requestSelectionMode) {
    return (
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-semibold">What do you need?</h2>
        <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
          {callRequestOptions.map((option: CallRequestOption) => (
            <Button
              key={option.type}
              onClick={() => handleSpecificRequest(option.type)}
              className="h-32 text-lg font-medium rounded-xl shadow-lg flex flex-col items-center justify-center p-3"
              variant="secondary"
              aria-label={`Request ${option.label}`}
            >
              <option.icon className="h-10 w-10 mb-2" />
              {option.label}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => {
            setRequestSelectionMode(false);
            if (status !== 'idle') setStatus('idle'); // Reset status if a call was in progress/finished
            setActiveRequestType(null);
          }}
          className="h-16 w-48 text-xl font-semibold rounded-xl shadow-lg"
          variant="outline"
          aria-label="Cancel selection"
        >
          <X className="mr-2 h-6 w-6" />
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => {
        if (status === 'pending') return;
        setRequestSelectionMode(true);
      }}
      disabled={status === 'pending'}
      variant={status === 'error' ? 'destructive' : status === 'success' ? 'default' : 'default'}
      className={cn(
        "h-48 w-64 text-2xl font-semibold rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-ring focus:ring-offset-2",
        status === 'idle' && "bg-accent text-accent-foreground hover:bg-accent/90",
        status === 'pending' && "bg-primary text-primary-foreground cursor-not-allowed",
        status === 'success' && "bg-success text-success-foreground hover:bg-success/90",
      )}
      aria-live="polite"
      aria-label={status === 'idle' ? "Call Nurse Button" : `Status: ${status} ${activeRequestType ? `for ${activeRequestType}` : ''}`}
    >
      {getButtonContent()}
    </Button>
  );
}
