import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const ran = useRef(false) // StrictMode guard

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const handleCallback = async () => {
      // Supabase parses the #access_token hash automatically
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        console.error('No session after OAuth redirect:', error)
        navigate('/auth/login', { replace: true })
        return
      }

      // Tell your backend about this admin sign-in
      try {
        const res = await fetch('https://backend-016i.onrender.com/auth/admin/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: data.session.access_token }),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          console.error('Admin sign-in rejected:', err)
          // Sign out of Supabase so the session isn't dangling
          await supabase.auth.signOut()
          navigate('/auth/login', { replace: true, state: { error: 'Not authorised as admin' } })
          return
        }

        // Auth context auto-syncs via onAuthStateChange — just navigate
        navigate('/', { replace: true })
      } catch (err) {
        console.error('Callback fetch failed:', err)
        navigate('/auth/login', { replace: true })
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="grid min-h-screen place-items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
      <p className="text-sm text-muted-foreground">Signing in…</p>
    </div>
  )
}