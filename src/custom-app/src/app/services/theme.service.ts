import { Injectable, inject, signal } from '@angular/core';
import { LOCAL_STORAGE } from '../app.tokens';

const THEME_KEY = 'custom-app-theme';

/**
 * Sets data-theme on the html element to 'dark' or 'light'. Both values are explicit: the Octo tokens of
 * octo-ui are dark by default and switch to light for [data-theme='light'] or, without the attribute, for an OS
 * that prefers light, so a missing attribute would let the OS override the user's choice.
 */
export function applyThemeAttribute(html: HTMLElement, dark: boolean): void {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(LOCAL_STORAGE);
  private readonly isDarkSignal = signal(false);

  readonly isDark = this.isDarkSignal.asReadonly();

  constructor() {
    this.loadTheme();
  }

  toggle(): void {
    this.isDarkSignal.update((dark) => !dark);
    this.applyTheme();
    this.persistTheme();
  }

  private loadTheme(): void {
    const stored = this.storage.getItem(THEME_KEY);
    if (stored !== null) {
      this.isDarkSignal.set(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.isDarkSignal.set(prefersDark);
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    applyThemeAttribute(document.documentElement, this.isDarkSignal());
  }

  private persistTheme(): void {
    this.storage.setItem(THEME_KEY, this.isDarkSignal() ? 'dark' : 'light');
  }
}
