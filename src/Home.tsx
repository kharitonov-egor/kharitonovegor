import { useState } from 'react'
// import { experience } from './data/Experience'
// import { leadership } from './data/Leadership'
import me from './assets/me.png'

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
  return (
    <div className="flex min-h-full w-full flex-col items-center mt-16">
      <div className="grid justify-items-center gap-5 text-center">

        <img
          src={me}
          alt="Egor Kharitonov"
          className="w-[150px] rounded-3xl border-2 border-white/80 shadow-md mb-2"
        />

        <div className="grid gap-2">
          <h1 className="text-3xl font-bold text-white">
            Egor Kharitonov
          </h1>
          <h2 className="text-base text-gray-500">
            Software Engineer
          </h2>
        </div>
      </div>

      <div>
        <div className="flex flex-row gap-8 mt-8 text-lg social-icons-container">
          <a href="https://github.com/kharitonov-egor" target="_blank" id="GithubClick" className='hover:underline'>
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/kharitonov-egor/"
            target="_blank"
            id="LinkedinClick"
            className='hover:underline'
          >
            LinkedIn
          </a>
          <a href="mailto:egakhar@gmail.com" target="_blank" id="EmailClick" className='hover:underline'>
            Email
          </a>
          <a href="https://t.me/kharitonov_egor" target="_blank" id="TelegramClick" className='hover:underline'>
            Telegram
          </a>
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
