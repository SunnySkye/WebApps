import { AuthStatus, ProtectedRoute, UserProfile } from './components'
import './App.css'

/**
 * React OIDC Authentication Template
 * 
 * This application demonstrates OIDC (OpenID Connect) authentication
 * integration using react-oidc-context and oidc-client-ts.
 * 
 * Features:
 * - AuthStatus: Shows login/logout buttons and user info
 * - ProtectedRoute: Guards content requiring authentication
 * - UserProfile: Displays authenticated user's profile information
 * 
 * Configure your OIDC provider in src/auth/authConfig.ts
 */
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React OIDC Template</h1>
        <AuthStatus />
      </header>

      <main className="app-main">
        <section className="public-section">
          <h2>Welcome</h2>
          <p>
            This is a public section that anyone can view.
            Sign in to access protected content.
          </p>
        </section>

        <section className="protected-section">
          <h2>Protected Content</h2>
          <ProtectedRoute>
            <div className="protected-content">
              <p>🔒 You are now viewing protected content!</p>
              <UserProfile />
            </div>
          </ProtectedRoute>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Configure OIDC in <code>src/auth/authConfig.ts</code> or via environment variables.
        </p>
      </footer>
    </div>
  )
}

export default App
