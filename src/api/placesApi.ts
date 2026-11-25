// City suggestions for location fields, from Photon (komoot): a free OpenStreetMap
// geocoder that needs no API key. Only the typed text is sent.
const PHOTON_URL = 'https://photon.komoot.io/api/'

// Rank places near Lille (Ghafra Nord) first.
const NEAR_LILLE = { lat: '50.63', lon: '3.06' }

export type PlaceSuggestion = {
  label: string
  name: string
  detail: string
}

type PhotonFeature = {
  properties: { name?: string; county?: string; state?: string; country?: string }
}

const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export async function searchPlaces(query: string, signal?: AbortSignal): Promise<PlaceSuggestion[]> {
  const params = new URLSearchParams({ q: query, limit: '10', lang: 'en', layer: 'city', ...NEAR_LILLE })
  const res = await fetch(`${PHOTON_URL}?${params}`, { signal })
  if (!res.ok) throw new Error(`Place search failed with status ${res.status}`)
  const data = (await res.json()) as { features?: PhotonFeature[] }

  const seen = new Set<string>()
  const results: PlaceSuggestion[] = []
  for (const { properties: place } of data.features ?? []) {
    if (!place.name || !place.country) continue
    // Region + country tell apart places that share a name, e.g. Lens in France and in Belgium.
    const region = [place.county, place.state].find((part) => part && part !== place.name)
    const detail = [region, place.country].filter(Boolean).join(', ')
    const label = `${place.name}, ${detail}`
    if (seen.has(label)) continue
    seen.add(label)
    results.push({ label, name: place.name, detail })
  }
  // Names that start with what was typed come first ("r" → Roubaix, Ronchin…).
  const prefix = normalize(query.trim())
  const starts = results.filter((place) => normalize(place.name).startsWith(prefix))
  const others = results.filter((place) => !normalize(place.name).startsWith(prefix))
  return [...starts, ...others].slice(0, 6)
}
