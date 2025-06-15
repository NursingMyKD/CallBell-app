
// src/hooks/use-translations.ts
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
  return function t<T extends keyof typeof appTranslations>(
    scope: T
  ): ProxyTranslated<(typeof appTranslations)[T], LanguageCode> {
    const createProxy = (target: any): any => {
      if (typeof target !== 'object' || target === null) {
        return target;
      }

      // If the target itself is a translation object (e.g., { en: "Hello", es: "Hola" })
      // This case is for when the 'target' itself is {en: string, es: string, ...}
      const langKeysForTarget = Object.keys(target);
      const isTargetSimpleTranslation = langKeysForTarget.length > 0 &&
                                     langKeysForTarget.every(k => ['en', 'es', 'fr'].includes(k) && typeof target[k] === 'string');
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
            // Check if 'value' is an object where keys are language codes
            // and 'value[lang]' is the actual translated content (string or array).
            if (lang in value) {
              const langSpecificValue = value[lang];
              const valueKeys = Object.keys(value);

              // Case 1: value[lang] is a string (e.g., title: { en: "Title", es: "Título" })
              if (typeof langSpecificValue === 'string') {
                const isSimpleTranslationObject = valueKeys.length > 0 && 
                                                 valueKeys.every(k => ['en','es','fr'].includes(k) && typeof value[k] === 'string');
                if (isSimpleTranslationObject) {
                  return langSpecificValue;
                }
              } 
              // Case 2: value[lang] is an array (e.g., phrases: { en: ["Hi"], es: ["Hola"] })
              else if (Array.isArray(langSpecificValue)) {
                const isLanguageArrayObject = valueKeys.length > 0 && 
                                              valueKeys.every(k => ['en','es','fr'].includes(k) && Array.isArray(value[k]));
                if (isLanguageArrayObject) {
                  return langSpecificValue; // Return the array of phrases for the current language
                }
              }
            }
            // If not directly translatable by 'lang' key or not fitting the above structures,
            // recurse with a proxy. This handles nested objects that are not themselves lang-keyed.
            return createProxy(value);
          }
          return value; // Primitive value or already processed by outer array.map(createProxy)
        }
      };
      return new Proxy(target, handler);
    };
    return createProxy(appTranslations[scope]);
  };
}

