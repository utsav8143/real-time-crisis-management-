import React from "react";
import { Link } from "react-router-dom";

const Live = () => {
  return (
    <div className="mt-40">
      <div className="flex items-center gap-2 justify-center">
        <div className="w-2 h-2 rounded-xl bg-red-700 shadow=[0_0_0_0_rgba(229,72,77,0.6)] animate-pulse-ring shrink"></div>
        <h1 className="text-primary">READY TO SEE IT LIVE</h1>
      </div>
      <div className="">
        <h1 className="text-4xl text-white text-center mt-10">
          Walk through ResQ, end to end.
        </h1>
        <p className=" text-gray-400 mt-8 text-center">
          From the citizen portal to the AI-classified, live-updating responder
          dashboard.
        </p>
      </div>
      <div className="flex justify-center mt-10 ">
        <Link to="" className="bg-linear-to-r from-yellow-500 to-yellow-800 w-30 h-12 rounded-lg text-white font-bold hover:scale-95 hover:cursor-pointer transition-transform duration-200 text-center pt-2.5">
          View demo
        </Link>
      </div>
     
    </div>
  );
};

export default Live;
