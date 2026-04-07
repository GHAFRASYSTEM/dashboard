import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AUTH_STORAGE_KEY = 'ghafra_google_auth'

type GoogleJwtPayload = {
  sub: string
  email?: string
  name?: string
  picture?: string
  given_name?: string
  family_name?: string
}

export type AuthUser = {
  id: string
  email: string
  name: string
  picture?: string
  givenName?: string
  familyName?: string
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isReady: boolean
  signInTemporary: () => void
  signInWithGoogleCredential: (credential: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function parseGoogleCredential(credential: string): AuthUser {
  const decoded = jwtDecode<GoogleJwtPayload>(credential)

  if (!decoded.sub || !decoded.email || !decoded.name) {
    throw new Error('Google response did not contain required user fields.')
  }

  return {
    id: decoded.sub,
    email: decoded.email,
    name: decoded.name,
    picture: decoded.picture,
    givenName: decoded.given_name,
    familyName: decoded.family_name,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  const setAuthenticatedUser = (nextUser: AuthUser) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored) as AuthUser)
      }
    } catch (error) {
      console.error('Failed to restore auth session:', error)
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } finally {
      setIsReady(true)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isReady,
      signInTemporary: () => {
        setAuthenticatedUser({
          id: 'temporary-admin',
          email: 'admin@ghafra.local',
          name: 'Temporary Admin',
          givenName: 'Temporary',
          familyName: 'Admin',
        })
      },
      signInWithGoogleCredential: (credential: string) => {
        const nextUser = parseGoogleCredential(credential)
        setAuthenticatedUser(nextUser)
      },
      signOut: () => {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        setUser(null)
      },
    }),
    [isReady, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider.')
  }

  return context
}
