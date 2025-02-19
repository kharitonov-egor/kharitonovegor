import Card from "./Card.jsx";
import React from 'react';

import phoneNumber from './phoneNumber.js';

import usf from './assets/usf.png'
import info from './assets/info.png'

export default function Tutoring () {
    return (
        <>
            <Card text="SAT, ACT and high school math tutor"/>

            <p className="mb-[1em]">Are you looking for a tutor to help your child excel on the SAT Math section and secure a spot at a top
                college? I'm here to support your child's journey.</p>

            <ul className="list-disc">
                <li>I scored 770 on the SAT Math section (out of 800 possible).</li>
                <li>With years of tutoring experience, I focus on teaching the logic behind math helping students truly understand concepts instead of just memorizing formulas.</li>
                <li>I'm transferring to <span className="inline-flex items-center"><img className="w-[20px] ml-0.5 mr-1"
                                                                                        src={usf}></img></span>USF as a
                    Computer Science major with a Math minor, bringing an international perspective from Russia.</li>
                <li>I create custom worksheets, homework assignments, and formula sheets designed to reinforce learning and address student's needs.</li>
            </ul>

            <p className="mb-5">Text me: {phoneNumber}</p>

            <p className="mb-5 font-semibold">Reviews about me:</p>

            <div className="flex flex-col gap-[20px]">
                <div className="flex flex-row text-sm gap-4">
                    <div className="bg-zinc-800 p-4 rounded-2xl">
                        <h2 className="mb-4 font-semibold text-base">William</h2>
                        <p>To be written</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-2xl">
                        <h2 className="mb-4 font-semibold text-base">Jane</h2>
                        <p>To be written</p>
                    </div>
                </div>
                <div className="flex flex-row text-sm gap-4">
                    <div className="bg-zinc-800 p-4 rounded-2xl">
                        <h2 className="mb-4 font-semibold text-base">Artem</h2>
                        <p>To be written</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-2xl">
                        <h2 className="mb-4 font-semibold text-base">Katie</h2>
                        <p>To be written</p>
                    </div>
                </div>

            </div>
        </>
    )
}