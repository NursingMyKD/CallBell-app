
import CallRequestGrid from '@/components/call-request-grid';
import Soundboard from '@/components/soundboard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:py-8">
       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center">iControlBell</h1>
       <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 text-center max-w-lg md:max-w-xl">
         Focus your gaze on the button below that best describes your need to call for assistance, or use the soundboard to speak.
       </p>
      <CallRequestGrid />
      <Soundboard />
    </main>
  );
}
