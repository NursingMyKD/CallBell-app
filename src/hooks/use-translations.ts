
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
        ? Translated<O[P], L>
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
      if (lang in target && Object.keys(target).every(key => ['en', 'es', 'fr'].includes(key) && typeof target[key] === 'string')) {
         // Check if all keys are language codes and values are strings
         const langKeys = Object.keys(target);
         const isTranslationObject = langKeys.length > 0 && langKeys.every(k => ['en', 'es', 'fr'].includes(k));
         if(isTranslationObject && typeof target[lang] === 'string') {
            return target[lang];
         }
      }


      if (Array.isArray(target)) {
        return target.map(item => createProxy(item));
      }
      
      const handler = {
        get: (_target: any, prop: string | symbol) => {
          const value = _target[prop as string];
          if (value && typeof value === 'object') {
            // Check if 'value' is a translation object like { en: "...", es: "..." }
            if (lang in value && typeof value[lang] === 'string' ) {
               const valueKeys = Object.keys(value);
               const isSimpleTranslationObject = valueKeys.length > 0 && valueKeys.every(k => ['en','es','fr'].includes(k) && typeof value[k] === 'string');
               if(isSimpleTranslationObject) return value[lang];
            }
            return createProxy(value); // Recursively create proxy for nested objects/arrays
          }
          return value; // Primitive value
        }
      };
      return new Proxy(target, handler);
    };
    return createProxy(appTranslations[scope]);
  };
}
