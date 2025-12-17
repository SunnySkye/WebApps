# React OIDC Template

A React web application template with OpenID Connect (OIDC) authentication configured.

## Features

- 🔐 **OIDC Authentication** - Built-in support for OpenID Connect authentication using `react-oidc-context` and `oidc-client-ts`
- ⚡ **Vite** - Fast development and build tooling
- 📝 **TypeScript** - Full TypeScript support
- 🎨 **Modern React** - Built with React 19
- 🌙 **Dark Mode** - Automatic dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- An OIDC provider (Azure AD, Auth0, Okta, Keycloak, etc.)

### Installation

1. Clone this repository or copy the template

2. Install dependencies:
   ```bash
   cd react-oidc-template
   npm install
   ```

3. Configure your OIDC provider (see [Configuration](#configuration))

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure your OIDC settings:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your OIDC provider details:

```env
VITE_OIDC_AUTHORITY=https://your-oidc-provider.com
VITE_OIDC_CLIENT_ID=your-client-id
VITE_OIDC_REDIRECT_URI=http://localhost:5173
VITE_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:5173
VITE_OIDC_SCOPE=openid profile email
```

### Provider-Specific Configuration

#### Azure AD / Entra ID

```env
VITE_OIDC_AUTHORITY=https://login.microsoftonline.com/{tenant-id}/v2.0
VITE_OIDC_CLIENT_ID=your-app-registration-client-id
```

#### Auth0

```env
VITE_OIDC_AUTHORITY=https://{your-domain}.auth0.com
VITE_OIDC_CLIENT_ID=your-auth0-client-id
```

#### Okta

```env
VITE_OIDC_AUTHORITY=https://{your-domain}.okta.com/oauth2/default
VITE_OIDC_CLIENT_ID=your-okta-client-id
```

#### Keycloak

```env
VITE_OIDC_AUTHORITY=https://{your-domain}/realms/{realm-name}
VITE_OIDC_CLIENT_ID=your-keycloak-client-id
```

### OIDC Provider Setup

When registering your application with your OIDC provider, configure:

1. **Application Type**: Single Page Application (SPA)
2. **Redirect URI**: `http://localhost:5173` (development) or your production URL
3. **Post-Logout Redirect URI**: Same as redirect URI
4. **Grant Types**: Authorization Code with PKCE
5. **Scopes**: `openid`, `profile`, `email` (and any custom scopes you need)

## Project Structure

```
react-oidc-template/
├── src/
│   ├── auth/
│   │   └── authConfig.ts      # OIDC configuration
│   ├── components/
│   │   ├── AuthStatus.tsx     # Login/logout buttons and user info
│   │   ├── ProtectedRoute.tsx # Route guard for authenticated content
│   │   ├── UserProfile.tsx    # User profile display
│   │   └── index.ts           # Component exports
│   ├── App.tsx                # Main application component
│   ├── App.css                # Application styles
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── .env.example               # Environment variable template
├── index.html                 # HTML template
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Components

### `AuthStatus`

Displays the current authentication status with login/logout buttons.

```tsx
import { AuthStatus } from './components';

<AuthStatus />
```

### `ProtectedRoute`

Wraps content that requires authentication.

```tsx
import { ProtectedRoute } from './components';

<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

### `UserProfile`

Displays the authenticated user's profile information.

```tsx
import { UserProfile } from './components';

<UserProfile />
```

## Using the Auth Hook

You can access authentication state anywhere in your app using the `useAuth` hook:

```tsx
import { useAuth } from 'react-oidc-context';

function MyComponent() {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;
  
  if (auth.isAuthenticated) {
    return (
      <div>
        <p>Welcome, {auth.user?.profile.name}!</p>
        <p>Access Token: {auth.user?.access_token}</p>
        <button onClick={() => auth.signoutRedirect()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => auth.signinRedirect()}>Sign In</button>;
}
```

## Security Considerations

- This template uses the **Authorization Code flow with PKCE**, which is the recommended flow for SPAs
- Access tokens are stored in memory by default (not localStorage) for improved security
- Configure **automaticSilentRenew** to keep tokens fresh without user interaction
- Always use HTTPS in production
- Validate tokens on your backend APIs

## Learn More

- [react-oidc-context](https://github.com/authts/react-oidc-context) - React integration library
- [oidc-client-ts](https://github.com/authts/oidc-client-ts) - Underlying OIDC client library
- [OpenID Connect](https://openid.net/connect/) - OIDC specification
- [Vite](https://vitejs.dev/) - Build tool documentation
- [React](https://react.dev/) - React documentation
