# My personal website

Source code for [kharitonovegor.com](https://www.kharitonovegor.com/).

Built with Vite, React, TypeScript, Tailwind CSS and React Router. Hosted on Vercel.

## Editing content

Everything shown on the site lives in `src/data/`:

- `profile.ts`: name, bio, links, and `availability` (set it to show an "open to..." line next to the clock)
- `Experience.ts`, `Leadership.ts`: roles for the git log, the résumé and the terminal
- `projects.ts`, `now.ts`, `uses.ts`, `techx.ts`, `Stack.ts`

Posts are Markdown files in `src/content/posts/`. Posts with `draft: true` only show up in `npm run dev`.

## Environment

Copy `.env.example` to `.env`. PostHog keys are required. The Supabase keys are optional: without them the guestbook and live cursors stay hidden.

## Guestbook and live cursors

1. Create a Supabase project and run `supabase/migrations/20260923000000_guestbook.sql` in the SQL editor.
2. In Authentication > Providers, enable GitHub and add `https://www.kharitonovegor.com/**` and `http://localhost:5173/**` to the redirect URLs.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` locally and in Vercel.

Live cursors use Supabase Realtime broadcast and presence, so they need no extra tables.
