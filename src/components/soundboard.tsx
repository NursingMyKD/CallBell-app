
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Volume2, Loader2 } from 'lucide-react';

const commonPhrases: string[] = [
  "Yes",
  "No",
  "I'm thirsty",
  "I'm in pain",
  "I need to use the restroom",
  "I'm uncomfortable",
  "Can you adjust my pillow?",
  "Thank you",
  "Hello",
  "I need help",
  "I'm cold",
  "I'm hot"
];

/**
 * Soundboard component allows patients to speak predefined phrases
 * using the browser's Text-to-Speech capabilities.
 */
export default function Soundboard() {
  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);
  const [currentlySpeakingPhrase, setCurrentlySpeakingPhrase] = React.useState<string | null>(null);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = React.useState<boolean>(true); // Assume supported initially
  const { toast } = useToast();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        setSpeechSynthesisSupported(true);
        // Pre-warm the speech synthesis engine on some browsers by fetching voices
        window.speechSynthesis.getVoices();
      } else {
        setSpeechSynthesisSupported(false);
        console.warn("Soundboard: Speech synthesis not supported by this browser.");
        toast({
          title: "Soundboard Not Available",
          description: "Text-to-speech is not supported by your browser.",
          variant: "default",
          duration: 7000,
        });
      }
    }

    // Cleanup: cancel any ongoing speech if the component unmounts
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
    };
  }, [toast]);

  /**
   * Handles the click event for a phrase button.
   * Initiates speech synthesis for the given phrase.
   * @param phrase - The phrase to be spoken.
   */
  const handleSpeak = React.useCallback((phrase: string) => {
    if (!speechSynthesisSupported || isSpeaking || !phrase || !window.speechSynthesis) {
      if (!speechSynthesisSupported) {
         toast({
            title: "Speech Not Supported",
            description: "Your browser does not support text-to-speech.",
            variant: "destructive",
         });
      }
      return;
    }
    
    // Cancel any currently speaking utterance before starting a new one
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(phrase);
    setIsSpeaking(true);
    setCurrentlySpeakingPhrase(phrase);

    utterance.onstart = () => {
      // console.log(`Speaking: ${phrase}`);
    };

    utterance.onend = () => {
      // console.log(`Finished speaking: ${phrase}`);
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      setCurrentlySpeakingPhrase(null);
      toast({
        title: "Speech Error",
        description: `Could not speak the phrase. Error: ${event.error || 'Unknown speech error'}`,
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
        title: "Speech Error",
        description: "Could not initiate text-to-speech. Please ensure browser permissions are allowed.",
        variant: "destructive",
      });
    }
  }, [isSpeaking, speechSynthesisSupported, toast]);
  
  // Avoid rendering the component server-side or if support is not yet determined client-side.
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a placeholder/skeleton
  }

  if (!speechSynthesisSupported) {
    return (
      <div className="mt-12 text-center text-muted-foreground p-4 border border-dashed rounded-md">
        <p className="text-lg">Soundboard Feature Not Available</p>
        <p>Your browser does not support the necessary text-to-speech technology.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 w-full max-w-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-center">Soundboard</h2>
      <p className="text-md text-muted-foreground mb-6 text-center">
        Select a phrase below to have it spoken aloud.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {commonPhrases.map((phrase) => (
          <Button
            key={phrase}
            onClick={() => handleSpeak(phrase)}
            disabled={isSpeaking && currentlySpeakingPhrase !== phrase}
            variant="outline" // Using outline to differentiate from primary call buttons
            className={cn(
              "h-28 md:h-32 text-md font-medium rounded-lg shadow-md flex flex-col items-center justify-center p-3 transition-all",
              "focus:ring-2 focus:ring-ring focus:ring-offset-2",
              currentlySpeakingPhrase === phrase && isSpeaking 
                ? "bg-primary/10 text-primary border-primary ring-2 ring-primary animate-pulse" 
                : "hover:bg-accent/10 hover:border-accent",
              isSpeaking && currentlySpeakingPhrase !== phrase && "opacity-60 cursor-not-allowed"
            )}
            aria-label={`Speak phrase: ${phrase}`}
            aria-live="polite" 
            aria-busy={currentlySpeakingPhrase === phrase && isSpeaking}
          >
            {currentlySpeakingPhrase === phrase && isSpeaking ? (
              <Loader2 className="h-7 w-7 mb-2 animate-spin" />
            ) : (
              <Volume2 className="h-7 w-7 mb-2" />
            )}
            <span className="text-center">{phrase}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
