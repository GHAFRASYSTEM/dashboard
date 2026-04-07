import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { useAuth } from '../../auth/auth-context'

type LoginLocationState = {
  from?: string
}

export default function LoginPage() {
  const { isAuthenticated, signInTemporary } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as LoginLocationState) ?? {}
  const [fromPath] = [state.from && state.from !== '/auth/login' ? state.from : '/']

  if (isAuthenticated) {
    return <Navigate to={fromPath} replace />
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[420px] w-[420px] rounded-full bg-info/20 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-border/80 bg-card/70 p-7 backdrop-blur-xl sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
              <ShieldCheck className="size-3.5" />
              Secure Admin Access
            </span>

            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Welcome to GHAFRA Admin Dashboard
            </h1>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              Continue with your approved Google account to manage members,
              contributions, housing, and marketplace operations in one place.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-xl border border-border/80 bg-secondary/35 p-4">
                <h2 className="text-sm font-medium">Google-only sign-in</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Access is restricted to Google authentication for a consistent,
                  secure login flow.
                </p>
              </article>
              <article className="rounded-xl border border-border/80 bg-secondary/35 p-4">
                <h2 className="text-sm font-medium">Session persistence</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Your session stays active on this device until you explicitly
                  sign out from the sidebar.
                </p>
              </article>
            </div>
          </section>

          <section className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card/90 p-7 shadow-[0_20px_70px_-35px_oklch(0.72_0.19_145/0.55)] sm:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Sign in
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Continue to Dashboard
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Temporary access mode is enabled while backend authentication is being integrated.
              </p>
            </div>

            <div className="mt-8">
              <Button
                type="button"
                className="h-11 w-full rounded-xl text-sm font-medium"
                onClick={() => {
                  signInTemporary()
                  navigate(fromPath, { replace: true })
                }}
              >
                Login and Open Dashboard
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border/80 pt-5 text-xs text-muted-foreground">
              <span>Need access? Contact your super admin.</span>
              <ArrowRight className="size-3.5" />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
