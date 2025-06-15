
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Volume2, Loader2 } from 'lucide-react';
import { bcp47LangMap, type LanguageCode } from '@/lib/translations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/use-translations';

interface SoundboardProps {
  selectedLanguage: LanguageCode;
}

export default function Soundboard({ selectedLanguage }: SoundboardProps) {
  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);
  const [currentlySpeakingPhrase, setCurrentlySpeakingPhrase] = React.useState<string | null>(null);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = React.useState<boolean>(true); // Assume supported initially
  const [availableVoices, setAvailableVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = React.useState<string | undefined>(undefined);
  const { toast } = useToast();

  const t = useTranslations(selectedLanguage);
  const soundboardStrings = t('soundboard');
  const currentPhrases = soundboardStrings.phrases;
  const currentBcp47Lang = bcp47LangMap[selectedLanguage];
  
  const voiceLoadAttempted = React.useRef(false);

  React.useEffect(() => {
    // Reset voice load attempt flag when language changes, so it can try again for the new language
    voiceLoadAttempted.current = false;
  }, [selectedLanguage]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (speechSynthesisSupported) { // Only update and toast if state changes
        setSpeechSynthesisSupported(false);
        console.warn("Soundboard: Speech synthesis not supported by this browser.");
        toast({
          title: soundboardStrings.speechNotSupportedTitle,
          description: soundboardStrings.speechNotSupportedDescription,
          variant: "default",
          duration: 7000,
        });
      }
      return;
    }

    // Ensure it's marked as supported if we reach here (e.g. on initial mount if it was false)
    if (!speechSynthesisSupported) {
      setSpeechSynthesisSupported(true);
    }

    let voiceLoadTimeoutId: NodeJS.Timeout | null = null;

    const loadAndSetVoices = () => {
      const allSystemVoices = window.speechSynthesis.getVoices();

      if (allSystemVoices.length === 0 && !voiceLoadAttempted.current && typeof window.speechSynthesis.onvoiceschanged === 'undefined') {
        voiceLoadAttempted.current = true;
        if (voiceLoadTimeoutId) clearTimeout(voiceLoadTimeoutId); // Clear previous timeout if any
        voiceLoadTimeoutId = setTimeout(loadAndSetVoices, 350); // Slightly longer delay
        return;
      }
      
      let filteredVoices = allSystemVoices.filter(voice => voice.lang.startsWith(currentBcp47Lang.split('-')[0]));
      
      // Sort by voiceURI for stability, then by default flag (preferring defaults), then by name.
      filteredVoices.sort((a, b) => {
        if (a.default && !b.default) return -1;
        if (!a.default && b.default) return 1;
        if (a.voiceURI < b.voiceURI) return -1;
        if (a.voiceURI > b.voiceURI) return 1;
        return a.name.localeCompare(b.name);
      });
      
      setAvailableVoices(filteredVoices);

      setSelectedVoiceURI(currentStoredSelectedURI => {
        const isCurrentSelectionValidInNewList = filteredVoices.some(v => v.voiceURI === currentStoredSelectedURI);

        if (isCurrentSelectionValidInNewList) {
          return currentStoredSelectedURI;
        }
        
        if (filteredVoices.length > 0) {
          const defaultVoiceForLang = filteredVoices.find(v => v.default && v.lang === currentBcp47Lang);
          if (defaultVoiceForLang) {
            return defaultVoiceForLang.voiceURI;
          }
          return filteredVoices[0].voiceURI; // Fallback to the first sorted voice
        }
        return undefined; // No voices available
      });
    };

    loadAndSetVoices(); 

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadAndSetVoices;
    }
    
    return () => {
      if (voiceLoadTimeoutId) {
        clearTimeout(voiceLoadTimeoutId);
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null; 
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      }
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
    };
  // Dependencies that should trigger re-evaluation of voices and default selection
  }, [toast, selectedLanguage, currentBcp47Lang, soundboardStrings, speechSynthesisSupported]);


  const handleSpeak = React.useCallback((phrase: string) => {
    if (!speechSynthesisSupported || isSpeaking || !phrase || !window.speechSynthesis) {
      if (!speechSynthesisSupported) {
         toast({
            title: soundboardStrings.speechNotSupportedTitle,
            description: soundboardStrings.speechNotSupportedDescription,
            variant: "destructive",
         });
      }
      return;
    }
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = currentBcp47Lang;

    if (selectedVoiceURI && selectedVoiceURI !== "default") { // "default" is our placeholder value
      const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
      if (voice) {
        utterance.voice = voice;
      } else {
        console.warn(`Selected voice URI ${selectedVoiceURI} not found. Using browser default for language.`);
      }
    }
    
    setIsSpeaking(true);
    setCurrentlySpeakingPhrase(phrase);

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
      toast({
        title: soundboardStrings.speechErrorToastTitle,
        description: `${soundboardStrings.speechErrorToastDescription} (Error: ${event.error || 'Unknown speech error'})`,
        variant: "destructive",
      });
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error initiating speech synthesis:", error);
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
      toast({
        title: soundboardStrings.speechErrorToastTitle,
        description: soundboardStrings.speechErrorToastDescriptionInitiate,
        variant: "destructive",
      });
    }
  }, [isSpeaking, speechSynthesisSupported, toast, currentBcp47Lang, selectedVoiceURI, availableVoices, soundboardStrings, currentPhrases]); // Added currentPhrases as it is used in map
  
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
    // Check for speech synthesis support on client mount
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
        setSpeechSynthesisSupported(false);
    } else if (typeof window !== 'undefined' && ('speechSynthesis' in window) && !speechSynthesisSupported) {
        // If it was previously marked false but now found, mark true
        setSpeechSynthesisSupported(true);
    }
  }, []); // Empty dependency array: runs once on mount

  if (!isClient) {
    // Render nothing or a placeholder on the server
    return null; 
  }

  if (!speechSynthesisSupported) {
    return (
      <div className="mt-8 md:mt-10 text-center text-muted-foreground p-3 border border-dashed rounded-lg w-full max-w-xl md:max-w-3xl mx-auto">
        <p className="text-md md:text-lg font-semibold">{soundboardStrings.speechNotSupportedTitle}</p>
        <p className="text-sm md:text-base">{soundboardStrings.speechNotSupportedDescription}</p>
      </div>
    );
  }
  
  // Ensure currentPhrases is an array before mapping
  const phrasesToRender = Array.isArray(currentPhrases) ? currentPhrases : [];

  return (
    <div className="mt-6 md:mt-8 w-full max-w-xl md:max-w-3xl px-2">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 md:mb-4 text-center">
        {soundboardStrings.title}
      </h2>
      <p className="text-sm sm:text-md text-muted-foreground mb-3 md:mb-4 text-center">
        {soundboardStrings.description}
      </p>

      {availableVoices.length > 0 && (
        <div className="mb-4 md:mb-6 flex flex-col items-center">
           <Label htmlFor="voice-select" className="text-sm md:text-md text-muted-foreground mb-1.5">
            {soundboardStrings.voiceSelectorLabel}
          </Label>
          <Select
            value={selectedVoiceURI || "default"} // Use "default" as value for placeholder
            onValueChange={(value) => setSelectedVoiceURI(value === "default" ? undefined : value)}
          >
            <SelectTrigger id="voice-select" className="w-full max-w-xs mx-auto text-sm md:text-base">
              <SelectValue placeholder={soundboardStrings.defaultVoiceName} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{soundboardStrings.defaultVoiceName}</SelectItem>
              {availableVoices.map((voice) => (
                <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-3">
        {phrasesToRender.map((phrase) => (
          <Button
            key={phrase} // Assuming phrases are unique strings for the selected language
            onClick={() => handleSpeak(phrase)}
            disabled={isSpeaking && currentlySpeakingPhrase !== phrase}
            variant="outline" 
            className={cn(
              "h-24 md:h-28 text-sm md:text-base font-medium rounded-lg md:rounded-xl shadow-md flex flex-col items-center justify-center p-2 md:p-3 transition-all",
              "focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2",
              currentlySpeakingPhrase === phrase && isSpeaking 
                ? "bg-primary/10 text-primary border-primary ring-2 ring-primary animate-pulse" 
                : "hover:bg-accent/10 hover:border-accent",
              isSpeaking && currentlySpeakingPhrase !== phrase && "opacity-60 cursor-not-allowed"
            )}
            aria-label={`${phrase}`}
            aria-live="polite" 
            aria-busy={currentlySpeakingPhrase === phrase && isSpeaking}
          >
            {currentlySpeakingPhrase === phrase && isSpeaking ? (
              <Loader2 className="h-6 w-6 md:h-7 md:w-7 mb-1 md:mb-1.5 animate-spin" />
            ) : (
              <Volume2 className="h-6 w-6 md:h-7 md:w-7 mb-1 md:mb-1.5" />
            )}
            <span className="text-center text-xs sm:text-sm leading-tight">{phrase}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

