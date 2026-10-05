import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PostHogProvider } from 'posthog-js/react'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import ToastProvider from './components/ToastProvider'
import LangProvider from './i18n/LangProvider'
import { printConsoleGreeting } from './lib/consoleGreeting'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        capture_exceptions: true,
        debug: import.meta.env.MODE === 'development',
      }}
    >
      <LangProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </LangProvider>
    </PostHogProvider>
  </StrictMode>,
)

printConsoleGreeting()
