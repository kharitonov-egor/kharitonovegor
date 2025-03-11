import me from "./assets/me.jpg";
import React from 'react';

export default function Card (props) {
    return (
        <div className="grid justify-items-center">
                <img className="w-[150px] rounded-full shadow-md " src={me} alt="photo of me"/>

            <div className="grid justify-items-center">

                <h1 className="text-xl font-semibold text-white sm:text-4xl sm:font-bold">Egor Kharitonov</h1>
                    <span className="text-base sm:text-xl">{props.text}</span>

            </div>
        </div>
    )
}