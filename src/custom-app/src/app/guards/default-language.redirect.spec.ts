import { defaultLanguageCode, FALLBACK_LANGUAGE } from './default-language.redirect';
import { routes } from '../app.routes';

describe('defaultLanguageCode', () => {
  it('returns the configured default language', () => {
    const service = {
      getDefaultLanguage: () => ({ cultureCode: 'de-AT', name: 'Deutsch (AT)', flagIcon: 'at' }),
    };
    expect(defaultLanguageCode(service)).toBe('de-AT');
  });

  it('falls back to en-GB when no default language is configured', () => {
    expect(defaultLanguageCode({ getDefaultLanguage: () => null })).toBe(FALLBACK_LANGUAGE);
    expect(FALLBACK_LANGUAGE).toBe('en-GB');
  });
});

describe('routes without a language', () => {
  it('the empty path and the wildcard both redirect to the default language', () => {
    const empty = routes.find((route) => route.path === '');
    const wildcard = routes.find((route) => route.path === '**');
    expect(typeof empty?.redirectTo).toBe('function');
    expect(wildcard?.redirectTo).toBe(empty?.redirectTo);
  });
});
