import { locale, type Lang } from '../i18n/lang'

export function formatMonth(value: string, lang: Lang): string {
  const [year, month] = value.split('-').map(Number)
  if (!month) return String(year)
  return new Intl.DateTimeFormat(locale(lang), { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace(' г.', '')
}

export function formatDate(value: string, lang: Lang): string {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Intl.DateTimeFormat(locale(lang), { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, day)))
    .replace(' г.', '')
}

export function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

export function shortHash(input: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}
