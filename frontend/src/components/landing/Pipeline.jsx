import React from 'react'


const Pipeline = () => {
  return (
    <section id='pipeline' className=''>
    <div className="mt-40" >
        <div className="">
            <h1 className="text-primary font-bold ">THE PIPELINE</h1>
        </div>
        <div className="mt-10 lg:w-1/2">
            <h2 className="text-4xl text-white">From citizen report to closed incidents.</h2>
            <p className="text-gray-400 mt-7">Every report moves through the same four stages on the MERN stack - validated, classified, dispatched, and tracked to resolution.</p>
        </div>
        <div className="mt-20 grid lg:grid-cols-4 sm:grid-cols-2 border border-gray-600 rounded-sm">
            <div className="p-6 border-gray-600 border bg-gray-900">
                <h1 className="text-primary ">01</h1>
                <h2 className="text-white mt-3">Report</h2>
                <p className="mt-5 text-gray-400">A citizen submits location, category, and description through the Citizen Portal - the backend validates it instantly.</p>
            </div>
            <div className="p-6 border-gray-600 border bg-gray-900">
                <h1 className="text-primary ">02</h1>
                <h2 className="text-white mt-3">Classify</h2>
                <p className="mt-5 text-gray-400">The Gemini API reads the report and returns a severity level, then the incident is stored in MongoDB Atlas.</p>
            </div>
            <div className="p-6 border-gray-600 border bg-gray-900">
                <h1 className="text-primary ">03</h1>
                <h2 className="text-white mt-3">Dispatch</h2>
                <p className="mt-5 text-gray-400">Socket.io pushes the update to every dashboard live, and the nearest available team is assigned.</p>
            </div>
            <div className="p-6 border-gray-600 border bg-gray-900">
                <h1 className="text-primary ">04</h1>
                <h2 className="text-white mt-3">Resolve</h2>
                <p className="mt-5 text-gray-400">Firebase notifies the responder, status updates flow back to the board, until it's marked resolved.</p>
            </div>
        </div>
        <div className="mt-20 border border-b-gray-700 "></div>
    </div>
    </section>
  )
}

export default Pipeline
