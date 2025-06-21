
"use client";
import * as React from 'react';
import CallRequestGrid from '@/components/call-request-grid';
import Soundboard from '@/components/soundboard';
import LanguageSelector from '@/components/language-selector';
import { appTranslations, type LanguageCode } from '@/lib/translations';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageCode>('en');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12">
       <LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} />
       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-center">
         {appTranslations.page.title[selectedLanguage]}
       </h1>
       <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-center max-w-lg md:max-w-2xl">
         {appTranslations.page.description[selectedLanguage]}
       </p>
      <CallRequestGrid selectedLanguage={selectedLanguage} />
      <Soundboard selectedLanguage={selectedLanguage} />
    </main>
  );
}
