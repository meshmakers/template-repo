import { AuthorizeOptions } from '@meshmakers/shared-auth';
import { ClientDto } from '../models/client.model';

/**
 * Copies the runtime configuration (assets/config.json) into the authorize options.
 *
 * `defaultTenantId` makes the sign-in send `acr_values=tenant:<tenantId>`, so the identity service opens the login
 * page of the app's tenant directly instead of asking for the tenant first.
 */
export function applyClientConfig(options: AuthorizeOptions, clientConfig: ClientDto): void {
  options.issuer = clientConfig.issuer;
  options.clientId = clientConfig.clientId;
  options.scope = clientConfig.scope;
  options.defaultTenantId = clientConfig.tenantId || undefined;
  // The authorize interceptor sends the access token only to these service URIs (prefix match).
  options.wellKnownServiceUris = [clientConfig.apiServices, clientConfig.assetServices].filter(
    (uri, index, all) => !!uri && all.indexOf(uri) === index
  );
}
