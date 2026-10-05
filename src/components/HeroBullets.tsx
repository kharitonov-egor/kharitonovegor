import { embarc, ieeeCs, usf } from '../data/brands'
import { useLocalize } from '../i18n/lang'
import BrandLink from './BrandLink'
import EmbarcMark from './EmbarcMark'
import IeeeMark from './IeeeMark'
import UsfMark from './UsfMark'

const BULLET =
  'relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-muted/70'

export default function HeroBullets() {
  const l = useLocalize()

  return (
    <ul className="max-w-[39rem] space-y-2.5 text-[17px] leading-relaxed text-fg/90">
      <li className={BULLET}>
        {l({ en: 'SWE for 1.5 years at ', ru: '1,5 года разработчиком в стартапах ' })}
        <BrandLink brand={embarc} Mark={EmbarcMark}>
          Embarc Collective
        </BrandLink>
        {l({ en: ' startups', ru: '' })}
      </li>
      <li className={BULLET}>
        {l({ en: '3rd-year CS + Math student at the ', ru: '3-й курс, CS и математика в ' })}
        <BrandLink brand={usf} Mark={UsfMark}>
          {l({ en: 'University of South Florida', ru: 'Университете Южной Флориды' })}
        </BrandLink>
      </li>
      <li className={BULLET}>
        {l({ en: 'VP of ', ru: 'Вице-президент ' })}
        <BrandLink brand={ieeeCs} Mark={IeeeMark}>
          IEEE Computer Society
        </BrandLink>
        {l({ en: ", USF's top tech community", ru: ', главного техсообщества USF' })}
      </li>
    </ul>
  )
}
