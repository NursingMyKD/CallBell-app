"use client";
import * as React from 'react';
import CallRequestGrid from '@/components/call-request-grid';
import Soundboard from '@/components/soundboard';
import LanguageSelector from '@/components/language-selector';
import { appTranslations, type LanguageCode } from '@/lib/translations';
import Logo from '@/components/logo';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageCode>('en');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12">
       <div className="relative mb-4 md:mb-6">
         <Logo className="w-48 h-48 text-foreground" />
         <h1 className="absolute bottom-5 left-0 right-0 text-4xl font-bold text-center text-foreground">
           {appTranslations.page.title[selectedLanguage]}
         </h1>
       </div>
       <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-center max-w-lg md:max-w-2xl">
         {appTranslations.page.description[selectedLanguage]}
       </p>
       <LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} />
      <CallRequestGrid selectedLanguage={selectedLanguage} />
      <Soundboard selectedLanguage={selectedLanguage} />
    </main>
  );
}
