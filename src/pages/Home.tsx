// import { Link } from 'react-router-dom'
// import Glance from '../components/Glance'
// import GitLog from '../components/GitLog'
import Hero from '../components/Hero'
// import PhotoStrip from '../components/PhotoStrip'
// import PipelineDemo from '../components/PipelineDemo'
// import ProjectList from '../components/ProjectList'
// import Section from '../components/Section'
// import WritingList from '../components/WritingList'
// import { useLocalize } from '../i18n/lang'
// import { useT } from '../i18n/ui'
// import { posts } from '../lib/posts'
import { useTitle } from '../lib/useTitle'

export default function Home() {
  // const l = useLocalize()
  // const t = useT()
  useTitle()

  return (
    <>
      <div className="flex min-h-[calc(100dvh-2rem)] flex-col justify-center pb-16">
        <Hero />

        {/* <Section title={t('sectionGlance')} command="stat ." className="print:hidden">
          <Glance />
        </Section>

        <Section title={t('sectionBuild')} command="./ingest --watch" className="print:hidden">
          <PipelineDemo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {l({
              en: 'A simplified version of the pipeline I built at Stablein Solutions, with made-up orders. It read purchase orders from PDFs, XML files and emails, and every format came out as the same JSON. In production it handled 2,000+ orders a day. ',
              ru: 'Упрощённая версия пайплайна, который я сделал в Stablein Solutions, на выдуманных заказах. Он читал заказы из PDF, XML и писем, и на выходе любой формат давал один и тот же JSON. В проде он обрабатывал больше 2 000 заказов в день. ',
            })}
            <Link to="/projects/order-pipeline" viewTransition className="link text-fg">
              {l({ en: 'How it works', ru: 'Как это устроено' })}
            </Link>
          </p>
        </Section>

        <Section title={t('sectionExperience')} command="git log --graph">
          <GitLog />
        </Section>

        <Section title={t('sectionProjects')} command="ls projects/">
          <ProjectList />
        </Section>

        <Section title={t('sectionTechx')} command="open techx-2025/" className="print:hidden">
          <PhotoStrip />
        </Section>

        {posts.length > 0 && (
          <Section title={t('sectionWriting')} command="ls writing/" className="print:hidden">
            <WritingList posts={posts} />
          </Section>
        )} */}
      </div>
    </>
  )
}
