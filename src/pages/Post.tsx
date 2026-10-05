import { marked } from 'marked'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLang, useLocalize } from '../i18n/lang'
import { useT } from '../i18n/ui'
import { formatDate } from '../lib/format'
import { findPost } from '../lib/posts'
import { useTitle } from '../lib/useTitle'
import NotFound from './NotFound'

export default function Post() {
  const { slug } = useParams()
  const { lang } = useLang()
  const l = useLocalize()
  const t = useT()
  const post = findPost(slug)
  const html = useMemo(() => (post ? marked.parse(post.body, { async: false }) : ''), [post])
  useTitle(post?.title)

  if (!post) return <NotFound />

  return (
    <article>
      <header className="pt-6 sm:pt-10">
        <Link to="/writing" viewTransition className="font-mono text-xs text-muted transition-colors hover:text-fg print:hidden">
          ← {l({ en: 'all writing', ru: 'все тексты' })}
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-fg">{post.title}</h1>
        <p className="mt-3 font-mono text-xs text-muted">
          {formatDate(post.date, lang)}
          {post.draft && <span className="ml-2 text-accent">[{t('draft')}]</span>}
        </p>
      </header>
      <div className="post mt-10 text-[15px] text-fg/90" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
