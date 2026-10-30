import { useId, useMemo, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Check, ChevronDown, Search } from 'lucide-react'
import {
  AsYouType,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'
import examples from 'libphonenumber-js/mobile/examples'
import { Input } from '../../../components/ui/input'
import { findCountry, joinPhone, searchCountries, splitPhone } from '../utils/phone'
import type { CountryOption } from '../utils/phone'
import { CountryFlag } from './country-flag'

interface Props {
  id: string
  // Saved number in international format ("+33 6 12 34 56 78"), or '' when empty.
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  invalid?: boolean
  describedBy?: string
}

export function PhoneField({ id, value, onChange, onBlur, invalid, describedBy }: Props) {
  const [initial] = useState(() => splitPhone(value))
  const [country, setCountry] = useState<CountryCode>(initial.country)
  const [digits, setDigits] = useState(initial.digits)

  // Shown the way it reads after the country code: "+33" then "6 12 34 56 78", without the leading 0.
  const callingCode = getCountryCallingCode(country)
  const display = digits ? new AsYouType().input(`+${callingCode}${digits}`).replace(`+${callingCode}`, '').trim() : ''
  const example = getExampleNumber(country, examples)
  const placeholder = example?.formatInternational().replace(`+${example.countryCallingCode}`, '').trim()

  function changeNumber(text: string) {
    // A pasted international number ("+233 24 123 4567") also switches the country.
    if (text.trim().startsWith('+')) {
      const parsed = parsePhoneNumberFromString(text)
      if (parsed?.country) {
        setCountry(parsed.country)
        setDigits(parsed.nationalNumber)
        onChange(parsed.formatInternational())
        return
      }
    }
    let next = text.replace(/\D/g, '')
    // Deleting a space or bracket from the formatted number removes the digit before it instead.
    if (next === digits && text.length < display.length) next = digits.slice(0, -1)
    // Drop the leading 0 (or the country's other trunk prefix, e.g. 8 in Russia): it isn't dialled
    // after the country code. Countries that keep it, like Italy, keep it.
    next = withoutTrunkPrefix(next, country)
    // Stop at the longest number the selected country allows; a longer paste is cut to fit.
    while (next && validatePhoneNumberLength(next, country) === 'TOO_LONG') next = next.slice(0, -1)
    setDigits(next)
    onChange(joinPhone(country, next))
  }

  function changeCountry(next: CountryCode) {
    // Drop a number that is too long for the newly selected country.
    const kept = digits && validatePhoneNumberLength(digits, next) === 'TOO_LONG' ? '' : digits
    setCountry(next)
    setDigits(kept)
    onChange(joinPhone(next, kept))
  }

  return (
    <div className="flex gap-2">
      <CountryCodePicker id={`${id}_country`} value={country} onChange={changeCountry} invalid={invalid} />
      <Input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={display}
        placeholder={placeholder}
        onChange={(e) => changeNumber(e.target.value)}
        onBlur={onBlur}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="min-w-0 flex-1 border-border bg-secondary"
      />
    </div>
  )
}

function withoutTrunkPrefix(digits: string, country: CountryCode) {
  if (!digits) return ''
  const formatter = new AsYouType(country)
  formatter.input(digits)
  return formatter.getNationalNumber()
}

function CountryCodePicker({
  id,
  value,
  onChange,
  invalid,
}: {
  id: string
  value: CountryCode
  onChange: (code: CountryCode) => void
  invalid?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listId = useId()
  const results = useMemo(() => searchCountries(query), [query])
  const selected = findCountry(value)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    setQuery('')
    setActive(0)
  }

  function pick(option: CountryOption) {
    onChange(option.code)
    handleOpenChange(false)
  }

  function moveTo(index: number) {
    setActive(index)
    document.getElementById(`${listId}-${index}`)?.scrollIntoView({ block: 'nearest' })
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveTo(Math.min(active + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveTo(Math.max(active - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (results[active]) pick(results[active])
    }
  }

  return (
    // Modal so the list scrolls with the mouse wheel while the form dialog is open.
    <Popover.Root open={open} onOpenChange={handleOpenChange} modal>
      <Popover.Trigger asChild>
        <button
          type="button"
          id={id}
          aria-label={`Country code: ${selected.name} +${selected.dial}`}
          aria-invalid={invalid}
          className="flex h-9 w-[120px] shrink-0 items-center gap-2 rounded-md border border-border bg-secondary px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
        >
          <CountryFlag code={value} />
          <span className="font-medium">+{selected.dial}</span>
          <ChevronDown className="ml-auto size-4 opacity-60" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className="z-50 w-72 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
        >
          <div className="relative mb-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              role="combobox"
              aria-label="Search country or code"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
              value={query}
              placeholder="Country or code, e.g. +33"
              onChange={(e) => {
                setQuery(e.target.value)
                setActive(0)
              }}
              onKeyDown={handleKeyDown}
              className="h-8 w-full rounded-sm bg-secondary pr-2 pl-8 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <ul id={listId} role="listbox" aria-label="Countries" className="max-h-64 overflow-y-auto">
            {results.map((option, index) => (
              <li
                key={option.code}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                onClick={() => pick(option)}
                onMouseEnter={() => setActive(index)}
                className={`flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm ${index === active ? 'bg-accent text-accent-foreground' : ''}`}
              >
                <CountryFlag code={option.code} />
                <span className="min-w-0 flex-1 truncate">{option.name}</span>
                <span className={index === active ? 'opacity-80' : 'text-muted-foreground'}>+{option.dial}</span>
                {option.code === value && <Check className="size-4 shrink-0" />}
              </li>
            ))}
            {results.length === 0 && (
              <li role="presentation" className="px-2 py-1.5 text-xs text-muted-foreground">
                No country matches “{query}”.
              </li>
            )}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
