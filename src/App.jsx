import './App.css'


import tg from './assets/tg.png'
import github from './assets/github.png'
import linkedin from './assets/linkedin.png'
import email from './assets/email.png'
import insta from './assets/insta.png'


import Home from './Home.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Tutoring from "./Tutoring.jsx";


const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/tutoring', element: <Tutoring /> }
]);



function App() {
  return (
      <div>

          <div className="bg-black sm:w-[600px] h-[60px] flex items-center gap-5 px-5 rounded-2xl bg-zinc-800 shadow-lg text-inherit align-top mb-5">

              <a href="/" className="transition-colors hover:text-zinc-300"><span>Home</span></a>

              <a href="/tutoring" className="transition-colors hover:text-zinc-300"><span>Tutoring</span></a>

          </div>




          <RouterProvider router={router}></RouterProvider>


          {/*
          <div className="grid grid-cols-4 gap-0 mt-[20px] social-icons-container">
              <a href="https://github.com/kharitonov-egor" target="_blank">
                  <img src={github} alt="github logo"/>
              </a>
              <a href="https://www.linkedin.com/in/kharitonov-egor/" target="_blank">
                  <img src={linkedin} alt="linkedin logo"/>
              </a>
              <a href="mailto:ekharitonov@hawkmail.hccfl.edu" target="_blank">
                  <img src={email} alt="email logo"/>
              </a>
              <a href="https://t.me/kharitonov_egor" target="_blank">
                  <img src={tg} alt="telegram logo"/>
              </a>
          </div>
          */}

      </div>
  )
}

export default App
