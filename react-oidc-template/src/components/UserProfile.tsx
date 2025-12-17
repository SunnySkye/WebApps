import { useAuth } from "react-oidc-context";

/**
 * UserProfile Component
 * 
 * Displays detailed user profile information from the OIDC token claims.
 * This is a protected component that should only be rendered when the user
 * is authenticated.
 * 
 * The available profile information depends on:
 * - The scopes requested (openid, profile, email, etc.)
 * - What claims your OIDC provider includes in the ID token
 */
export function UserProfile() {
  const auth = useAuth();

  if (!auth.isAuthenticated || !auth.user) {
    return null;
  }

  const { profile } = auth.user;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        {profile.picture && (
          <img 
            src={profile.picture} 
            alt="Profile" 
            className="profile-picture"
          />
        )}
        <dl>
          {profile.name && (
            <>
              <dt>Name</dt>
              <dd>{profile.name}</dd>
            </>
          )}
          {profile.email && (
            <>
              <dt>Email</dt>
              <dd>{profile.email}</dd>
            </>
          )}
          {profile.preferred_username && (
            <>
              <dt>Username</dt>
              <dd>{profile.preferred_username}</dd>
            </>
          )}
          {profile.sub && (
            <>
              <dt>Subject ID</dt>
              <dd>{profile.sub}</dd>
            </>
          )}
        </dl>
      </div>
      
      <details className="token-info">
        <summary>Token Information</summary>
        <div className="token-details">
          <p><strong>Access Token Expires:</strong> {auth.user.expires_at 
            ? new Date(auth.user.expires_at * 1000).toLocaleString() 
            : "Unknown"}</p>
          <p><strong>Token Type:</strong> {auth.user.token_type || "Bearer"}</p>
          <p><strong>Scopes:</strong> {auth.user.scope || "N/A"}</p>
        </div>
      </details>
    </div>
  );
}
