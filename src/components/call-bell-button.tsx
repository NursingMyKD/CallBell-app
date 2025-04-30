
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

  // Cleanup timeout on component unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
  }, [status, toast]); // Add dependencies

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

