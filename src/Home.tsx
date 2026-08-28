import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'
// import { experience } from './data/Experience'
// import { leadership } from './data/Leadership'
import me from './assets/me.png'

type Social = {
  event: string
  domId: string
  label: string
  href: string
}

const socials: Social[] = [
  {
    event: 'github_click',
    domId: 'GithubClick',
    label: 'Github',
    href: 'https://github.com/kharitonov-egor',
  },
  {
    event: 'linkedin_click',
    domId: 'LinkedinClick',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kharitonov-egor/',
  },
  {
    event: 'email_click',
    domId: 'EmailClick',
    label: 'Email',
    href: 'mailto:egakhar@gmail.com',
  },
  {
    event: 'telegram_click',
    domId: 'TelegramClick',
    label: 'Telegram',
    href: 'https://t.me/kharitonov_egor',
  },
  {
    event: 'call_click',
    domId: 'CalClick',
    label: 'Book a call',
    href: 'https://cal.com/egor-kharitonov-j6h556',
  },
]

type Item = {
  title: string
  date: string
  organization: string
  logo: string
  descriptions: string[]
}

function Row({ item }: { item: Item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full flex-row items-center gap-4 text-left cursor-pointer"
      >
        <img
          src={item.logo}
          alt=""
          className="h-12 w-12 flex-shrink-0 rounded-md object-cover bg-white/5"
        />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-row items-center justify-between gap-3">
            <h1 className="text-lg font-semibold group-hover:underline">
              {item.title}
            </h1>
            <div className="flex flex-row items-center gap-3">
              <h2 className="text-right text-sm font-medium">{item.date}</h2>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-200 group-hover:border-gray-500 group-hover:text-gray-200 ${open ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>
          <h2
            className="text-sm text-gray-500"
            dangerouslySetInnerHTML={{ __html: item.organization }}
          />
        </div>
      </button>

      {open && (
        <div className="mt-3 pl-16">
          {item.descriptions.map((description, i) => (
            <p
              key={i}
              className="text-sm text-gray-500 mb-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const posthog = usePostHog()

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative grid justify-items-center gap-2 text-center">

        <img
          src={me}
          alt="Egor Kharitonov"
          className="absolute bottom-full left-1/2 mb-6 w-[150px] -translate-x-1/2 rounded-3xl border-2 border-white/80 shadow-md"
        />

        <h1 className="text-3xl font-bold text-white">
          Egor Kharitonov
        </h1>
        <h2 className="text-base text-gray-500">
          Software Engineer
        </h2>

        <div className="absolute left-1/2 top-full mt-8 flex w-max max-w-[90vw] -translate-x-1/2 flex-row flex-wrap justify-center gap-x-8 gap-y-3 text-lg social-icons-container">
          {socials.map(({ event, domId, label, href }) => (
            <a
              key={event}
              href={href}
              target="_blank"
              id={domId}
              className='hover:underline'
              onClick={() => posthog?.capture(event)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* <hr className="h-px my-5 bg-gray-800 border-0" />

      <div className='flex flex-col gap-0'>
        <h2 className='text-sm text-gray-500 font-mono font-semibold mb-8 tracking-widest'>Experience</h2>
        {experience.map((item, i) => (
          <Row key={i} item={item} />
        ))}
      </div> */}

      {/* <hr className="h-px my-5 bg-gray-800 border-0" />

      <div className="flex flex-col gap-0">
        <h2 className="text-sm text-gray-500 font-mono font-semibold mb-8 tracking-widest">Leadership</h2>
        <div className='flex flex-col gap-5'>
          {leadership.map((item, i) => (
            <Row key={i} item={item} />
          ))}
        </div>
      </div> */}
    </div>
  )
}
