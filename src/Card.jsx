import me from "./assets/me.jpg";
import React from 'react';

export default function Card (props) {
    return (
        <div className="grid justify-items-center gap-3">
                <img className="w-[150px] rounded-3xl shadow-md " src={me} alt="photo of me"/>

            <div className="grid justify-items-center text-center ">

                <h1 className="text-3xl font-semibold text-white sm:text-4xl sm:font-bold mb-2">Egor Kharitonov</h1>
                    <h2 className="text-xl sm:text-xl">{props.text}</h2>

            </div>
        </div>
    )
}