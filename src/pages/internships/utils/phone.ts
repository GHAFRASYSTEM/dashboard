import { getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'

export type CountryOption = {
  code: CountryCode
  name: string
  dial: string
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

export const COUNTRIES: CountryOption[] = getCountries()
  .map((code) => ({ code, name: regionNames.of(code) ?? code, dial: getCountryCallingCode(code) }))
  .sort((a, b) => a.name.localeCompare(b.name))

export const DEFAULT_COUNTRY: CountryCode = 'FR'

// Listed first when nothing is typed, and preferred when several countries share a code (+1, +44).
const COMMON: CountryCode[] = ['FR', 'GH', 'BE', 'GB', 'DE', 'NL', 'US', 'CA']

const rank = (option: CountryOption) => {
  const index = COMMON.indexOf(option.code)
  return index === -1 ? COMMON.length : index
}

const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function findCountry(code: CountryCode) {
  return COUNTRIES.find((option) => option.code === code) ?? COUNTRIES[0]
}

// "+3" or "3" lists +30, +31, +32 …; letters match country names ("gh" → Ghana).
export function searchCountries(query: string): CountryOption[] {
  const term = query.trim()
  if (!term) {
    return [...COMMON.map(findCountry), ...COUNTRIES.filter((option) => !COMMON.includes(option.code))]
  }
  const digits = term.replace(/^\+/, '')
  if (/^\d+$/.test(digits)) {
    return COUNTRIES.filter((option) => option.dial.startsWith(digits)).sort(
      (a, b) =>
        a.dial.length - b.dial.length ||
        Number(a.dial) - Number(b.dial) ||
        rank(a) - rank(b) ||
        a.name.localeCompare(b.name),
    )
  }
  const needle = normalize(term)
  const starts = COUNTRIES.filter((option) => normalize(option.name).startsWith(needle))
  const contains = COUNTRIES.filter(
    (option) => !normalize(option.name).startsWith(needle) && normalize(option.name).includes(needle),
  )
  return [...starts, ...contains]
}

// Splits a saved number ("+33 6 12 34 56 78") back into the country picker and the number box.
export function splitPhone(value: string): { country: CountryCode; digits: string } {
  const parsed = value ? parsePhoneNumberFromString(value) : undefined
  if (parsed) {
    const country = parsed.country ?? COUNTRIES.find((option) => option.dial === parsed.countryCallingCode)?.code
    if (country) return { country, digits: parsed.nationalNumber }
  }
  return { country: DEFAULT_COUNTRY, digits: value.replace(/\D/g, '') }
}

// Saved in international format so the mobile app can show and dial it as-is.
export function joinPhone(country: CountryCode, digits: string) {
  if (!digits) return ''
  const parsed = parsePhoneNumberFromString(digits, country)
  return parsed ? parsed.formatInternational() : `+${getCountryCallingCode(country)} ${digits}`
}
