import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ClientDto } from '../models/client.model';
import { LanguageSettingsDto } from '../models/language-settings.model';

interface AppConfig {
  tenantId: string;
  apiUrl: string;
  authorityUrl: string;
  assetServicesUrl: string;
  clientId: string;
  scope: string;
  defaultLanguage: string;
  supportedLanguages: {
    cultureCode: string;
    name: string;
    flagIcon: string;
  }[];
}

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  private readonly http = inject(HttpClient);
  private config: AppConfig | null = null;

  async loadConfig(): Promise<ClientDto> {
    this.config = await firstValueFrom(
      this.http.get<AppConfig>('/assets/config.json')
    );

    return {
      tenantId: this.config.tenantId,
      assetServices: this.config.assetServicesUrl,
      apiServices: this.config.apiUrl,
      issuer: this.config.authorityUrl,
      clientId: this.config.clientId,
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      scope: this.config.scope,
    };
  }

  async loadLanguageConfig(): Promise<LanguageSettingsDto> {
    if (!this.config) {
      await this.loadConfig();
    }

    const config = this.config!;
    const defaultLang = config.supportedLanguages.find(
      (l) => l.cultureCode === config.defaultLanguage
    ) ?? {
      cultureCode: config.defaultLanguage,
      name: 'English',
      flagIcon: 'gb',
    };

    return {
      defaultLanguage: defaultLang,
      supportedLanguages: config.supportedLanguages,
    };
  }

  getApiUrl(): string {
    return this.config?.apiUrl ?? '';
  }

  getTenantId(): string {
    return this.config?.tenantId ?? '';
  }

  getGraphQLUri(): string {
    const apiUrl = this.getApiUrl();
    const tenantId = this.getTenantId();
    return `${apiUrl}/tenants/${tenantId}/graphQL`;
  }
}
