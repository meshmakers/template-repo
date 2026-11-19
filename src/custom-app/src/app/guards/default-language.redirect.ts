import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

/** Culture code used when the configuration names no default language. */
export const FALLBACK_LANGUAGE = 'en-GB';

/** The culture code of the configured default language, or {@link FALLBACK_LANGUAGE}. */
export function defaultLanguageCode(
  languageService: Pick<LanguageService, 'getDefaultLanguage'>
): string {
  return languageService.getDefaultLanguage()?.cultureCode ?? FALLBACK_LANGUAGE;
}

/** `redirectTo` of the routes without a language: sends the user to the default language. */
export function redirectToDefaultLanguage(): string {
  return defaultLanguageCode(inject(LanguageService));
}
