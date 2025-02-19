import me from "./assets/me.jpg";
import React from 'react';

export default function Card (props) {
    return (
        <>
            <div className='flex flex-row gap-4 mb-5'>
                <img className="w-20 h-20 rounded-full shadow-md " src={me} alt="photo of me"/>
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-xl font-semibold text-white sm:text-3xl sm:font-bold">Egor Kharitonov</h1>
                    <span className="text-base text-lg ">{props.text}</span>
                </div>

            </div>
        </>
    )
}