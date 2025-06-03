
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
        const voices = window.speechSynthesis.getVoices();
        const filteredVoices = voices.filter(voice => voice.lang.startsWith(currentBcp47Lang.split('-')[0]));
        setAvailableVoices(filteredVoices);
        // If a voice was previously selected for this language, try to keep it.
        // Otherwise, reset to default or first available.
        const currentSelectedVoice = filteredVoices.find(v => v.voiceURI === selectedVoiceURI);
        if (!currentSelectedVoice && filteredVoices.length > 0) {
          // Check if there's a default voice for the language
          const defaultVoiceForLang = filteredVoices.find(v => v.default && v.lang === currentBcp47Lang);
          setSelectedVoiceURI(defaultVoiceForLang?.voiceURI || filteredVoices[0].voiceURI);
        } else if (!currentSelectedVoice && filteredVoices.length === 0) {
          setSelectedVoiceURI(undefined); // No voices for this lang, use browser default
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices; // Update if voices change

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
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
  }, [toast, selectedLanguage, currentBcp47Lang, selectedVoiceURI]);


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

    if (selectedVoiceURI) {
      const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
      if (voice) {
        utterance.voice = voice;
      } else {
        console.warn(`Selected voice URI ${selectedVoiceURI} not found. Using default.`);
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

  const languageFilteredVoices = availableVoices.filter(voice => voice.lang.startsWith(currentBcp47Lang.split('-')[0]));


  return (
    <div className="mt-6 md:mt-8 w-full max-w-xl md:max-w-3xl px-2">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 md:mb-4 text-center">
        {appTranslations.soundboard.title[selectedLanguage]}
      </h2>
      <p className="text-sm sm:text-md text-muted-foreground mb-3 md:mb-4 text-center">
        {appTranslations.soundboard.description[selectedLanguage]}
      </p>

      {languageFilteredVoices.length > 0 && (
        <div className="mb-4 md:mb-6 flex flex-col items-center">
           <Label htmlFor="voice-select" className="text-sm md:text-md text-muted-foreground mb-1.5">
            {appTranslations.soundboard.voiceSelectorLabel[selectedLanguage]}
          </Label>
          <Select
            value={selectedVoiceURI}
            onValueChange={setSelectedVoiceURI}
          >
            <SelectTrigger id="voice-select" className="w-full max-w-xs mx-auto text-sm md:text-base">
              <SelectValue placeholder={appTranslations.soundboard.defaultVoiceName[selectedLanguage]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{appTranslations.soundboard.defaultVoiceName[selectedLanguage]}</SelectItem>
              {languageFilteredVoices.map((voice) => (
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
