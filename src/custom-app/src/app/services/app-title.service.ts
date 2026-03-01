import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class AppTitleService {
  private readonly titleService = inject(Title);

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  getTitle(): string {
    return this.titleService.getTitle();
  }
}
