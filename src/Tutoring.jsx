import Card from "./Card.jsx";
import React from 'react';

import phoneNumber from './phoneNumber.js';

import usf from './assets/usf.png'
import info from './assets/info.png'

export default function Tutoring () {
    return (
        <>
            <Card text="SAT, ACT and high school math tutor"/>

            <p className="mb-[1em]">Are you looking for a tutor to help your child excel on the SAT Math and secure a spot at a top
                college? I'm here to support them.</p>

            <ul className="list-disc">
                <div className="flex flex-row gap-7 mb-5">

                    <div className="min-w-[150px] max-h-[150px] bg-zinc-800  rounded-2xl font-semibold text-center content-center shadow-lg">
                        <span className="text-2xl">770 <br/> Math <br/> SAT </span>
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        <li>With years of tutoring experience, I focus on teaching the logic behind math instead of just memorizing.
                        </li>
                        <li>I'm transferring to <span className="inline-flex items-center"><img
                            className="w-[20px] ml-0.5 mr-1" src={usf}></img></span>USF as a Computer Science major with
                            a Math minor, bringing an international perspective from Russia.
                        </li>

                    </div>


                </div>

            </ul>

            <p className="mb-5">Text me: {phoneNumber}</p>

            <p className="mb-5 font-semibold text-lg">Reviews about me:</p>

            <div className="flex flex-col gap-[20px]">
                <div className="flex flex-row text-sm gap-4">
                    <div className="bg-zinc-800 p-4 rounded-2xl">
                        <h2 className="mb-4 font-semibold text-lg">William</h2>
                        <p>To be written</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-2xl">
                        <h2 className="mb-4 font-semibold text-lg">Jane</h2>
                        <p>My 9th-grade daughter was struggling with Algebra, but thanks to Egor, everything changed. He has a special way of connecting with teenagers, making even the most complicated topics understandable. His calm demeanor and sense of humor made learning enjoyable for her. Egor is an amazing tutor, and I can’t stop to recommend him enough to friends and anyone in need. </p>
                    </div>
                </div>
                <div className="flex flex-row text-sm gap-4">
                    <div className="bg-zinc-800 p-4 rounded-2xl">
                        <h2 className="mb-4 font-semibold text-lg">Artem</h2>
                        <p>To be written</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-2xl">
                        <h2 className="mb-4 font-semibold text-lg">Katie</h2>
                        <p>To be written</p>
                    </div>
                </div>

            </div>
        </>
    )
}