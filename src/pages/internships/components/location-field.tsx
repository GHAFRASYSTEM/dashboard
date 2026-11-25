import { useEffect, useId, useRef, useState } from 'react'
import { Check, Globe, Loader2, MapPin } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { searchPlaces } from '../../../api/placesApi'
import type { PlaceSuggestion } from '../../../api/placesApi'

const REMOTE: PlaceSuggestion = { label: 'Remote', name: 'Remote', detail: 'Work from anywhere' }

interface Props {
  id: string
  // The saved location. It stays empty until the user picks a suggestion, so free text never gets saved.
  value: string
  onChange: (value: string) => void
  invalid?: boolean
  describedBy?: string
}

export function LocationField({ id, value, onChange, invalid, describedBy }: Props) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const [places, setPlaces] = useState<PlaceSuggestion[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [active, setActive] = useState(0)
  const timer = useRef<number | undefined>(undefined)
  const controller = useRef<AbortController | null>(null)
  const listId = useId()

  const term = query.trim()
  const committed = value !== '' && value === query
  const options: PlaceSuggestion[] = [
    ...(term === '' || 'remote'.startsWith(term.toLowerCase()) ? [REMOTE] : []),
    ...places,
    // If the lookup service is down, admins can still save what they typed rather than being blocked.
    ...(status === 'error' && term.length >= 2 ? [{ label: term, name: `Use "${term}"`, detail: 'Suggestions are unavailable right now' }] : []),
  ]

  useEffect(
    () => () => {
      window.clearTimeout(timer.current)
      controller.current?.abort()
    },
    [],
  )

  function search(text: string) {
    window.clearTimeout(timer.current)
    controller.current?.abort()
    const trimmed = text.trim()
    if (!trimmed) {
      setPlaces([])
      setStatus('idle')
      return
    }
    setStatus('loading')
    timer.current = window.setTimeout(async () => {
      const next = new AbortController()
      controller.current = next
      try {
        const results = await searchPlaces(trimmed, next.signal)
        if (next.signal.aborted) return
        setPlaces(results)
        setStatus('idle')
        setActive(0)
      } catch {
        if (next.signal.aborted) return
        setPlaces([])
        setStatus('error')
      }
    }, 300)
  }

  function handleInput(text: string) {
    setQuery(text)
    setOpen(true)
    setActive(0)
    if (value) onChange('')
    search(text)
  }

  function select(option: PlaceSuggestion) {
    onChange(option.label)
    setQuery(option.label)
    setPlaces([])
    setOpen(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActive((index) => Math.min(index + 1, options.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && open && options[active]) {
      // Pick the highlighted place instead of submitting the form.
      event.preventDefault()
      select(options[active])
    } else if (event.key === 'Escape' && open) {
      setOpen(false)
    }
  }

  const hint =
    status === 'loading' ? 'Searching…'
    : status === 'error' ? "Couldn't load suggestions."
    : !term ? 'Start typing a city name.'
    : places.length === 0 ? 'No places found. Check the spelling.'
    : null

  return (
    <div className="relative">
      <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && options[active] ? `${listId}-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        autoComplete="off"
        value={query}
        placeholder="Search for a city, or choose Remote"
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => !committed && setOpen(true)}
        onBlur={() => setOpen(false)}
        className="border-border bg-secondary pr-9 pl-9"
      />
      {status === 'loading' ? (
        <Loader2 className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
      ) : committed ? (
        <Check aria-label="Location selected" className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
      ) : null}

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Location suggestions"
          className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {options.map((option, index) => {
            const Icon = option === REMOTE ? Globe : MapPin
            return (
              <li
                key={`${option.label}-${index}`}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                // Keep focus in the input so the list doesn't close before the click lands.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(option)}
                onMouseEnter={() => setActive(index)}
                className={`flex cursor-pointer items-start gap-2 rounded-sm px-2 py-1.5 text-sm ${index === active ? 'bg-accent text-accent-foreground' : ''}`}
              >
                <Icon className="mt-0.5 size-4 shrink-0 opacity-70" />
                <span className="min-w-0">
                  <span className="block truncate font-medium">{option.name}</span>
                  <span className={`block truncate text-xs ${index === active ? 'opacity-80' : 'text-muted-foreground'}`}>
                    {option.detail}
                  </span>
                </span>
              </li>
            )
          })}
          {hint && (
            <li role="presentation" className="px-2 py-1.5 text-xs text-muted-foreground">
              {hint}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}
