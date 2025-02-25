import './App.css'


import tg from './assets/tg.png'
import github from './assets/github.png'
import linkedin from './assets/linkedin.png'
import email from './assets/email.png'
import insta from './assets/insta.png'


import Home from './Home.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Tutoring from "./Tutoring.jsx";
import Timer from "./Timer.jsx";


const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/tutoring', element: <Tutoring /> },
    { path: '/timer', element: <Timer /> }
]);



function App() {
  return (
      <div>

          <div className="bg-black sm:w-[600px] h-[60px] flex items-center gap-5 px-5 rounded-2xl bg-zinc-800 shadow-lg text-inherit align-top mb-5">

              <a href="/" className="transition-colors hover:text-zinc-300"><span>Home</span></a>

              <a href="/tutoring" className="transition-colors hover:text-zinc-300"><span>Tutoring</span></a>

          </div>




          <RouterProvider router={router}></RouterProvider>





      </div>
  )
}

export default App
