

export const authConfig = {
  clientId: 'oauth-pkce-client',
  authorizationEndpoint: 'http://127.0.0.1:8181/realms/fitness-oauth/protocol/openid-connect/auth',
  tokenEndpoint: 'http://127.0.0.1:8181/realms/fitness-oauth/protocol/openid-connect/token',
  redirectUri: 'http://localhost:5173/',
  scope: 'openid profile email offline_access',
  onRefreshTokenExpire: (event) => event.logIn(),
}