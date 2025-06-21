
// src/hooks/use-translations.ts
import * as React from 'react';
import { appTranslations, type LanguageCode } from '@/lib/translations';

// This type helper will ensure that when we access a field like `appTranslations[scope].someKey[lang]`,
// we get the translated string type, not the object with all language keys.
type Translated<T, L extends LanguageCode> = T extends Record<L, infer U>
  ? U
  : T extends Array<infer A>
  ? Array<ProxyTranslated<A, L>>
  : T extends object
  ? { readonly [K in keyof T]: ProxyTranslated<T[K], L> }
  : T;

// This is a more specific type for the proxy to ensure deep translation.
type ProxyTranslated<O, L extends LanguageCode> = O extends object
  ? {
      // For properties that are translation objects (e.g., { en: string, es: string })
      [P in keyof O]: O[P] extends Record<L, any>
        ? O[P][L] extends Array<any> // Check if the language-specific value is an array
          ? O[P][L] // If so, return it directly (e.g., for phrases)
          : Translated<O[P], L> // Otherwise, apply standard translation
        // For arrays, recursively apply ProxyTranslated to each element
        : O[P] extends Array<infer A>
        ? Array<ProxyTranslated<A, L>>
        // For nested objects that are not translation objects or arrays, recurse
        : O[P] extends object
        ? ProxyTranslated<O[P], L>
        // For primitive types or anything else, keep as is
        : O[P];
    }
  : O;


export function useTranslations(lang: LanguageCode) {
  // Memoize the 't' function itself based on 'lang'
  // This ensures that the 't' function reference is stable as long as 'lang' doesn't change.
  return React.useCallback(
    function t<T extends keyof typeof appTranslations>(
      scope: T
    ): ProxyTranslated<(typeof appTranslations)[T], LanguageCode> {
      const createProxy = (target: any): any => {
        if (typeof target !== 'object' || target === null) {
          return target;
        }

        const langKeysForTarget = Object.keys(target);
        const allLangCodes = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'nl', 'ru', 'zh', 'hi', 'ar', 'bn', 'ko', 'tr', 'pl', 'sv', 'vi', 'id', 'ur', 'tl', 'th', 'el', 'cs', 'hu', 'ro', 'da', 'fi'];
        const isTargetSimpleTranslation = langKeysForTarget.length > 0 &&
                                       langKeysForTarget.every(k => allLangCodes.includes(k) && typeof target[k] === 'string');
        if (lang in target && isTargetSimpleTranslation) {
          return target[lang];
        }

        if (Array.isArray(target)) {
          return target.map(item => createProxy(item));
        }
        
        const handler = {
          get: (_target: any, prop: string | symbol) => {
            const value = _target[prop as string];

            if (value && typeof value === 'object') {
              if (lang in value) {
                const langSpecificValue = value[lang];
                const valueKeys = Object.keys(value);

                if (typeof langSpecificValue === 'string') {
                  const isSimpleTranslationObject = valueKeys.length > 0 && 
                                                   valueKeys.every(k => allLangCodes.includes(k) && typeof value[k] === 'string');
                  if (isSimpleTranslationObject) {
                    return langSpecificValue;
                  }
                } 
                else if (Array.isArray(langSpecificValue)) {
                  const isLanguageArrayObject = valueKeys.length > 0 && 
                                                valueKeys.every(k => allLangCodes.includes(k) && Array.isArray(value[k]));
                  if (isLanguageArrayObject) {
                    return langSpecificValue; 
                  }
                }
              }
              return createProxy(value);
            }
            return value; 
          }
        };
        return new Proxy(target, handler);
      };
      return createProxy(appTranslations[scope]);
    },
    [lang] // The 't' function will be re-created only if 'lang' changes.
  );
}
