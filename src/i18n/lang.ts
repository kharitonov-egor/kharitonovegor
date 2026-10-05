import { createContext, useCallback, useContext } from 'react'

export type Lang = 'en' | 'ru'

export type Localized<T = string> = Record<Lang, T>

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

export const LangContext = createContext<LangContextValue | null>(null)

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}

export function useLocalize() {
  const { lang } = useLang()
  return useCallback(<T>(value: Localized<T>): T => value[lang], [lang])
}

export function locale(lang: Lang): string {
  return lang === 'ru' ? 'ru-RU' : 'en-US'
}
