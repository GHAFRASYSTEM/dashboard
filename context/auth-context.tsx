import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { supabase } from '../src/lib/supabase'
import type { Session } from '@supabase/supabase-js'

export type AuthUser = {
  id: string
  email: string
  name: string
  picture?: string
  role?: string
}

type AuthContextValue = {
  user: AuthUser | null
  session: Session | null
  isAuthenticated: boolean
  isReady: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Sync a Supabase session into state — single source of truth
  const syncSession = useCallback(async (s: Session | null) => {
    if (!s) {
      setSession(null)
      setUser(null)
      return
    }
    setSession(s)
    // Fetch the profile from your backend to get role etc.
    try {
      const res = await fetch('https://backend-016i.onrender.com/auth/me', {
        headers: { Authorization: `Bearer ${s.access_token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data.data ?? data) // adjust to your ok() shape
      } else {
        // Valid Supabase session but backend doesn't recognise us (yet)
        console.error('/auth/me failed with status', res.status)
        setUser(null)
      }
    } catch {
      // If /me fails, fall back to Supabase user metadata
      setUser({
        id: s.user.id,
        email: s.user.email ?? '',
        name: s.user.user_metadata?.full_name ?? '',
        picture: s.user.user_metadata?.avatar_url,
      })
    }
  }, [])

  useEffect(() => {
    // 1. Restore existing session on mount (handles page refresh)
    supabase.auth.getSession().then(({ data }) => {
      syncSession(data.session).finally(() => setIsReady(true))
    })

    // 2. React to future auth events (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      syncSession(s)
    })

    return () => subscription.unsubscribe()
  }, [syncSession])

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }, [])

  const refreshUser = useCallback(async () => {
    const { data } = await supabase.auth.getSession()
    await syncSession(data.session)
  }, [syncSession])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    // onAuthStateChange fires with null → syncSession clears state
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, session, isAuthenticated: Boolean(user), isReady, signInWithGoogle, signOut, refreshUser }),
    [user, session, isReady, signInWithGoogle, signOut, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an AuthProvider.')
  return context
}