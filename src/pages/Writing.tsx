import PageHeader from '../components/PageHeader'
import WritingList from '../components/WritingList'
import { useLocalize } from '../i18n/lang'
import { posts } from '../lib/posts'
import { useTitle } from '../lib/useTitle'

export default function Writing() {
  const l = useLocalize()
  useTitle(l({ en: 'Writing', ru: 'Тексты' }))

  return (
    <>
      <PageHeader command="ls writing/" title={l({ en: 'Writing', ru: 'Тексты' })}>
        {l({
          en: 'Notes on things I built and ran. Posts are in English.',
          ru: 'Заметки о том, что я делал и организовывал. Тексты на английском.',
        })}
      </PageHeader>
      <div className="mt-10">
        {posts.length > 0 ? (
          <WritingList posts={posts} />
        ) : (
          <p className="text-sm text-muted">{l({ en: 'Nothing published yet.', ru: 'Пока ничего не опубликовано.' })}</p>
        )}
      </div>
    </>
  )
}
