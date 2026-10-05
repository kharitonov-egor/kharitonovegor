import PageHeader from '../components/PageHeader'
import PipelineDemo from '../components/PipelineDemo'
import { useLocalize, type Localized } from '../i18n/lang'
import { useTitle } from '../lib/useTitle'

const stats: { value: Localized; label: Localized }[] = [
  { value: { en: '2,000+', ru: '2 000+' }, label: { en: 'purchase orders a day', ru: 'заказов в день' } },
  { value: { en: 'hrs → min', ru: 'ч → мин' }, label: { en: 'processing time', ru: 'время обработки' } },
  { value: { en: '+40%', ru: '+40%' }, label: { en: 'supported input types', ru: 'поддерживаемых форматов' } },
  { value: { en: '4', ru: '4' }, label: { en: 'services in the daily report', ru: 'сервиса в ежедневном отчёте' } },
]

const parts: { title: Localized; body: Localized }[] = [
  {
    title: { en: 'Extraction', ru: 'Извлечение' },
    body: {
      en: 'An AI pipeline reads each purchase order and pulls the order data out of it. The first version handled PDFs only.',
      ru: 'AI-пайплайн читает каждый заказ и достаёт из него данные. Первая версия работала только с PDF.',
    },
  },
  {
    title: { en: 'More formats', ru: 'Больше форматов' },
    body: {
      en: 'I extended it to XML files and to orders sent by email, which increased the number of supported input types by 40%. Every format produces the same output.',
      ru: 'Я добавил XML-файлы и заказы из писем, и число поддерживаемых форматов выросло на 40%. Любой формат даёт один и тот же результат.',
    },
  },
  {
    title: { en: 'Review dashboard', ru: 'Дашборд проверки' },
    body: {
      en: 'An internal Next.js dashboard built with React, Supabase and Tailwind CSS. The operations team uses it to review what the model extracted, fix mistakes and track each order.',
      ru: 'Внутренний дашборд на Next.js, React, Supabase и Tailwind CSS. В нём операционная команда проверяет, что извлекла модель, исправляет ошибки и отслеживает каждый заказ.',
    },
  },
  {
    title: { en: 'Daily reporting', ru: 'Ежедневные отчёты' },
    body: {
      en: 'An automated daily report with processing metrics across 4 services, so leadership could track order throughput and operational performance.',
      ru: 'Автоматический ежедневный отчёт с метриками обработки по 4 сервисам, по которому руководство следило за потоком заказов и работой операционной команды.',
    },
  },
]

function Box({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <span
      className={`rounded-lg border px-3 py-1.5 text-center ${accent ? 'border-accent/50 bg-accent/10 text-accent' : 'border-line bg-card text-fg'}`}
    >
      {children}
    </span>
  )
}

function Diagram() {
  const l = useLocalize()
  const arrow = <span className="text-center text-accent">↓</span>

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-card/40 p-6 font-mono text-xs">
      <div className="flex flex-wrap justify-center gap-2">
        <Box>PDF</Box>
        <Box>XML</Box>
        <Box>Email</Box>
      </div>
      {arrow}
      <Box accent>{l({ en: 'AI extraction', ru: 'AI-извлечение' })}</Box>
      {arrow}
      <Box>{l({ en: 'Review dashboard (Next.js + Supabase)', ru: 'Дашборд проверки (Next.js + Supabase)' })}</Box>
      {arrow}
      <Box>{l({ en: 'Order data', ru: 'Данные заказа' })}</Box>
      <p className="mt-3 text-center text-muted">
        {l({
          en: '+ a daily metrics report across 4 services',
          ru: '+ ежедневный отчёт с метриками по 4 сервисам',
        })}
      </p>
    </div>
  )
}

export default function CaseStudy() {
  const l = useLocalize()
  useTitle(l({ en: 'Order ingestion pipeline', ru: 'Пайплайн приёма заказов' }))

  return (
    <>
      <PageHeader
        command="cat projects/order-pipeline.md"
        title={l({ en: 'Order ingestion pipeline', ru: 'Пайплайн приёма заказов' })}
      >
        {l({
          en: 'Stablein Solutions, 2025–2026. Stablein builds AI automation for promotional products suppliers and distributors. Their customers receive purchase orders as PDFs, XML files and emails, and each one used to be processed by hand.',
          ru: 'Stablein Solutions, 2025–2026. Stablein делает AI-автоматизацию для поставщиков и дистрибьюторов промопродукции. Их клиенты получают заказы в PDF, XML и письмами, и раньше каждый обрабатывали вручную.',
        })}
      </PageHeader>

      <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.value.en} className="flex flex-col rounded-2xl border border-line bg-card/60 p-4">
            <dt className="order-2 mt-1 font-mono text-[11px] leading-snug text-muted">{l(stat.label)}</dt>
            <dd className="order-1 text-xl font-bold tracking-tight text-fg">{l(stat.value)}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-14">
        <h2 className="mb-4 text-sm font-semibold text-fg">{l({ en: 'How it fits together', ru: 'Как это устроено' })}</h2>
        <Diagram />
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-sm font-semibold text-fg">{l({ en: 'What I built', ru: 'Что я сделал' })}</h2>
        <ol className="space-y-6">
          {parts.map((part, i) => (
            <li key={part.title.en} className="grid grid-cols-[2rem_1fr] gap-2">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <div>
                <h3 className="font-medium text-fg">{l(part.title)}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{l(part.body)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 print:hidden">
        <h2 className="mb-4 text-sm font-semibold text-fg">
          {l({ en: 'Demo with made-up orders', ru: 'Демо на выдуманных заказах' })}
        </h2>
        <PipelineDemo />
      </section>
    </>
  )
}
