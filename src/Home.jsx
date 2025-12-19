import github from "./assets/github.png";
import linkedin from "./assets/linkedin.png";
import email from "./assets/email.png";
import tg from "./assets/tg.png";
import me from "./assets/me.png";
import { useState } from "react";

import Experience from "./Experience";
import Education from "./Education";

export default function Home () {

    const [section, changesection] = useState("experience");

    return (
        <div className="flex flex-col h-full w-full">

            <div className="flex flex-col md:flex-row justify-items-center gap-3">

                <div>
                    <img className="w-[150px] rounded-2xl shadow-md border-2 border-white" src={me} alt="photo of me"/>
                </div>

                    <div className="flex flex-col gap-1 p-3 justify-center">

                        <h1 className="text-3xl font-semibold text-white sm:text-4xl sm:font-bold mb-2">Egor Kharitonov</h1>
                        <h2 className="text-xl sm:text-xl mb-2">Software Engineer & Computer Science student</h2>

                    </div>
            </div>

            <div className="mt-4 p-5 bg-slate-800 rounded-lg h-[200px]">
                <div className="flex flex-col">

                    <div className="flex flex-row">

                        
                    <div className="w-1/2 flex justify-end mr-16">
                        <button className="border-[1px] border-white text-2xl font-semibold p-2 px-4  rounded-xl" onClick={() => changesection("experience")}>Experience</button>
                    </div>

                    <div className="w-1/2 flex justify-start">
                        <button className="text-2xl font-semibold p-2 bg-slate-700 rounded-xl" onClick={() => changesection("education")}>Education</button>

                    </div>

                    </div>


                    <div className="p-5 relative overflow-hidden">
                    <div 
                        key={section}
                        className="animate-fade-in"
                    >
                        {
                            section === "experience" ? <Experience/> : <Education/>
                        }
                    </div>
                    </div>





                </div>

            </div>



            <div>

                <div className="flex flex-row gap-5 mt-[20px] social-icons-container">
                    <a href="https://github.com/kharitonov-egor" target="_blank" id="GithubClick">
                        <img src={github} alt="github logo"/>
                    </a>
                    <a href="https://www.linkedin.com/in/kharitonov-egor/" target="_blank" id="LinkedinClick">
                        <img src={linkedin} alt="linkedin logo"/>
                    </a>
                    <a href="mailto:egakhar@gmail.com" target="_blank" id="EmailClick">
                        <img src={email} alt="email logo"/>
                    </a>
                    <a href="https://t.me/kharitonov_egor" target="_blank" id="TelegramClick">
                        <img src={tg} alt="telegram logo"/>
                    </a>
                </div>

            </div>


        </div>
    )
}