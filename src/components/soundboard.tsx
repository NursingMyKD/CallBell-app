
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Volume2, Loader2 } from 'lucide-react';
import { bcp47LangMap, type LanguageCode, appTranslations } from '@/lib/translations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/use-translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const t = useTranslations(selectedLanguage);

  const soundboardStrings = React.useMemo(() => {
    return t('soundboard');
  }, [t]);

  const categoryKeys = React.useMemo(() => {
    return Object.keys(appTranslations.soundboard.categories);
  }, []);

  const currentBcp47Lang = React.useMemo(() => {
    return bcp47LangMap[selectedLanguage];
  }, [selectedLanguage]);
  
  const voiceLoadAttempted = React.useRef(false);

  React.useEffect(() => {
    voiceLoadAttempted.current = false; 
  }, [selectedLanguage]);


  React.useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (speechSynthesisSupported) { 
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

    if (!speechSynthesisSupported) { 
        setSpeechSynthesisSupported(true);
    }
    
    let voiceLoadTimeoutId: NodeJS.Timeout | null = null;

    const loadAndSetVoices = () => {
      if (!window.speechSynthesis) return;

      const allSystemVoices = window.speechSynthesis.getVoices();
      
      if (allSystemVoices.length === 0 && !voiceLoadAttempted.current && typeof window.speechSynthesis.onvoiceschanged === 'undefined') {
        voiceLoadAttempted.current = true;
        if (voiceLoadTimeoutId) clearTimeout(voiceLoadTimeoutId);
        voiceLoadTimeoutId = setTimeout(loadAndSetVoices, 350); 
        return;
      }
      
      const allVoices = [...allSystemVoices];
      
      allVoices.sort((a, b) => {
        if (a.default && !b.default) return -1;
        if (!a.default && b.default) return 1;
        return a.name.localeCompare(b.name);
      });
      
      setAvailableVoices(currentAvailVoices => {
        const newVoiceURIs = allVoices.map(v => v.voiceURI).sort().join(',');
        const currentVoiceURIs = currentAvailVoices.map(v => v.voiceURI).sort().join(',');
        if (newVoiceURIs === currentVoiceURIs) {
          return currentAvailVoices;
        }
        return allVoices;
      });

      setSelectedVoiceURI(currentStoredSelectedURI => {
        const isCurrentValid = allVoices.some(v => v.voiceURI === currentStoredSelectedURI);
        if (isCurrentValid) {
          return currentStoredSelectedURI;
        }
        
        if (allVoices.length > 0) {
          const defaultVoice = allVoices.find(v => v.default);
          if (defaultVoice) return defaultVoice.voiceURI;
          
          return allVoices[0].voiceURI; 
        }
        return undefined; 
      });
    };

    loadAndSetVoices(); 

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadAndSetVoices;
    }
    
    return () => {
      if (voiceLoadTimeoutId) clearTimeout(voiceLoadTimeoutId);
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null; 
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      }
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
    };
  }, [soundboardStrings, toast, speechSynthesisSupported]);


  const handleSpeak = React.useCallback((phrase: string, index: number) => {
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

    if (selectedVoiceURI && selectedVoiceURI !== "default") { 
      const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
      if (voice) {
        utterance.voice = voice;
      } else {
        console.warn(`Selected voice URI ${selectedVoiceURI} not found. Using browser default for language.`);
      }
    }
    
    const uniquePhraseKey = `${phrase}-${index}`;
    setIsSpeaking(true);
    setCurrentlySpeakingPhrase(uniquePhraseKey);

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
  }, [isSpeaking, speechSynthesisSupported, toast, currentBcp47Lang, selectedVoiceURI, availableVoices, soundboardStrings]);
  
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
        if (speechSynthesisSupported) {
             setSpeechSynthesisSupported(false);
        }
    } else if (typeof window !== 'undefined' && ('speechSynthesis' in window) && !speechSynthesisSupported) {
        setSpeechSynthesisSupported(true);
    }
  }, [speechSynthesisSupported]); 

  if (!isClient) {
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
  
  return (
    <div className="mt-8 md:mt-10 w-full max-w-xl md:max-w-4xl lg:max-w-5xl px-2">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 md:mb-4 text-center">
        {soundboardStrings.title}
      </h2>
      <p className="text-sm sm:text-md text-muted-foreground mb-3 md:mb-4 text-center">
        {soundboardStrings.description}
      </p>

      {availableVoices.length > 0 && (
        <div className="mb-4 md:mb-6 flex flex-col items-center">
           <Label htmlFor="voice-select" className="text-base md:text-lg text-muted-foreground mb-1.5">
            {soundboardStrings.voiceSelectorLabel}
          </Label>
          <Select
            value={selectedVoiceURI || "default"} 
            onValueChange={(value) => setSelectedVoiceURI(value === "default" ? undefined : value)}
          >
            <SelectTrigger id="voice-select" className="w-full max-w-sm mx-auto text-sm md:text-base">
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

      <Tabs defaultValue={categoryKeys[0]} className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {categoryKeys.map((key) => (
            <TabsTrigger key={key} value={key} className="text-sm md:text-base py-4">
              {soundboardStrings.categories[key].title}
            </TabsTrigger>
          ))}
        </TabsList>
        {categoryKeys.map((key) => {
            const categoryPhrases = soundboardStrings.categories[key].phrases;
            if (!Array.isArray(categoryPhrases)) return null;

            return (
              <TabsContent key={key} value={key} className="mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {categoryPhrases.map((phrase, index) => {
                    const uniquePhraseKey = `${phrase}-${index}`;
                    return (
                    <Button
                      key={uniquePhraseKey}
                      onClick={() => handleSpeak(phrase, index)}
                      disabled={isSpeaking && currentlySpeakingPhrase !== uniquePhraseKey}
                      variant="outline" 
                      className={cn(
                        "h-32 md:h-36 lg:h-40 font-medium rounded-lg md:rounded-xl shadow-md flex flex-col items-center justify-center p-2 md:p-3 transition-all text-base",
                        "focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2",
                        currentlySpeakingPhrase === uniquePhraseKey && isSpeaking 
                          ? "bg-primary/10 text-primary border-primary ring-2 ring-primary animate-pulse" 
                          : "hover:bg-accent/10 hover:border-accent",
                        isSpeaking && currentlySpeakingPhrase !== uniquePhraseKey && "opacity-60 cursor-not-allowed"
                      )}
                      aria-label={`${phrase}`}
                      aria-live="polite" 
                      aria-busy={currentlySpeakingPhrase === uniquePhraseKey && isSpeaking}
                    >
                      {currentlySpeakingPhrase === uniquePhraseKey && isSpeaking ? (
                        <Loader2 className="h-10 w-10 md:h-12 md:w-12 mb-1.5 md:mb-2 animate-spin" />
                      ) : (
                        <Volume2 className="h-10 w-10 md:h-12 md:w-12 mb-1.5 md:mb-2" />
                      )}
                      <span className="text-center text-sm md:text-base leading-tight">{phrase}</span>
                    </Button>
                  )})}
                </div>
              </TabsContent>
            )
        })}
      </Tabs>
    </div>
  );
}
