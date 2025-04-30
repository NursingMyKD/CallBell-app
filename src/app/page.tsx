import CallBellButton from '@/components/call-bell-button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
       <h1 className="text-4xl font-bold mb-8 text-center">iControlBell</h1>
       <p className="text-lg text-muted-foreground mb-12 text-center max-w-md">
         Focus your gaze on the button below to call for assistance.
       </p>
      <CallBellButton />
    </main>
  );
}
