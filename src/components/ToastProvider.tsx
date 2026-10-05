import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ToastContext } from '../lib/toast'

type Toast = { id: number; message: string }

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null)
  const timer = useRef<number>()

  const show = useCallback((message: string) => {
    window.clearTimeout(timer.current)
    setToast({ id: Date.now(), message })
    timer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 print:hidden"
      >
        {toast && (
          <div
            key={toast.id}
            className="animate-fade-up rounded-full border border-line bg-card px-4 py-2 font-mono text-xs text-fg shadow-2xl"
          >
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}
