
"use client";
import * as React from 'react';
import type { LanguageCode } from '@/lib/translations';
import { appTranslations } from '@/lib/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
    { code: 'id', name: 'Bahasa Indonesia', englishName: 'Indonesian' },
    { code: 'ur', name: 'اردو', englishName: 'Urdu' },
    { code: 'tl', name: 'Tagalog', englishName: 'Filipino' },
    { code: 'th', name: 'ภาษาไทย', englishName: 'Thai' },
    { code: 'el', name: 'Ελληνικά', englishName: 'Greek' },
    { code: 'cs', name: 'Čeština', englishName: 'Czech' },
    { code: 'hu', name: 'Magyar', englishName: 'Hungarian' },
    { code: 'ro', name: 'Română', englishName: 'Romanian' },
    { code: 'da', name: 'Dansk', englishName: 'Danish' },
    { code: 'fi', name: 'Suomi', englishName: 'Finnish' },
  ];

  const handleValueChange = (value: string) => {
    onSelectLanguage(value as LanguageCode);
  };

  return (
    <div className="my-4 md:my-6 flex flex-col items-center w-full max-w-xs md:max-w-sm">
       <Label htmlFor="language-select" className="text-base md:text-lg text-muted-foreground mb-2">
         {appTranslations.page.languageSelectorLabel[selectedLanguage]}
       </Label>
       <Select value={selectedLanguage} onValueChange={handleValueChange}>
         <SelectTrigger id="language-select" className="w-full text-base md:text-lg py-6">
           <SelectValue placeholder="Select a language" />
         </SelectTrigger>
         <SelectContent>
           {languages.sort((a, b) => a.englishName.localeCompare(b.englishName)).map((lang) => (
             <SelectItem key={lang.code} value={lang.code} className="text-base md:text-lg py-2">
               {lang.name}
               {lang.code !== 'en' && <span className="ml-2 text-muted-foreground font-normal">({lang.englishName})</span>}
             </SelectItem>
           ))}
         </SelectContent>
       </Select>
    </div>
  );
}
