
"use client";

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleCallBellTrigger } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { callRequestOptionsStructure, type CallRequestType, type CallRequestOption as CallRequestOptionStructure } from '@/types/call-requests';
import { appTranslations, type LanguageCode } from '@/lib/translations';

type Status = 'idle' | 'pending' | 'success' | 'error';

interface CallRequestGridProps {
  selectedLanguage: LanguageCode;
}

export default function CallRequestGrid({ selectedLanguage }: CallRequestGridProps) {
  const [status, setStatus] = React.useState<Status>('idle');
  const [activeRequestType, setActiveRequestType] = React.useState<CallRequestType | null>(null);
  const { toast } = useToast();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isSoundReady, setIsSoundReady] = React.useState(false);

  // Dynamically get translated labels for call request options
  const getTranslatedCallRequestOptions = () => {
    return callRequestOptionsStructure.map(optionStructure => {
      const translationEntry = appTranslations.callRequestOptions.find(t => t.type === optionStructure.type);
      return {
        ...optionStructure,
        label: translationEntry ? translationEntry.label[selectedLanguage] : optionStructure.type, // Fallback to type if no translation
      };
    });
  };

  const currentCallRequestOptions = getTranslatedCallRequestOptions();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/success.mp3');
      audioRef.current.load();

      const handleCanPlayThrough = () => {
        console.log("Success sound ready to play.");
        setIsSoundReady(true);
      };
      
      const handleError = (event: Event) => {
        let userFriendlyMessageKey: keyof typeof appTranslations.callRequestGrid = 'audioErrorDefault';
        let consoleLogMessage = "Error loading success sound. Ensure '/sounds/success.mp3' exists in public/sounds and is a supported format.";
        let errorPayload: object | string = { eventType: event.type };
        const audioEl = audioRef.current;

        if (audioEl && audioEl.error) {
          const mediaError = audioEl.error;
          errorPayload = { code: mediaError.code, message: mediaError.message || "No specific message.", type: "MediaError" };
          switch (mediaError.code) {
            case MediaError.MEDIA_ERR_ABORTED:
              userFriendlyMessageKey = 'audioErrorAborted';
              consoleLogMessage += " (MEDIA_ERR_ABORTED)";
              break;
            case MediaError.MEDIA_ERR_NETWORK:
              userFriendlyMessageKey = 'audioErrorNetwork';
              consoleLogMessage += " (MEDIA_ERR_NETWORK)";
              break;
            case MediaError.MEDIA_ERR_DECODE:
              userFriendlyMessageKey = 'audioErrorDecode';
              consoleLogMessage += " (MEDIA_ERR_DECODE)";
              break;
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              userFriendlyMessageKey = 'audioErrorSrcNotSupported';
              consoleLogMessage += " (MEDIA_ERR_SRC_NOT_SUPPORTED)";
              break;
            default:
              userFriendlyMessageKey = 'audioErrorUnexpected';
              consoleLogMessage += ` (Unknown MediaError code: ${mediaError.code})`;
          }
        } else {
          consoleLogMessage += " (No specific MediaError object found). Event type: " + event.type;
          errorPayload = "No specific MediaError details. Original event: " + event.type;
        }
        
        console.error(consoleLogMessage, "Internal Details:", errorPayload, "Original Event:", event);
        setIsSoundReady(false);
        toast({ 
          title: appTranslations.callRequestGrid.audioErrorToastTitle[selectedLanguage], 
          description: appTranslations.callRequestGrid[userFriendlyMessageKey][selectedLanguage] || appTranslations.callRequestGrid.audioErrorDefault[selectedLanguage], 
          variant: "destructive", 
          duration: 5000 
        });
      };

      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.addEventListener('error', handleError);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.pause(); 
          audioRef.current.src = '';
          audioRef.current.load(); 
        }
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [toast, selectedLanguage]);

  const playSuccessSound = React.useCallback(() => {
    if (audioRef.current && isSoundReady) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Error playing success sound:", error);
        toast({ 
            title: appTranslations.callRequestGrid.audioErrorToastTitle[selectedLanguage], 
            description: "Could not play sound. Browser interaction might be required.", // This specific message could also be translated
            variant: "destructive", 
            duration: 3000 
        });
      });
    } else {
      console.warn("Attempted to play sound, but it was not ready or audioRef is null.");
    }
  }, [isSoundReady, toast, selectedLanguage]);

  const resetToIdle = () => {
    setStatus('idle');
    setActiveRequestType(null);
  };

  const getTranslatedLabelForType = (requestType: CallRequestType): string => {
    const option = appTranslations.callRequestOptions.find(opt => opt.type === requestType);
    return option ? option.label[selectedLanguage] : requestType;
  };

  const handleSpecificRequest = React.useCallback(async (requestType: CallRequestType) => {
    if (status === 'pending') return;

    setStatus('pending');
    setActiveRequestType(requestType);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const translatedRequestLabel = getTranslatedLabelForType(requestType);

    try {
      const result = await handleCallBellTrigger(requestType); // Pass requestType to action
      if (result.success) {
        setStatus('success');
        playSuccessSound();
        toast({
          title: appTranslations.callRequestGrid.toastSuccessTitle[selectedLanguage],
          description: `${translatedRequestLabel} ${appTranslations.callRequestGrid.toastSuccessRequestSent[selectedLanguage]}`,
          variant: "default", 
          duration: 5000,
        });
      } else {
        setStatus('error');
        toast({
          title: appTranslations.callRequestGrid.toastErrorTitle[selectedLanguage],
          description: `${appTranslations.callRequestGrid.toastFailedToSend[selectedLanguage]} ${translatedRequestLabel} request: ${result.error}`,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(`Error in handleSpecificRequest for ${requestType}:`, error);
      setStatus('error');
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: appTranslations.callRequestGrid.toastSystemErrorTitle[selectedLanguage],
        description: `${appTranslations.callRequestGrid.toastCouldNotProcess[selectedLanguage]} ${translatedRequestLabel} request: ${errorMessage}`,
        variant: "destructive",
        duration: 5000,
      });
    }
    timeoutRef.current = setTimeout(resetToIdle, 5000);
  }, [status, toast, playSuccessSound, selectedLanguage]);

  const firstRowOptions = currentCallRequestOptions.slice(0, 2);
  const secondRowOptions = currentCallRequestOptions.slice(2, 5);

  const renderButton = (option: { type: CallRequestType; icon: CallRequestOptionStructure['icon']; label: string }) => (
    <Button
      key={option.type}
      onClick={() => handleSpecificRequest(option.type)}
      className={cn(
          "h-36 md:h-44 text-lg md:text-xl font-semibold rounded-xl md:rounded-2xl shadow-lg md:shadow-xl flex flex-col items-center justify-center p-3 md:p-4 transition-all focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2",
          status === 'success' && activeRequestType === option.type && "bg-success text-success-foreground hover:bg-success/90",
          status === 'error' && activeRequestType === option.type && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      )}
      variant={ 
        (status === 'success' || status === 'error') && activeRequestType === option.type
        ? (status === 'error' ? 'destructive' : 'default') 
        : 'default' 
      }
      disabled={status === 'pending'}
      aria-label={`${appTranslations.callRequestGrid.statusCallingFor[selectedLanguage]} ${option.label}`}
    >
      <option.icon className="h-12 w-12 md:h-16 md:w-16 mb-2 md:mb-3" />
      {option.label}
    </Button>
  );

  return (
    <div className="flex flex-col items-center space-y-3 md:space-y-4 w-full max-w-xl md:max-w-3xl px-2">
      <div className="h-8 md:h-10 mb-1 md:mb-2 flex items-center justify-center w-full">
        {status === 'pending' && activeRequestType && (
          <div className="flex items-center text-md md:text-lg p-1.5 md:p-2 rounded-md bg-primary/10 text-primary animate-pulse">
            <Loader2 className="mr-2 h-5 w-5 md:mr-2.5 md:h-6 md:w-6 animate-spin" />
            {appTranslations.callRequestGrid.statusCallingFor[selectedLanguage]} {getTranslatedLabelForType(activeRequestType)}...
          </div>
        )}
      </div>

      <div className="w-full space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {firstRowOptions.map(renderButton)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {secondRowOptions.map(renderButton)}
        </div>
      </div>
    </div>
  );
}
