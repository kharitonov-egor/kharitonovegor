import type { Session, SupabaseClient } from '@supabase/supabase-js'
import { usePostHog } from 'posthog-js/react'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import PageHeader from '../components/PageHeader'
import { useLang, useLocalize } from '../i18n/lang'
import { formatDate } from '../lib/format'
import { getSupabase, supabaseConfigured } from '../lib/supabase'
import { useTitle } from '../lib/useTitle'

type Entry = {
  id: number
  user_id: string
  name: string
  avatar_url: string | null
  message: string
  created_at: string
}

const MAX_LENGTH = 280

function isEntry(value: unknown): value is Entry {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'number' &&
    typeof v.user_id === 'string' &&
    typeof v.name === 'string' &&
    (typeof v.avatar_url === 'string' || v.avatar_url === null) &&
    typeof v.message === 'string' &&
    typeof v.created_at === 'string'
  )
}

export default function Guestbook() {
  const { lang } = useLang()
  const l = useLocalize()
  const posthog = usePostHog()
  const [client, setClient] = useState<SupabaseClient | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useTitle(l({ en: 'Guestbook', ru: 'Гостевая книга' }))

  const refresh = useCallback(async (supabase: SupabaseClient) => {
    const { data, error: queryError } = await supabase
      .from('guestbook')
      .select('id, user_id, name, avatar_url, message, created_at')
      .order('created_at', { ascending: false })
      .limit(100)
    if (queryError) {
      setError(queryError.message)
      return
    }
    const rows: unknown[] = data ?? []
    setEntries(rows.filter(isEntry))
  }, [])

  useEffect(() => {
    if (!supabaseConfigured) return
    let unsubscribe: (() => void) | undefined
    let cancelled = false
    getSupabase()
      .then(async (supabase) => {
        const { data } = await supabase.auth.getSession()
        if (cancelled) return
        setClient(supabase)
        setSession(data.session)
        const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
        unsubscribe = () => listener.subscription.unsubscribe()
        await refresh(supabase)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
    return () => {
      cancelled = true
      unsubscribe?.()
    }
  }, [refresh])

  const signIn = async () => {
    if (!client) return
    posthog?.capture('guestbook_sign_in')
    await client.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.href } })
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = message.trim()
    if (!client || !text) return
    setBusy(true)
    setError(null)
    const { error: insertError } = await client.from('guestbook').insert({ message: text })
    setBusy(false)
    if (insertError) {
      setError(insertError.message)
      return
    }
    posthog?.capture('guestbook_sign')
    setMessage('')
    await refresh(client)
  }

  const remove = async (id: number) => {
    if (!client) return
    const { error: deleteError } = await client.from('guestbook').delete().eq('id', id)
    if (deleteError) setError(deleteError.message)
    else await refresh(client)
  }

  return (
    <>
      <PageHeader command="tail -f guestbook.log" title={l({ en: 'Guestbook', ru: 'Гостевая книга' })}>
        {l({
          en: 'Leave a note, a hello, or a bad joke. Sign in with GitHub to post.',
          ru: 'Оставьте пару слов, привет или плохую шутку. Для записи войдите через GitHub.',
        })}
      </PageHeader>

      {!supabaseConfigured ? (
        <p className="mt-10 text-sm text-muted">
          {l({ en: 'The guestbook is offline right now.', ru: 'Гостевая книга сейчас не работает.' })}
        </p>
      ) : (
        <>
          <div className="mt-10 rounded-2xl border border-line bg-card/60 p-4">
            {session ? (
              <form onSubmit={submit}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
                  rows={3}
                  placeholder={l({ en: 'Your message', ru: 'Ваше сообщение' })}
                  className="w-full resize-none bg-transparent text-[15px] text-fg placeholder:text-muted focus:outline-none"
                />
                <div className="mt-3 flex items-center justify-between gap-3 font-mono text-xs text-muted">
                  <span>
                    {message.length}/{MAX_LENGTH}
                  </span>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => client?.auth.signOut()} className="hover:text-fg">
                      {l({ en: 'sign out', ru: 'выйти' })}
                    </button>
                    <button
                      type="submit"
                      disabled={busy || !message.trim()}
                      className="rounded-md bg-accent px-3 py-1.5 font-semibold text-[#111] transition-opacity disabled:opacity-40"
                    >
                      {l({ en: 'Sign', ru: 'Оставить запись' })}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={signIn}
                className="w-full rounded-lg border border-line py-2.5 font-mono text-sm text-fg transition-colors hover:border-accent/60 hover:text-accent"
              >
                {l({ en: 'Sign in with GitHub', ru: 'Войти через GitHub' })}
              </button>
            )}
          </div>

          {error && <p className="mt-3 font-mono text-xs text-red-400">{error}</p>}

          <ul className="mt-8 space-y-5">
            {entries === null && <li className="font-mono text-xs text-muted">…</li>}
            {entries?.length === 0 && (
              <li className="text-sm text-muted">{l({ en: 'No entries yet. Be the first.', ru: 'Пока пусто. Будьте первым.' })}</li>
            )}
            {entries?.map((entry) => (
              <li key={entry.id} className="flex gap-3">
                {entry.avatar_url ? (
                  <img src={entry.avatar_url} alt="" className="h-8 w-8 shrink-0 rounded-full bg-card" loading="lazy" />
                ) : (
                  <span className="h-8 w-8 shrink-0 rounded-full bg-card" />
                )}
                <div className="min-w-0">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
                    <span className="font-medium text-fg">{entry.name}</span>
                    <span className="font-mono text-xs text-muted">{formatDate(entry.created_at.slice(0, 10), lang)}</span>
                    {session?.user.id === entry.user_id && (
                      <button type="button" onClick={() => remove(entry.id)} className="font-mono text-xs text-muted hover:text-red-400">
                        {l({ en: 'delete', ru: 'удалить' })}
                      </button>
                    )}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-[15px] text-fg/90">{entry.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
