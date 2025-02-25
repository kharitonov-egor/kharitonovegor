import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <span>{hours}:{minutes}:{seconds}</span>;
    }
};

export default function Timer () {
    return (
        <div className="content-center items-center place-content-center text-center">
            <h1 className="text-2xl mb-10">Time till Spring 2025 semester ends:</h1>


            <Countdown
                className="text-3xl font-semibold" date='2025-05-07T00:00:01'
            />

        </div>

            )
            }