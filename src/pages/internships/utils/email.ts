// name@domain.tld: the domain has dot-separated labels and a letters-only ending of at least 2 characters.
export const emailPattern =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/

const COMMON_DOMAINS = [
  'gmail.com', 'yahoo.com', 'yahoo.fr', 'hotmail.com', 'hotmail.fr', 'outlook.com', 'outlook.fr',
  'live.com', 'live.fr', 'icloud.com', 'orange.fr', 'free.fr', 'sfr.fr', 'laposte.net', 'wanadoo.fr',
]

const COMMON_ENDINGS = ['com', 'fr', 'org', 'net', 'edu', 'gov', 'be', 'de', 'nl', 'uk', 'gh', 'io', 'eu', 'info']

// Edit distance where swapping two neighbouring letters counts as one typo ("gmial" → "gmail").
function typoDistance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
    }
  }
  return d[a.length][b.length]
}

// Suggests a fix for a likely typo in a common domain or ending ("ama@gmial.com", "ama@acme.vom").
export function suggestEmailFix(email: string): string | null {
  const at = email.lastIndexOf('@')
  if (at < 1) return null
  const local = email.slice(0, at)
  const domain = email.slice(at + 1).toLowerCase()
  if (!domain || COMMON_DOMAINS.includes(domain)) return null

  const closeDomain = COMMON_DOMAINS.find((candidate) => typoDistance(domain, candidate) === 1)
  if (closeDomain) return `${local}@${closeDomain}`

  const dot = domain.lastIndexOf('.')
  const ending = domain.slice(dot + 1)
  if (dot < 1 || COMMON_ENDINGS.includes(ending)) return null
  const closeEnding = COMMON_ENDINGS.find(
    (candidate) => candidate.length === ending.length && typoDistance(ending, candidate) === 1,
  )
  return closeEnding ? `${local}@${domain.slice(0, dot + 1)}${closeEnding}` : null
}
