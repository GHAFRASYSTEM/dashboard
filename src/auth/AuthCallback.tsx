import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { adminGoogleSignIn } from '../api/auth'
import { useAuth } from '../../context/auth-context'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { refreshUser } = useAuth()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        console.error('No session after OAuth redirect:', error)
        navigate('/auth/login', { replace: true })
        return
      }

      try {
        await adminGoogleSignIn(data.session.access_token)
        await refreshUser()

        navigate('/', { replace: true })
      } catch (err) {
        console.error('Admin sign-in rejected:', err)

        await supabase.auth.signOut()
        navigate('/auth/login', {
          replace: true,
          state: { error: 'Not authorised as admin' },
        })
      }
    }

    handleCallback()
  }, [navigate, refreshUser])

  return (
    <div className="grid min-h-screen place-items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
      <p className="text-sm text-muted-foreground">Signing in…</p>
    </div>
  )
}