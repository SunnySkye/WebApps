import { useAuth } from "react-oidc-context";

/**
 * AuthStatus Component
 * 
 * Displays the current authentication status and provides login/logout buttons.
 * This component can be placed in a header or navigation bar.
 * 
 * Features:
 * - Shows loading state during authentication
 * - Displays user information when authenticated
 * - Provides login and logout buttons
 */
export function AuthStatus() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div className="auth-status">Loading...</div>;
  }

  if (auth.error) {
    return (
      <div className="auth-status auth-status-error">
        <span>Error: {auth.error.message}</span>
        <button onClick={() => auth.signinRedirect()}>
          Retry Login
        </button>
      </div>
    );
  }

  if (auth.isAuthenticated && auth.user) {
    return (
      <div className="auth-status auth-status-authenticated">
        <span className="user-info">
          Welcome, {auth.user.profile.name || auth.user.profile.email || "User"}
        </span>
        <button 
          onClick={() => auth.signoutRedirect()}
          className="logout-button"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="auth-status auth-status-unauthenticated">
      <button 
        onClick={() => auth.signinRedirect()}
        className="login-button"
      >
        Sign In
      </button>
    </div>
  );
}
