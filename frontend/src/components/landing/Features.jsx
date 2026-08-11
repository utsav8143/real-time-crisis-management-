import React from 'react'
import { LocateFixed, BrainCircuit, PersonStanding,LayoutDashboard, Bell, Radio  } from 'lucide-react';

const Features = () => {
  return (
    <section id='features' className='scroll-m-27'>
        <div className="mt-20">
            <div className="lg:w-1/2">
                <h1 className="text-primary">BUILT FOR CITIZENS AND RESPONDERS</h1>
                <p className="text-4xl mt-10 text-white">Everything an incident touches, nothing it doesn't. </p>
            </div>

            <div className="mt-20 grid lg:grid-cols-3 sm:grid-cols-2 bg-gray-900 rounded-xl">
                <div className="p-7 border border-gray-600 rounded-tl-xl  hover:bg-gray-800 transition-colors duration-200">
                    <LocateFixed className=' text-primary h-8 w-8 '/>
                    <h1 className=" text-white mt-5">Interactive Live Map</h1>
                    <p className="text-gray-400 mt-3">Every open incident plotted geospatially, updating in real time as reports come in.</p>
                </div>
                <div className="p-7 border border-gray-600 rounded-tr-xl lg:rounded-none hover:bg-gray-800 transition-colors duration-200">
                    <BrainCircuit className='text-primary h-8 w-8'/>
                    <h1 className=" text-white mt-5">AI Severity Prediction</h1>
                    <p className="text-gray-400 mt-3">Gemini reads each report's free text and returns a consistent severity rating in seconds.</p>
                </div>
                <div className="p-7 border border-gray-600 lg:rounded-tr-xl hover:bg-gray-800 transition-colors duration-200">
                    <PersonStanding className='text-primary h-8 w-8'/>
                    <h1 className=" text-white mt-5">Role-Based Access</h1>
                    <p className="text-gray-400 mt-3">Citizens report, responders act, admins oversee — each sees only what they need.</p>
                </div>
                <div className="p-7 border border-gray-600 lg:rounded-bl-xl hover:bg-gray-800 transition-colors duration-200">
                    <LayoutDashboard className='text-primary h-8 w-8'/>
                    <h1 className=" text-white mt-5">Responder & Admin Dashboards</h1>
                    <p className="text-gray-400 mt-3">Assigned incidents, live status, and team locations in one always-current view.</p>
                </div>
                <div className="p-7 border border-gray-600 rounded-bl-xl lg:rounded-none hover:bg-gray-800 transition-colors duration-200">
                    <Bell className='text-primary h-8 w-8'/>
                    <h1 className=" text-white mt-5">Zone-based notifications</h1>
                    <p className="text-gray-400 mt-3">Firebase push alerts reach only the teams inside the affected zone — nobody else.</p>
                </div>
                <div className="p-7 border border-gray-600 rounded-br-xl hover:bg-gray-800 transition-colors duration-200">
                    <Radio className='text-primary h-8 w-8'/>
                    <h1 className=" text-white mt-5">Live Status Tracking</h1>
                    <p className="text-gray-400 mt-3">Every incident's stage — reported, classified, assigned, resolved — updates on the board instantly.</p>
                </div>
            </div>
        </div>
        <div className="border border-b-gray-700 mt-20"></div>
    </section>
  )
}

export default Features;
