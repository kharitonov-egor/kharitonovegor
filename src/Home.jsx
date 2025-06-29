import Card from './Card.jsx'
import github from "./assets/github.png";
import linkedin from "./assets/linkedin.png";
import email from "./assets/email.png";
import tg from "./assets/tg.png";


export default function Home () {
    return (
        <div className="grid justify-items-center">


            <Card text="Software Engineer & Computer Science student" className="w-max m-auto"/>

            <div>

                <div className="flex flex-row gap-4 mt-[20px] social-icons-container">
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