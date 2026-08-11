import React from 'react'

const Map = () => {
  return (
    <section className='scroll-m-27' id="risk-map">
    <div className="mt-20">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-xl bg-red-700 shadow=[0_0_0_0_rgba(229,72,77,0.6)] animate-pulse-ring shrink"></div>
            <h1 className="text-primary font-bold">UPDATED AS REPORTS COME IN</h1>
        </div>
        <div className="mt-10 lg:w-1/2">
            <h2 className=" text-4xl text-white">See where risk is concentrated, in real time.</h2>
            <p className=" text-gray-500 mt-10">Every classified incident is poltted by zone and severity - so admins can see clusters forming before they escalate. </p>
        </div>
        <div className="border-b border-r border-gray-700 w-full h-100 mt-15 bg-gray-900 bg-[linear-gradient(to_right,#424242_1px,transparent_1px),linear-gradient(to_bottom,#424242_1px,transparent_0.5px)]
  bg-size-[40px_40px] opacity-70 relative">
    <div className="bg-blue-400  animate-pulseB shrink h-2 w-2 rounded-xl absolute top-19 left-19 group"><div className='group-hover:block text-gray-400 w-20 h-12 text-center absolute top-10 -left-8 hidden  '>Zone-15 , FIRE</div></div>
    <div className="bg-red-400  animate-pulseR shrink h-2 w-2 rounded-xl absolute top-79 left-59 group"><div className='group-hover:block text-gray-400 w-20 h-12 text-center absolute top-5 -left-8 hidden  '>Zone-17 , MEDICAL</div></div>
    <div className="bg-yellow-400  animate-pulseY shrink h-2 w-2 rounded-xl absolute top-49 left-99 group"><div className='group-hover:block text-gray-400 w-20 h-12 text-center absolute top-10 -left-8 hidden  '>Zone-33 , FLOOD</div></div>
    <div className="bg-green-400  animate-pulseG shrink h-2 w-2 rounded-xl absolute lg:top-29 lg:left-249 group sm:left-129 sm:top-29 "><div className='group-hover:block text-gray-400 w-20 h-12 text-center absolute top-10 -left-8 hidden  '>Zone-04 , STRUCTURAL DAMAGE</div></div>
    <div className="bg-blue-400  animate-pulseB shrink h-2 w-2 rounded-xl absolute lg:top-89 lg:left-159 group sm:top-79 sm:left-139"><div className='group-hover:block text-gray-400 w-20 h-12 text-center absolute bottom-7 -left-8 hidden  '>Zone-01, FIRE</div></div>
    <div className="bg-yellow-400  animate-pulseY shrink h-2 w-2 rounded-xl absolute top-59 left-209 group "><div className='group-hover:block text-gray-400 w-20 h-12 text-center absolute top-10 -left-8 hidden  '>Zone-81, ACCIDENT</div></div>
    
  </div>
    </div>
    <div className="border border-b-gray-700 mt-20"></div>
    </section>
  )
}

export default Map
