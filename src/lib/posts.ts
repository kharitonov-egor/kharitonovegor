export type Post = {
  slug: string
  title: string
  date: string
  description: string
  draft: boolean
  body: string
}

const files = import.meta.glob<string>('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parse(path: string, raw: string): Post {
  const text = raw.replace(/\r\n/g, '\n')
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text)
  const meta = new Map<string, string>()
  for (const line of (match?.[1] ?? '').split('\n')) {
    const i = line.indexOf(':')
    if (i > 0) meta.set(line.slice(0, i).trim(), line.slice(i + 1).trim())
  }
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? path
  return {
    slug,
    title: meta.get('title') ?? slug,
    date: meta.get('date') ?? '',
    description: meta.get('description') ?? '',
    draft: meta.get('draft') === 'true',
    body: match ? text.slice(match[0].length) : text,
  }
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export function findPost(slug: string | undefined): Post | undefined {
  return posts.find((post) => post.slug === slug)
}
