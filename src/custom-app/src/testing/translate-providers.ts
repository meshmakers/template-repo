import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

class FakeLoader implements TranslateLoader {
  getTranslation(): Observable<Record<string, string>> {
    return of({ GREETING: 'Hello World' });
  }
}

export function provideTranslateTesting(): EnvironmentProviders {
  return importProvidersFrom(
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: FakeLoader },
    })
  );
}
