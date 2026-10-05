import type { UiKey } from '../i18n/ui'
import { posts } from './posts'
import { supabaseConfigured } from './supabase'

export type NavPage = { to: string; key: UiKey }

export const navPages: NavPage[] = [
  { to: '/now', key: 'navNow' },
  { to: '/uses', key: 'navUses' },
  ...(posts.length > 0 ? [{ to: '/writing', key: 'navWriting' } satisfies NavPage] : []),
  ...(supabaseConfigured ? [{ to: '/guestbook', key: 'navGuestbook' } satisfies NavPage] : []),
]

export const footerPages: NavPage[] = [
  { to: '/resume', key: 'navResume' },
  { to: '/tutoring', key: 'navTutoring' },
]
