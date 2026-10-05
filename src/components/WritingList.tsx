import { Link } from 'react-router-dom'
import { useLang } from '../i18n/lang'
import { useT } from '../i18n/ui'
import { formatDate } from '../lib/format'
import type { Post } from '../lib/posts'

export default function WritingList({ posts }: { posts: Post[] }) {
  const { lang } = useLang()
  const t = useT()

  return (
    <ul className="divide-y divide-line border-y border-line">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            to={`/writing/${post.slug}`}
            viewTransition
            className="group flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <span className="shrink-0 font-mono text-xs text-muted sm:w-28">{formatDate(post.date, lang)}</span>
            <span className="text-fg transition-colors group-hover:text-accent">
              {post.title}
              {post.draft && <span className="ml-2 font-mono text-xs text-accent">[{t('draft')}]</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
