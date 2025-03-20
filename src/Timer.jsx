import React from 'react';
import Countdown from 'react-countdown';

import { useState, useEffect } from 'react';



export default function Timer (props) {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.affirmations.dev'))
            .then(response => response.json())
            .then(result => setData(JSON.parse(result.contents)))
            .catch(error => console.error('Fetch Error:', error));
    }, []);

    return (
        <>

            <div className="content-center items-center place-content-center text-center">
                <h1 className="text-2xl mb-10">{props.text}</h1>

                <Countdown
                    className="text-5xl font-semibold" date={props.date}
                />
                <div className="mt-10">
                    {data ? <p>{data.affirmation}</p> : <p>Loading...</p>}
                </div>


            </div>


        </>


    )
}