import React from "react";
import { Copyright, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <div className="mt-20">
      <div className="border-t border-t-gray-700 pb-3 flex justify-between">
        <div className="flex  mt-3 sm:ms-5 ">
          <div className=" h-3 w-3 bg-red-600 rounded-sm  mt-4.5  flex justify-center items-center animate-pulse  ">
            <div className="h-1.5 w-1.5 bg-red-900 rounded-sm "></div>
          </div>
          <h1 className="font-bold text-xl m-2 text-white">ResQ</h1>
        </div>
      
      <div className="flex items-center gap-1">
        <Copyright className="text-white h-4 w-4 mt-1" />
        <span className="text-white">2026 ResQ. All rights reserved</span>
        <a href="#hero">
        <ArrowUp className="border border-gray-700 h-8 w-8 rounded-sm text-white bg-gray-800 ms-5 me-2 hover:bg-gray-700 transition-colors duration-200"/>
        </a>
      </div>
      </div>
    </div>
  );
};

export default Footer;
