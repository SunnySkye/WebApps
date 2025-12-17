import type { AuthProviderProps } from "react-oidc-context";

/**
 * OIDC Authentication Configuration
 * 
 * Configure your OIDC provider settings here. These values should typically
 * be set via environment variables for different environments (development, 
 * staging, production).
 * 
 * Common OIDC Providers:
 * - Azure AD / Entra ID
 * - Auth0
 * - Okta
 * - Keycloak
 * - AWS Cognito
 * - Google Identity Platform
 */
export const oidcConfig: AuthProviderProps = {
  // The authority URL of your OIDC provider (issuer URL)
  // Examples:
  // - Azure AD: https://login.microsoftonline.com/{tenant-id}/v2.0
  // - Auth0: https://{your-domain}.auth0.com
  // - Okta: https://{your-domain}.okta.com/oauth2/default
  // - Keycloak: https://{your-domain}/realms/{realm-name}
  authority: import.meta.env.VITE_OIDC_AUTHORITY || "https://your-oidc-provider.com",

  // The client ID registered with your OIDC provider
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID || "your-client-id",

  // The URL to redirect to after successful authentication
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI || window.location.origin,

  // The URL to redirect to after logout (optional)
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI || window.location.origin,

  // OAuth 2.0 response type
  // "code" for Authorization Code flow with PKCE (recommended)
  response_type: "code",

  // OAuth 2.0 scopes to request
  // "openid" is required for OIDC
  // "profile" and "email" are common optional scopes
  scope: import.meta.env.VITE_OIDC_SCOPE || "openid profile email",

  // Automatically sign-in silently when the access token is about to expire
  automaticSilentRenew: true,

  // Callback function triggered when a user is loaded/updated
  onSigninCallback: () => {
    // Remove the OIDC response parameters from the URL after sign-in
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

/**
 * Environment variable configuration reference:
 * 
 * Create a .env.local file in the project root with your OIDC settings:
 * 
 * VITE_OIDC_AUTHORITY=https://your-oidc-provider.com
 * VITE_OIDC_CLIENT_ID=your-client-id
 * VITE_OIDC_REDIRECT_URI=http://localhost:5173
 * VITE_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:5173
 * VITE_OIDC_SCOPE=openid profile email
 */
