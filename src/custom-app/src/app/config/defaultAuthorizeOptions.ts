import { AuthorizeOptions } from '@meshmakers/shared-auth';

export const defaultAuthorizeOptions: AuthorizeOptions = {
  issuer: '',
  redirectUri: window.location.origin + '/',
  postLogoutRedirectUri: window.location.origin + '/',
  clientId: 'custom-app-frontend',
  scope: '',
  showDebugInformation: true,
  sessionChecksEnabled: true,
  wellKnownServiceUris: [],
};
