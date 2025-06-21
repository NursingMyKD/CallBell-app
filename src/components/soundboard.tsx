
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Volume2, Loader2 } from 'lucide-react';
import { type LanguageCode, appTranslations, bcp47LangMap } from '@/lib/translations';
import { useTranslations } from '@/hooks/use-translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SoundboardProps {
  selectedLanguage: LanguageCode;
}

export default function Soundboard({ selectedLanguage }: SoundboardProps) {
  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);
  const [currentlySpeakingPhrase, setCurrentlySpeakingPhrase] = React.useState<string | null>(null);
  const { toast } = useToast();
  
  const t = useTranslations(selectedLanguage);

  const soundboardStrings = React.useMemo(() => {
    return t('soundboard');
  }, [t]);

  const categoryKeys = React.useMemo(() => {
    return Object.keys(appTranslations.soundboard.categories);
  }, []);

  const [isSpeechSupported, setIsSpeechSupported] = React.useState(true);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          // Set a default voice that matches the app's default language if possible
          if (!selectedVoice) {
            const defaultVoice = availableVoices.find(voice => voice.lang.startsWith(selectedLanguage)) || availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
            if (defaultVoice) {
              setSelectedVoice(defaultVoice.voiceURI);
            }
          }
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
      };
    } else {
      setIsSpeechSupported(false);
    }
  }, [selectedLanguage, selectedVoice]);

  const handleSpeak = React.useCallback(async (phrase: string, index: number) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
      return;
    }
    
    if (!isSpeechSupported) {
      toast({
        title: soundboardStrings.speechNotSupportedTitle,
        description: soundboardStrings.speechNotSupportedDescription,
        variant: "destructive",
      });
      return;
    }

    const uniquePhraseKey = `${phrase}-${index}`;
    setIsSpeaking(true);
    setCurrentlySpeakingPhrase(uniquePhraseKey);

    const utterance = new SpeechSynthesisUtterance(phrase);
    const voice = voices.find(v => v.voiceURI === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = bcp47LangMap[selectedLanguage];

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      toast({
        title: soundboardStrings.speechErrorToastTitle,
        description: soundboardStrings.speechErrorToastDescription,
        variant: "destructive",
      });
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
    };
    
    window.speechSynthesis.speak(utterance);

  }, [isSpeaking, isSpeechSupported, selectedVoice, voices, selectedLanguage, toast, soundboardStrings]);
  
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []); 

  if (!isClient) {
    return null; 
  }

  if (!isSpeechSupported) {
    return (
      <div className="mt-8 md:mt-10 w-full max-w-xl md:max-w-4xl lg:max-w-5xl px-2 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 md:mb-4">
          {soundboardStrings.speechNotSupportedTitle}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {soundboardStrings.speechNotSupportedDescription}
        </p>
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

      <div className="my-4 md:my-6 flex flex-col items-center w-full max-w-xs md:max-w-sm mx-auto">
        <Label htmlFor="voice-select" className="text-base md:text-lg text-muted-foreground mb-2">
          {soundboardStrings.voiceSelectorLabel}
        </Label>
        <Select value={selectedVoice} onValueChange={setSelectedVoice} disabled={voices.length === 0}>
          <SelectTrigger id="voice-select" className="w-full text-base md:text-lg py-6">
            <SelectValue placeholder={voices.length > 0 ? "Select a voice" : "Loading voices..."} />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice.voiceURI} value={voice.voiceURI} className="text-base md:text-lg py-2">
                {voice.name} ({voice.lang})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
                    const isCurrentlySpeakingThis = currentlySpeakingPhrase === uniquePhraseKey && isSpeaking;

                    return (
                    <Button
                      key={uniquePhraseKey}
                      onClick={() => handleSpeak(phrase, index)}
                      disabled={isSpeaking && !isCurrentlySpeakingThis}
                      variant="outline" 
                      className={cn(
                        "h-32 md:h-36 lg:h-40 font-medium rounded-lg md:rounded-xl shadow-md flex flex-col items-center justify-center p-2 md:p-3 transition-all text-base",
                        "focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isCurrentlySpeakingThis
                          ? "bg-primary/10 text-primary border-primary ring-2 ring-primary"
                          : "hover:bg-accent/10 hover:border-accent",
                        isSpeaking && !isCurrentlySpeakingThis && "opacity-60 cursor-not-allowed"
                      )}
                      aria-label={`${phrase}`}
                      aria-live="polite" 
                      aria-busy={isCurrentlySpeakingThis}
                    >
                      {isCurrentlySpeakingThis ? (
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
