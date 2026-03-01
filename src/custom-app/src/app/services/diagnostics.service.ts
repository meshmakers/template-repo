import { Injectable } from '@angular/core';
import { VERSION } from '../../environments/currentVersion';

export interface DevelopmentInfo {
  version: string;
  environment: string;
}

@Injectable({ providedIn: 'root' })
export class DiagnosticsService {
  getDevelopmentInfo(): DevelopmentInfo {
    return {
      version: VERSION.version,
      environment: 'browser',
    };
  }
}
