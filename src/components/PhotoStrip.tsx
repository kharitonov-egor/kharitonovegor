import { techxPhotos, techxReportUrl } from '../data/techx'
import { useLocalize } from '../i18n/lang'

export default function PhotoStrip() {
  const l = useLocalize()

  return (
    <div className="print:hidden">
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {techxPhotos.map((photo) => (
          <figure key={photo.src} className="shrink-0 snap-start overflow-hidden rounded-xl border border-line">
            <img
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={l(photo.alt)}
              loading="lazy"
              className="h-44 w-auto object-cover transition-transform duration-500 hover:scale-[1.03] sm:h-52"
            />
          </figure>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">
        {l({
          en: 'November 8, 2025 at USF. 336 people checked in, 11 speakers, and a career fair. ',
          ru: '8 ноября 2025 года в USF. 336 участников, 11 спикеров и карьерная ярмарка. ',
        })}
        <a href={techxReportUrl} target="_blank" rel="noopener noreferrer" className="link text-fg">
          {l({ en: 'Read the event report', ru: 'Отчёт о конференции' })}
        </a>
      </p>
    </div>
  )
}
