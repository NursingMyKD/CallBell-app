
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Volume2, Loader2 } from 'lucide-react';
import { type LanguageCode, appTranslations } from '@/lib/translations';
import { useTranslations } from '@/hooks/use-translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateSpeech } from '@/ai/text-to-speech';

interface SoundboardProps {
  selectedLanguage: LanguageCode;
}

export default function Soundboard({ selectedLanguage }: SoundboardProps) {
  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);
  const [currentlySpeakingPhrase, setCurrentlySpeakingPhrase] = React.useState<string | null>(null);
  const { toast } = useToast();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const t = useTranslations(selectedLanguage);

  const soundboardStrings = React.useMemo(() => {
    return t('soundboard');
  }, [t]);

  const categoryKeys = React.useMemo(() => {
    return Object.keys(appTranslations.soundboard.categories);
  }, []);
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      
      const handleEnded = () => {
        setIsSpeaking(false);
        setCurrentlySpeakingPhrase(null);
      };
      
      const handleError = (e: Event) => {
        console.error("Audio playback error:", e);
        toast({
          title: soundboardStrings.speechErrorToastTitle,
          description: "Failed to play the generated audio.",
          variant: "destructive",
        });
        setIsSpeaking(false);
        setCurrentlySpeakingPhrase(null);
      };

      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.pause();
        }
      };
    }
  }, [toast, soundboardStrings.speechErrorToastTitle]);

  const handleSpeak = React.useCallback(async (phrase: string, index: number) => {
    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
      return;
    }
    
    const uniquePhraseKey = `${phrase}-${index}`;
    setIsSpeaking(true);
    setCurrentlySpeakingPhrase(uniquePhraseKey);

    try {
      const audioDataUri = await generateSpeech(phrase);
      if (audioRef.current) {
        audioRef.current.src = audioDataUri;
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("Speech generation error:", error);
      toast({
        title: soundboardStrings.speechErrorToastTitle,
        description: error instanceof Error ? error.message : soundboardStrings.speechErrorToastDescription,
        variant: "destructive",
      });
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
    }
  }, [isSpeaking, toast, soundboardStrings.speechErrorToastTitle, soundboardStrings.speechErrorToastDescription]);
  
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []); 

  if (!isClient) {
    return null; 
  }

  return (
    <div className="mt-8 md:mt-10 w-full max-w-xl md:max-w-4xl lg:max-w-5xl px-2">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 md:mb-4 text-center">
        {soundboardStrings.title}
      </h2>
      <p className="text-sm sm:text-md text-muted-foreground mb-3 md:mb-4 text-center">
        {soundboardStrings.description}
      </p>

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
