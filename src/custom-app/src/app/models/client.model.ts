export interface ClientDto {
  tenantId: string;
  assetServices: string;
  apiServices: string;
  issuer: string;
  clientId: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  scope: string;
}
