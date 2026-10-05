import { usePostHog } from 'posthog-js/react'
import { useCallback } from 'react'
import { profile } from '../data/profile'
import { useT } from '../i18n/ui'
import { useToast } from './toast'

export function useCopyEmail() {
  const toast = useToast()
  const t = useT()
  const posthog = usePostHog()

  return useCallback(async () => {
    posthog?.capture('email_copy')
    try {
      await navigator.clipboard.writeText(profile.email)
      toast(`${t('copied')} ${profile.email}`)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }, [posthog, t, toast])
}
