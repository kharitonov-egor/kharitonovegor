import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'now', lazy: () => import('./pages/Now').then((m) => ({ Component: m.default })) },
      { path: 'uses', lazy: () => import('./pages/Uses').then((m) => ({ Component: m.default })) },
      { path: 'writing', lazy: () => import('./pages/Writing').then((m) => ({ Component: m.default })) },
      { path: 'writing/:slug', lazy: () => import('./pages/Post').then((m) => ({ Component: m.default })) },
      { path: 'guestbook', lazy: () => import('./pages/Guestbook').then((m) => ({ Component: m.default })) },
      { path: 'resume', lazy: () => import('./pages/Resume').then((m) => ({ Component: m.default })) },
      { path: 'tutoring', lazy: () => import('./pages/Tutoring').then((m) => ({ Component: m.default })) },
      {
        path: 'projects/order-pipeline',
        lazy: () => import('./pages/CaseStudy').then((m) => ({ Component: m.default })),
      },
      { path: '*', lazy: () => import('./pages/NotFound').then((m) => ({ Component: m.default })) },
    ],
  },
])
