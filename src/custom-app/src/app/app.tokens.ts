import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage', {
  factory: (): Storage => window.localStorage,
});
