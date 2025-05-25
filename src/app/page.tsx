
import CallRequestGrid from '@/components/call-request-grid';
import Soundboard from '@/components/soundboard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
       <h1 className="text-4xl font-bold mb-8 text-center">iControlBell</h1>
       <p className="text-lg text-muted-foreground mb-12 text-center max-w-lg">
         Focus your gaze on the button below that best describes your need to call for assistance, or use the soundboard to speak.
       </p>
      <CallRequestGrid />
      <Soundboard />
    </main>
  );
}
