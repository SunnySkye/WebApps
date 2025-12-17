import { useAuth } from "react-oidc-context";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute Component
 * 
 * A wrapper component that ensures only authenticated users can access
 * the wrapped content. If the user is not authenticated, they will be
 * redirected to the OIDC provider's login page.
 * 
 * Usage:
 * ```tsx
 * <ProtectedRoute>
 *   <YourProtectedComponent />
 * </ProtectedRoute>
 * ```
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();

  // Show loading state while checking authentication
  if (auth.isLoading) {
    return (
      <div className="auth-loading">
        <p>Loading authentication...</p>
      </div>
    );
  }

  // Handle authentication errors
  if (auth.error) {
    return (
      <div className="auth-error">
        <h2>Authentication Error</h2>
        <p>{auth.error.message}</p>
        <button onClick={() => auth.signinRedirect()}>
          Try Again
        </button>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    return (
      <div className="auth-required">
        <h2>Authentication Required</h2>
        <p>Please sign in to access this content.</p>
        <button onClick={() => auth.signinRedirect()}>
          Sign In
        </button>
      </div>
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
