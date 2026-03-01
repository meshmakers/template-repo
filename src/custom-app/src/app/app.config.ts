import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { TranslateLoader } from '@ngx-translate/core';
import { provideTranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  authorizeInterceptor,
  AuthorizeService,
  provideMmSharedAuth,
} from '@meshmakers/shared-auth';
import { provideOctoUi } from '@meshmakers/octo-ui';
import {
  CommandService,
  CommandSettingsService,
} from '@meshmakers/shared-services';
import { routes } from './app.routes';
import { ConfigurationService } from './services/configuration.service';
import { LanguageService } from './services/language.service';
import { AppTitleService } from './services/app-title.service';
import { MyCommandSettingsService } from './services/my-command-settings.service';
import { defaultAuthorizeOptions } from './config/defaultAuthorizeOptions';
import { defaultOctoServiceOptions } from './config/defaultOctoServiceOptions';

class AppTranslationLoader implements TranslateLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(
      `/assets/i18n/${lang}.json`
    );
  }
}

async function initServices(): Promise<void> {
  const configService = inject(ConfigurationService);
  const languageService = inject(LanguageService);
  const authorizeService = inject(AuthorizeService);
  const commandService = inject(CommandService);

  const clientConfig = await configService.loadConfig();
  const langConfig = await configService.loadLanguageConfig();

  languageService.initialize(langConfig);

  defaultAuthorizeOptions.issuer = clientConfig.issuer;
  defaultAuthorizeOptions.clientId = clientConfig.clientId;
  defaultAuthorizeOptions.scope = clientConfig.scope;

  defaultOctoServiceOptions.assetServices = clientConfig.assetServices;

  await authorizeService.initialize(defaultAuthorizeOptions);

  commandService.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(withInterceptors([authorizeInterceptor])),
    provideRouter(routes),
    provideOctoUi(),
    provideMmSharedAuth(),
    AppTitleService,
    { provide: CommandSettingsService, useClass: MyCommandSettingsService },
    provideAppInitializer(initServices),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const configService = inject(ConfigurationService);

      return {
        link: httpLink.create({ uri: configService.getGraphQLUri() }),
        cache: new InMemoryCache({
          typePolicies: {
            RtEntity: { keyFields: ['rtId'] },
          },
        }),
      };
    }),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useClass: AppTranslationLoader,
      },
    }),
  ],
};
