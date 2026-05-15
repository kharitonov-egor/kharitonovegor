import { experience } from './data/Experience'
import { leadership } from './data/Leadership'

export default function Home() {
  return (
    <div className="flex min-h-full max-w-[1000px] flex-col justify-center mt-8">
      <div className="grid gap-3">

        <div className="grid">
          <h1 className="text-2xl font-semibold text-white mb-2">
            Egor Kharitonov
          </h1>
          <h2 className="text-sm text-gray-500">
            Software Engineer @ Stablein Solutions | Vice President @ IEEE CS USF | CS & Math @ University of South Florida
          </h2>
        </div>
      </div>

      <div>
        <div className="flex flex-row gap-7 mt-[20px] social-icons-container">
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

      <hr className="h-px my-5 bg-gray-800 border-0" />

      <div className='flex flex-col gap-0'>

        <h2 className='text-sm text-gray-500 font-mono font-semibold mb-8 tracking-widest'>Experience</h2>   

        {experience.map((item) => (
          <div className="mb-5">
            <div className='flex flex-row justify-between items-center w-full mb-0'>
              <h1 className='text-lg font-semibold'>{item.title}</h1>
              <h2 className='text-right text-sm font-medium'>{item.date}</h2>
            </div>

            <h2 className='text-sm text-gray-500 mb-5' dangerouslySetInnerHTML={{ __html: item.organization }} />

            {item.descriptions.map((description) => (
              <p className='text-sm text-gray-500 mb-2' dangerouslySetInnerHTML={{ __html: description }} />
            ))}
          </div>
        ))}

      </div>

      <hr className="h-px my-5 bg-gray-800 border-0" />

      <div className="flex flex-col gap-0">

        <h2 className="text-sm text-gray-500 font-mono font-semibold mb-8 tracking-widest">Leadership</h2>

        <div className='flex flex-col gap-5'>

        
        {leadership.map((item) => (
          <div className="mb-5">
            <div className="flex flex-row justify-between items-center w-full mb-0">
              <h1 className="text-lg font-semibold">{item.title}</h1>
              <h2 className="text-right text-sm font-medium">{item.date}</h2>
            </div>

            <h2 className="text-sm text-gray-500 mb-5">{item.organization}</h2>
            
            {item.descriptions.map((description) => (
              <p className="text-sm text-gray-500 mb-2" dangerouslySetInnerHTML={{ __html: description }} />
            ))}
          </div>
        ))}

        </div>


      </div>
 

      
 
    </div>
  )
}
