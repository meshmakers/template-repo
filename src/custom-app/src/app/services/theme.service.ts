import { Injectable, inject, signal } from '@angular/core';
import { LOCAL_STORAGE } from '../app.tokens';

const THEME_KEY = 'custom-app-theme';

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
    const html = document.documentElement;
    if (this.isDarkSignal()) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
  }

  private persistTheme(): void {
    this.storage.setItem(THEME_KEY, this.isDarkSignal() ? 'dark' : 'light');
  }
}
