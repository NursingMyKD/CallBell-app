// src/hooks/use-translations.ts
import * as React from 'react';
import { appTranslations, type LanguageCode } from '@/lib/translations';

type Translations = typeof appTranslations;

const getTranslatedValue = (target: any, lang: LanguageCode): any => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  const allLangCodes = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'nl', 'ru', 'zh', 'hi', 'ar', 'bn', 'ko', 'tr', 'pl', 'sv', 'vi', 'id', 'ur', 'tl', 'th', 'el', 'cs', 'hu', 'ro', 'da', 'fi'];
  const keys = Object.keys(target);
  const isTranslationNode = keys.length > 0 && keys.every(k => allLangCodes.includes(k));

  if (isTranslationNode) {
    return target[lang] ?? target['en']; // Fallback to English
  }
  
  if (Array.isArray(target)) {
    return target.map(item => getTranslatedValue(item, lang));
  }
  
  const newObj: { [key: string]: any } = {};
  for (const key of keys) {
    newObj[key] = getTranslatedValue(target[key], lang);
  }
  return newObj;
};

export function useTranslations(lang: LanguageCode) {
  return React.useMemo(() => {
    const t = <T extends keyof Translations>(scope: T): any => {
      return getTranslatedValue(appTranslations[scope], lang);
    };
    return t;
  }, [lang]);
}
