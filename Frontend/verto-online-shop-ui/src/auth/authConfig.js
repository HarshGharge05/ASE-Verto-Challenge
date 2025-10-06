export const authConfig = {
  clientId: "verto-client-credentials",
  authorizationEndpoint:
    "http://localhost:8181/realms/verto-onlineshop-security/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8181/realms/verto-onlineshop-security/protocol/openid-connect/token",
  redirectUri: "http://localhost:5173/",
  scope: "openid profile email offline_access",
  onRefreshTokenExpires: (event) => event.logIn(),
};
