
"use client";
import * as React from 'react';
import { Button } from '@/components/ui/button';
import type { LanguageCode } from '@/lib/translations';
import { appTranslations } from '@/lib/translations';

interface LanguageSelectorProps {
  selectedLanguage: LanguageCode;
  onSelectLanguage: (language: LanguageCode) => void;
}

export default function LanguageSelector({ selectedLanguage, onSelectLanguage }: LanguageSelectorProps) {
  const languages: { code: LanguageCode; name: string }[] = [
    { code: 'en', name: 'English' }, // These names are not translated as they are for language selection itself
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }, // Added French
  ];

  return (
    <div className="my-3 md:my-4 flex flex-col items-center">
      <p className="text-sm md:text-md text-muted-foreground mb-2">
        {appTranslations.page.languageSelectorLabel[selectedLanguage]}
      </p>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? 'default' : 'outline'}
            onClick={() => onSelectLanguage(lang.code)}
            className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg"
            size="sm"
          >
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
