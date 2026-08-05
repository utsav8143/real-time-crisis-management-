import React from "react";

const Hero = () => {
  return (
    <div className="">
      <div className="">
        <div className="mt-25 flex gap-2 items-center">
          <div className="w-2 h-2 rounded-xl bg-red-700 shadow=[0_0_0_0_rgba(229,72,77,0.6)] animate-pulse-ring shrink"></div>
          <p className="text-white text-sm">MERN . SOCKET.IO . GEMINI</p>
        </div>
        <div className="mt-7 w-1/2">
          <h1 className="text-6xl font-bold text-white">
            Know the moment <span className="text-primary">it happens.</span>
          </h1>
          <p className="mt-7 text-gray-400 text-lg">
            Lets citizens report an emergency in seconds, has Gemini score its
            severity automatically, and puts every open incident on one live
            dashboard for responders - no refresh, no delay.
          </p>
        </div>
      </div>
      <div className="mt-15 flex gap-7">
        <a href="" className=" p-4 bg-linear-to-r from-yellow-500 to-yellow-800 rounded-lg text-white font-bold hover:scale-95 transition-transform duration-300 ">
          View live Demo
        </a>
        <a href="#pipeline" className="border p-4 text-white rounded-lg font-bold  hover:scale-95 transition-transform duration-300 hover:border-gray-400 hover:text-gray-400">
          How it works
        </a>
      </div>
      <div className="">

      </div>
    </div>
  );
};

export default Hero;
