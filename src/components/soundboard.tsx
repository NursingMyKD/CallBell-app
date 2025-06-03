
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Volume2, Loader2 } from 'lucide-react';
import { appTranslations, bcp47LangMap, type LanguageCode } from '@/lib/translations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface SoundboardProps {
  selectedLanguage: LanguageCode;
}

export default function Soundboard({ selectedLanguage }: SoundboardProps) {
  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);
  const [currentlySpeakingPhrase, setCurrentlySpeakingPhrase] = React.useState<string | null>(null);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = React.useState<boolean>(true);
  const [availableVoices, setAvailableVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = React.useState<string | undefined>(undefined);
  const { toast } = useToast();

  const currentPhrases = appTranslations.soundboard.phrases[selectedLanguage];
  const currentBcp47Lang = bcp47LangMap[selectedLanguage];

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesisSupported(true);

      const loadVoices = () => {
        const allSystemVoices = window.speechSynthesis.getVoices();
        
        // Filter by current language first
        let voicesForCurrentLang = allSystemVoices.filter(voice => voice.lang.startsWith(currentBcp47Lang.split('-')[0]));
        
        // Then de-duplicate these language-specific voices by voiceURI
        // This ensures unique keys when rendering SelectItem components
        voicesForCurrentLang = Array.from(new Map(voicesForCurrentLang.map(voice => [voice.voiceURI, voice])).values());
        
        setAvailableVoices(voicesForCurrentLang);

        const currentSelectedVoice = voicesForCurrentLang.find(v => v.voiceURI === selectedVoiceURI);
        if (!currentSelectedVoice && voicesForCurrentLang.length > 0) {
          const defaultVoiceForLang = voicesForCurrentLang.find(v => v.default && v.lang === currentBcp47Lang);
          setSelectedVoiceURI(defaultVoiceForLang?.voiceURI || voicesForCurrentLang[0].voiceURI);
        } else if (voicesForCurrentLang.length === 0 && selectedVoiceURI !== undefined) {
          // If no voices for this lang (after filtering & dedupe) and a voice was previously selected, reset it
          setSelectedVoiceURI(undefined);
        }
      };

      // Voices might load asynchronously, so call loadVoices() initially
      // and also when the voiceschanged event fires.
      loadVoices(); 
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      } else {
        // Fallback for browsers that might not support onvoiceschanged well initially,
        // though getVoices() should be sufficient for most modern browsers on first call.
        setTimeout(loadVoices, 100); // Attempt to reload voices shortly after initial load
      }
      

      return () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = null;
            if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            }
        }
        setIsSpeaking(false);
        setCurrentlySpeakingPhrase(null);
      };
    } else {
      setSpeechSynthesisSupported(false);
      console.warn("Soundboard: Speech synthesis not supported by this browser.");
      toast({
        title: appTranslations.soundboard.speechNotSupportedTitle[selectedLanguage],
        description: appTranslations.soundboard.speechNotSupportedDescription[selectedLanguage],
        variant: "default",
        duration: 7000,
      });
    }
  }, [toast, selectedLanguage, currentBcp47Lang, selectedVoiceURI]); // selectedVoiceURI is needed to re-evaluate if it's still valid


  const handleSpeak = React.useCallback((phrase: string) => {
    if (!speechSynthesisSupported || isSpeaking || !phrase || !window.speechSynthesis) {
      if (!speechSynthesisSupported) {
         toast({
            title: appTranslations.soundboard.speechNotSupportedTitle[selectedLanguage],
            description: appTranslations.soundboard.speechNotSupportedDescription[selectedLanguage],
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

    if (selectedVoiceURI && selectedVoiceURI !== "default") { // Check for "default"
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
        title: appTranslations.soundboard.speechErrorToastTitle[selectedLanguage],
        description: `${appTranslations.soundboard.speechErrorToastDescription[selectedLanguage]} (Error: ${event.error || 'Unknown speech error'})`,
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
        title: appTranslations.soundboard.speechErrorToastTitle[selectedLanguage],
        description: appTranslations.soundboard.speechErrorToastDescriptionInitiate[selectedLanguage],
        variant: "destructive",
      });
    }
  }, [isSpeaking, speechSynthesisSupported, toast, selectedLanguage, currentBcp47Lang, selectedVoiceURI, availableVoices]);
  
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  if (!speechSynthesisSupported) {
    return (
      <div className="mt-8 md:mt-10 text-center text-muted-foreground p-3 border border-dashed rounded-lg w-full max-w-xl md:max-w-3xl mx-auto">
        <p className="text-md md:text-lg font-semibold">{appTranslations.soundboard.speechNotSupportedTitle[selectedLanguage]}</p>
        <p className="text-sm md:text-base">{appTranslations.soundboard.speechNotSupportedDescription[selectedLanguage]}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 md:mt-8 w-full max-w-xl md:max-w-3xl px-2">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 md:mb-4 text-center">
        {appTranslations.soundboard.title[selectedLanguage]}
      </h2>
      <p className="text-sm sm:text-md text-muted-foreground mb-3 md:mb-4 text-center">
        {appTranslations.soundboard.description[selectedLanguage]}
      </p>

      {availableVoices.length > 0 && (
        <div className="mb-4 md:mb-6 flex flex-col items-center">
           <Label htmlFor="voice-select" className="text-sm md:text-md text-muted-foreground mb-1.5">
            {appTranslations.soundboard.voiceSelectorLabel[selectedLanguage]}
          </Label>
          <Select
            value={selectedVoiceURI || "default"} // Ensure "default" is handled if selectedVoiceURI is undefined
            onValueChange={(value) => setSelectedVoiceURI(value === "default" ? undefined : value)}
          >
            <SelectTrigger id="voice-select" className="w-full max-w-xs mx-auto text-sm md:text-base">
              <SelectValue placeholder={appTranslations.soundboard.defaultVoiceName[selectedLanguage]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{appTranslations.soundboard.defaultVoiceName[selectedLanguage]}</SelectItem>
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
        {currentPhrases.map((phrase) => (
          <Button
            key={phrase}
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
