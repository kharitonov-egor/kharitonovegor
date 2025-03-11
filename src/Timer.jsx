import React from 'react';
import Countdown from 'react-countdown';

import { useState, useEffect } from 'react';



export default function Timer (props) {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://www.affirmations.dev')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, [])

    console.log(data)

    return (
        <>

            <div className="content-center items-center place-content-center text-center">
                <h1 className="text-2xl mb-10">{props.text}</h1>

                <Countdown
                    className="text-5xl font-semibold" date={props.date}
                />

            </div>

            <div>
                {data ? <h1>{data.slip.advice}</h1> : 'Loading...'}
            </div>

        </>


    )
}