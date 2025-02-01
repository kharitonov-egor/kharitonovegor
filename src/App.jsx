import './App.css'

import me from './assets/me.jpg'
import tg from './assets/tg.png'
import github from './assets/github.png'
import linkedin from './assets/linkedin.png'
import email from './assets/email.png'
import insta from './assets/insta.png'

import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
    { path: '/', element: <Home /> },
])



function App() {

    var backgroundColorVariable = "bg-amber00"


  return (
      <div className="grid justify-items-center">
          <div>
              <img className="w-[200px] h-auto rounded-[20px] shadow-md " src={me} alt="photo of me"/>
          </div>

          <div>
              <h1 className="font-bold">Egor Kharitonov</h1>
              <h2>Computer science student and math tutor</h2>
          </div>

          {/*
          <div className="max-w-[1250px] max-h-[750px]">

              <div className="grid grid-cols-3 gap-[15px] items-stretch grid-cols-[500px_500px] grid-rows-[150px_150px]">

                  <div className="bg-[#006747] Cards">
                      <h2 className="font-bold">University</h2>
                      <p>University of South Florida, Computer Science, graduating 2027</p>
                  </div>

                  <div className="Cards bg-blue-900">
                      <h2 className="font-bold">Personal projects</h2>
                      <p>Some stuff</p>
                  </div>

                  <div>
                      <p>sd</p>
                  </div>
                  <div>
                      <p>sd</p>
                  </div>

              </div>

          </div>
          */}

          <div className={`grid grid-cols-5 gap-0 mt-[20px] social-icons-container ${backgroundColorVariable}`}>

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

              <a href="https://www.instagram.com/kharitonoffegor" target="_blank">
                  <img src={insta} alt="instagram logo"/>
              </a>

          </div>


      </div>
  )
}

export default App
