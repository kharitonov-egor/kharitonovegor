import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import CommandPalette from './components/CommandPalette'
// import Footer from './components/Footer'
// import Header from './components/Header'
import Terminal from './components/Terminal'
import { supabaseConfigured } from './lib/supabase'
import { useCommands } from './lib/useCommands'

const LiveCursors = lazy(() => import('./components/LiveCursors'))

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

export default function Layout() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  const openTerminal = useCallback(() => {
    setPaletteOpen(false)
    setTerminalOpen(true)
  }, [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const closeTerminal = useCallback(() => setTerminalOpen(false), [])
  const commands = useCommands(openTerminal)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setTerminalOpen(false)
        setPaletteOpen((open) => !open)
        return
      }
      if (e.key === '`' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target)) {
        e.preventDefault()
        setPaletteOpen(false)
        setTerminalOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      {/* <Header onOpenPalette={() => setPaletteOpen(true)} /> */}
      <main className="mx-auto w-full max-w-[55rem] flex-1 px-5 pt-8 print:max-w-none print:px-0 print:pt-0">
        <Outlet />
      </main>
      {/* <Footer onOpenTerminal={openTerminal} /> */}
      <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
      <Terminal open={terminalOpen} onClose={closeTerminal} />
      {supabaseConfigured && (
        <Suspense fallback={null}>
          <LiveCursors />
        </Suspense>
      )}
      <div className="grain" aria-hidden="true" />
      <ScrollRestoration />
    </>
  )
}
