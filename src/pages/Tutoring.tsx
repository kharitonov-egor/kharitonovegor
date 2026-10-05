import PageHeader from '../components/PageHeader'
import { profile } from '../data/profile'
import { useLocalize, type Localized } from '../i18n/lang'
import { useCopyEmail } from '../lib/useCopyEmail'
import { useTitle } from '../lib/useTitle'

type Review = { name: string; text: Localized }

const reviews: Review[] = [
  {
    name: 'William',
    text: {
      en: 'We met Egor "randomly" (so we thought). We had our high schoolers in overpriced commercialized tutoring facilities that was not helping them much. Egor is incredibly smart and understanding. He will take his time and meet the student at their levels. He is patient and very kind. If you need a math Tutor he is your guy. I thank God for allowing us to meet Egor "randomly". Thanks Egor!',
      ru: 'Мы познакомились с Егором «случайно» (как нам казалось). Наши старшеклассники ходили в дорогие коммерческие центры, которые им почти не помогали. Егор очень умный и понимающий. Он не торопится и начинает с того уровня, на котором находится ученик. Он терпеливый и очень добрый. Если вам нужен репетитор по математике, это он. Я благодарю Бога за то, что мы встретили Егора «случайно». Спасибо, Егор!',
    },
  },
  {
    name: 'Jane',
    text: {
      en: 'My 9th-grade daughter was struggling with Algebra, but thanks to Egor, everything changed. He has a special way of connecting with teenagers, making even the most complicated topics understandable. His calm demeanor and sense of humor made learning enjoyable for her. Egor is an amazing tutor, and I can\'t stop to recommend him enough to friends and anyone in need.',
      ru: 'Моей дочери в 9 классе тяжело давалась алгебра, но с Егором всё изменилось. Он умеет находить общий язык с подростками, и даже самые сложные темы становятся понятными. Его спокойствие и чувство юмора сделали учёбу для неё приятной. Егор замечательный репетитор, и я не устаю рекомендовать его друзьям и всем, кому нужна помощь.',
    },
  },
  {
    name: 'Artem',
    text: {
      en: 'I finally understood math with this tutor. Math has always been difficult for me, especially on the SAT, but he helped me improve my score and achieve a high result. We had tutoring sessions twice a week, and he created a personalized program to cover the gaps in what I missed during school lessons. He also provided a lot of practice assignments that were really helpful and hard to find anywhere else. I highly recommend him because, thanks to his help, I no longer feel afraid of math and was able to achieve a high score.',
      ru: 'С этим репетитором я наконец понял математику. Она всегда давалась мне тяжело, особенно на SAT, но он помог мне поднять балл и получить высокий результат. Мы занимались два раза в неделю, и он составил персональную программу, чтобы закрыть пробелы из школы. Ещё он давал много практических заданий, которые очень помогли и которые сложно найти где-то ещё. Очень рекомендую: благодаря ему я больше не боюсь математики и получил высокий балл.',
    },
  },
]

export default function Tutoring() {
  const l = useLocalize()
  const copyEmail = useCopyEmail()
  useTitle(l({ en: 'Tutoring', ru: 'Репетиторство' }))

  return (
    <>
      <PageHeader command="cat tutoring.md" title={l({ en: 'Math tutoring', ru: 'Репетитор по математике' })}>
        {l({
          en: 'SAT, ACT and high school math. I teach the logic behind the math instead of memorized steps.',
          ru: 'SAT, ACT и школьная математика. Я объясняю логику, а не заставляю заучивать шаги.',
        })}
      </PageHeader>

      <div className="mt-10 grid grid-cols-[auto_1fr] items-center gap-6">
        <div className="rounded-2xl border border-accent/40 bg-accent/[0.06] px-6 py-5 text-center">
          <p className="text-4xl font-bold tracking-tight text-accent">770</p>
          <p className="mt-1 font-mono text-xs text-muted">SAT Math</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
          <a href={profile.calUrl} target="_blank" rel="noopener noreferrer" className="link text-accent">
            {l({ en: 'Book a call', ru: 'Созвониться' })}
          </a>
          <button type="button" onClick={() => void copyEmail()} className="link text-fg">
            {l({ en: 'Copy email', ru: 'Скопировать почту' })}
          </button>
        </div>
      </div>

      <h2 className="mb-4 mt-14 text-sm font-semibold text-fg">{l({ en: 'Reviews', ru: 'Отзывы' })}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {reviews.map((review) => (
          <figure key={review.name} className="rounded-2xl border border-line bg-card/60 p-4">
            <blockquote className="text-sm leading-relaxed text-fg/85">{l(review.text)}</blockquote>
            <figcaption className="mt-3 font-mono text-xs text-muted">
              {review.name}
              {l({ en: '', ru: ' · перевод с английского' })}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  )
}
