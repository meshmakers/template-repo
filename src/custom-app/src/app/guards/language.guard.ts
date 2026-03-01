import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { LanguageService } from '../services/language.service';

export const languageGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const languageService = inject(LanguageService);
  const router = inject(Router);

  const lang = route.paramMap.get('lang');
  if (!lang || !languageService.isSupported(lang)) {
    const defaultUrl = languageService.toDefaultLanguageUrl();
    return router.parseUrl(defaultUrl);
  }

  languageService.setActiveLanguage(lang);
  return true;
};
