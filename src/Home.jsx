import github from "./assets/github.png";
import linkedin from "./assets/linkedin.png";
import email from "./assets/email.png";
import tg from "./assets/tg.png";
import me from "./assets/me.png";


export default function Home () {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">

            <div className="grid justify-items-center gap-3">

                    <img className="w-[150px] rounded-3xl shadow-md border-2 border-white" src={me} alt="photo of me"/>

                    <div className="grid justify-items-center text-center ">

                        <h1 className="text-3xl font-semibold text-white sm:text-4xl sm:font-bold mb-2">Egor Kharitonov</h1>
                        <h2 className="text-xl sm:text-xl">Software Engineer & Computer Science student</h2>

                    </div>
            </div>



            <div>

                <div className="flex flex-row gap-5 mt-[20px] social-icons-container">
                    <a href="https://github.com/kharitonov-egor" target="_blank">
                        <img src={github} alt="github logo"/>
                    </a>
                    <a href="https://www.linkedin.com/in/kharitonov-egor/" target="_blank">
                        <img src={linkedin} alt="linkedin logo"/>
                    </a>
                    <a href="mailto:egakhar@gmail.com" target="_blank">
                        <img src={email} alt="email logo"/>
                    </a>
                    <a href="https://t.me/kharitonov_egor" target="_blank">
                        <img src={tg} alt="telegram logo"/>
                    </a>
                </div>

            </div>


        </div>
    )
}