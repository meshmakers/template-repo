import { AuthorizeOptions } from '@meshmakers/shared-auth';
import { ClientDto } from '../models/client.model';
import { applyClientConfig } from './apply-client-config';

function clientConfig(overrides: Partial<ClientDto> = {}): ClientDto {
  return {
    tenantId: 'test-ordi',
    assetServices: 'https://assets.example.com',
    apiServices: 'https://api.example.com',
    issuer: 'https://identity.example.com/',
    clientId: 'ordi-frontend-debug',
    redirectUri: 'https://localhost:4300',
    postLogoutRedirectUri: 'https://localhost:4300',
    scope: 'openid profile octo_api offline_access',
    ...overrides,
  };
}

describe('applyClientConfig', () => {
  it('passes the configured tenant as default tenant, so the sign-in skips the tenant discovery', () => {
    const options: AuthorizeOptions = {};
    applyClientConfig(options, clientConfig());
    expect(options.defaultTenantId).toBe('test-ordi');
  });

  it('copies issuer, client id and scope', () => {
    const options: AuthorizeOptions = {};
    applyClientConfig(options, clientConfig());
    expect(options.issuer).toBe('https://identity.example.com/');
    expect(options.clientId).toBe('ordi-frontend-debug');
    expect(options.scope).toBe('openid profile octo_api offline_access');
  });

  it('sends no tenant hint when no tenant is configured', () => {
    const options: AuthorizeOptions = { defaultTenantId: 'stale' };
    applyClientConfig(options, clientConfig({ tenantId: '' }));
    expect(options.defaultTenantId).toBeUndefined();
  });

  it('lists each service URI once and drops empty ones', () => {
    const options: AuthorizeOptions = {};
    applyClientConfig(options, clientConfig({ apiServices: 'https://same.example.com', assetServices: 'https://same.example.com' }));
    expect(options.wellKnownServiceUris).toEqual(['https://same.example.com']);
    applyClientConfig(options, clientConfig({ assetServices: '' }));
    expect(options.wellKnownServiceUris).toEqual(['https://api.example.com']);
  });
});
