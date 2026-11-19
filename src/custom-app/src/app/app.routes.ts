import { Routes } from '@angular/router';
import { authorizeGuard } from '@meshmakers/shared-auth';
import { languageGuard } from './guards/language.guard';
import { redirectToDefaultLanguage } from './guards/default-language.redirect';
import { HomeComponent } from './pages/home/home';
import { DeveloperInfoComponent } from './pages/developer-info/developer-info';

export const routes: Routes = [
  {
    path: '',
    redirectTo: redirectToDefaultLanguage,
    pathMatch: 'full',
  },
  {
    path: ':lang',
    canActivate: [languageGuard, authorizeGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          breadcrumb: [{ label: 'Home' }],
        },
      },
      {
        path: 'developer-info',
        component: DeveloperInfoComponent,
        data: {
          breadcrumb: [
            { label: 'Home', url: '' },
            { label: 'Developer Info' },
          ],
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: redirectToDefaultLanguage,
  },
];
