import { useEffect, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'

const USERNAME = 'kharitonov-egor'

function useMobileCalendar() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(query.matches)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isMobile
}

export default function GithubGraph() {
  const isMobile = useMobileCalendar()

  return (
    <section className="github-showcase" aria-labelledby="github-heading">
      <div className="github-showcase__heading">
        <h2 id="github-heading" className="section-heading">GitHub</h2>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{USERNAME} <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="github-calendar-card">
        <div className="github-calendar-viewport">
          <GitHubCalendar
            username={USERNAME}
            transformData={isMobile ? (data) => data.slice(-182) : undefined}
            colorScheme="dark"
            blockSize={13}
            blockMargin={3}
            blockRadius={2}
            fontSize={13}
            showMonthLabels
            showWeekdayLabels={isMobile ? false : ['mon', 'wed', 'fri']}
            labels={{
              totalCount: isMobile
                ? '{{count}} contributions in the last 26 weeks'
                : '{{count}} contributions in the last year',
              legend: { less: 'Less', more: 'More' },
            }}
            theme={{
              dark: ['#1f1f1f', '#424242', '#686868', '#a0a0a0', '#f1f1f1'],
            }}
            tooltips={{
              activity: {
                text: (activity) =>
                  `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${activity.date}`,
              },
            }}
          />
        </div>
      </div>
    </section>
  )
}
