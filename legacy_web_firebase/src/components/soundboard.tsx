
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

  const [isSpeechSupported, setIsSpeechSupported] = React.useState<boolean | undefined>(undefined);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSpeechSupported(true);
      const handleVoicesChanged = () => {
        const allVoices = window.speechSynthesis.getVoices();
        if (allVoices.length === 0) return;

        let languageVoices = allVoices.filter(v => v.lang.startsWith(selectedLanguage));
        
        if (languageVoices.length === 0) {
          languageVoices = allVoices.filter(v => v.lang.startsWith('en'));
        }
        
        if (languageVoices.length === 0) {
            languageVoices = allVoices;
        }

        setVoices(languageVoices);

        const isSelectedVoiceInList = languageVoices.some(v => v.voiceURI === selectedVoice);

        if (!isSelectedVoiceInList) {
          setSelectedVoice(languageVoices[0]?.voiceURI || '');
        }
      };
      
      handleVoicesChanged();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      }


      return () => {
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = null;
        }
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

  if (!isClient || isSpeechSupported === undefined) {
    return null; 
  }

  if (!isSpeechSupported) {
    return (
      <div className="mt-10 w-full max-w-4xl lg:max-w-5xl px-2 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          {soundboardStrings.speechNotSupportedTitle}
        </h2>
        <p className="text-lg text-foreground">
          {soundboardStrings.speechNotSupportedDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 w-full max-w-4xl lg:max-w-5xl px-2">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        {soundboardStrings.title}
      </h2>
      <p className="text-md text-foreground mb-4 text-center">
        {soundboardStrings.description}
      </p>

      <div className="my-6 flex flex-col items-center w-full max-w-sm mx-auto">
        <Label htmlFor="voice-select" className="text-lg text-foreground mb-2">
          {soundboardStrings.voiceSelectorLabel}
        </Label>
        <Select value={selectedVoice} onValueChange={setSelectedVoice} disabled={voices.length === 0}>
          <SelectTrigger id="voice-select" className="w-full text-lg py-6">
            <SelectValue placeholder={voices.length > 0 ? "Select a voice" : "Loading voices..."} />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice.voiceURI} value={voice.voiceURI} className="text-lg py-2">
                {voice.name} ({voice.lang})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue={categoryKeys[0]} className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {categoryKeys.map((key) => (
            <TabsTrigger key={key} value={key} className="text-base py-4">
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
                      variant="secondary"
                      className={cn(
                        "h-full min-h-40 whitespace-normal font-medium rounded-xl shadow-md flex flex-col items-center justify-center p-3 transition-all text-base",
                        "focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isCurrentlySpeakingThis
                          ? "bg-primary/10 text-primary border-primary ring-2 ring-primary"
                          : "",
                        isSpeaking && !isCurrentlySpeakingThis && "opacity-60 cursor-not-allowed"
                      )}
                      aria-label={`${phrase}`}
                      aria-live="polite" 
                      aria-busy={isCurrentlySpeakingThis}
                    >
                      {isCurrentlySpeakingThis ? (
                        <Loader2 className="h-12 w-12 mb-2 animate-spin" />
                      ) : (
                        <Volume2 className="h-12 w-12 mb-2" />
                      )}
                      <span className="text-center text-base leading-tight">{phrase}</span>
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
