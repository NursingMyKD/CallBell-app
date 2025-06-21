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
  const languages: { code: LanguageCode; name: string; englishName: string; }[] = [
    { code: 'en', name: 'English', englishName: 'English' },
    { code: 'es', name: 'Español', englishName: 'Spanish' },
    { code: 'fr', name: 'Français', englishName: 'French' },
    { code: 'de', name: 'Deutsch', englishName: 'German' },
    { code: 'pt', name: 'Português', englishName: 'Portuguese' },
    { code: 'it', name: 'Italiano', englishName: 'Italian' },
    { code: 'ja', name: '日本語', englishName: 'Japanese' },
    { code: 'nl', name: 'Nederlands', englishName: 'Dutch' },
    { code: 'ru', name: 'Русский', englishName: 'Russian' },
    { code: 'zh', name: '中文', englishName: 'Chinese' },
    { code: 'hi', name: 'हिन्दी', englishName: 'Hindi' },
    { code: 'ar', name: 'العربية', englishName: 'Arabic' },
    { code: 'bn', name: 'বাংলা', englishName: 'Bengali' },
    { code: 'ko', name: '한국어', englishName: 'Korean' },
    { code: 'tr', name: 'Türkçe', englishName: 'Turkish' },
    { code: 'pl', name: 'Polski', englishName: 'Polish' },
    { code: 'sv', name: 'Svenska', englishName: 'Swedish' },
    { code: 'vi', name: 'Tiếng Việt', englishName: 'Vietnamese' },
  ];

  return (
    <div className="my-3 md:my-4 flex flex-col items-center">
      <p className="text-sm md:text-md text-muted-foreground mb-2">
        {appTranslations.page.languageSelectorLabel[selectedLanguage]}
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? 'default' : 'outline'}
            onClick={() => onSelectLanguage(lang.code)}
            className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg"
            size="sm"
          >
            {lang.name}
            {lang.code !== 'en' && <span className="ml-1.5 text-muted-foreground/80 font-normal">({lang.englishName})</span>}
          </Button>
        ))}
      </div>
    </div>
  );
}
