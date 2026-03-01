import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageDto } from '../models/language.model';
import { LanguageSettingsDto } from '../models/language-settings.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  readonly currentLanguage = signal<LanguageDto | null>(null);

  private supportedLanguages: LanguageDto[] = [];
  private defaultLanguage: LanguageDto | null = null;

  initialize(settings: LanguageSettingsDto): void {
    this.supportedLanguages = settings.supportedLanguages;
    this.defaultLanguage = settings.defaultLanguage;

    const defaultCode = settings.defaultLanguage.cultureCode;
    this.translate.setDefaultLang(defaultCode);
    this.translate.use(defaultCode);
    this.currentLanguage.set(settings.defaultLanguage);
  }

  getSupportedLanguages(): LanguageDto[] {
    return this.supportedLanguages;
  }

  getDefaultLanguage(): LanguageDto | null {
    return this.defaultLanguage;
  }

  isSupported(cultureCode: string): boolean {
    return this.supportedLanguages.some(
      (l) => l.cultureCode === cultureCode
    );
  }

  setActiveLanguage(cultureCode: string): void {
    const lang = this.supportedLanguages.find(
      (l) => l.cultureCode === cultureCode
    );
    if (lang) {
      this.translate.use(cultureCode);
      this.currentLanguage.set(lang);
    }
  }

  changeLanguage(cultureCode: string): void {
    this.setActiveLanguage(cultureCode);
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    if (segments.length > 1) {
      segments[1] = cultureCode;
      this.router.navigateByUrl(segments.join('/'));
    }
  }

  toDefaultLanguageUrl(path?: string): string {
    const defaultCode = this.defaultLanguage?.cultureCode ?? 'en-GB';
    return path ? `/${defaultCode}/${path}` : `/${defaultCode}`;
  }
}
