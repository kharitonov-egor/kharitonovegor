import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { locale, useLang, useLocalize } from '../i18n/lang'
import { useT } from '../i18n/ui'

function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
  return now
}

export default function StatusLine({ className = '' }: { className?: string }) {
  const { lang } = useLang()
  const l = useLocalize()
  const t = useT()
  const now = useNow(15_000)

  const time = new Intl.DateTimeFormat(locale(lang), {
    timeZone: profile.timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(now)
  const hour = Number(
    new Intl.DateTimeFormat('en-US', { timeZone: profile.timeZone, hour: 'numeric', hourCycle: 'h23' }).format(now),
  )
  const asleep = hour < 7

  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted ${className}`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span>{l(profile.location)}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={now.toISOString()}>{time}</time>
      {asleep && (
        <>
          <span aria-hidden="true">·</span>
          <span>{t('probablyAsleep')}</span>
        </>
      )}
      {profile.availability && (
        <>
          <span aria-hidden="true">·</span>
          <span className="text-fg">{l(profile.availability)}</span>
        </>
      )}
    </p>
  )
}
