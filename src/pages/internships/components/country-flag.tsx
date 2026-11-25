import { hasFlag } from 'country-flag-icons'
import * as Flags from 'country-flag-icons/react/3x2'
import { Globe } from 'lucide-react'

// SVG flags, because Windows doesn't draw emoji flags.
export function CountryFlag({ code }: { code: string }) {
  const Flag = hasFlag(code) ? Flags[code as keyof typeof Flags] : undefined
  if (!Flag) return <Globe aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
  return <Flag aria-hidden="true" className="h-3.5 w-5 shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" />
}
