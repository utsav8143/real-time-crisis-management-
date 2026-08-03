import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        const handleScroll = () =>{
            setIsScrolled(window.scrollY >10)
        };
        window.addEventListener("scroll",handleScroll);
        return () => {
            window.removeEventListener("scroll",handleScroll)
        }
    },[])

  return (
    <div className="">
      <div className="flex justify-evenly ">
        <div className="flex ms-32 mt-3 ">
          <div className=" h-3 w-3 bg-red-600 rounded-sm  mt-5 ms-2 flex justify-center items-center animate-glow ">
            <div className="h-1.5 w-1.5 bg-red-800 rounded-sm "></div>
          </div>
          <h1 className="font-bold text-2xl m-2 text-white">ResQ</h1>
        </div>
        <div className="flex gap-10 mt-6">
          <a href="#pipeline" className="text-gray-500 hover:text-gray-300">
            How it Works
          </a>
          <a href="#features" className="text-gray-500 hover:text-gray-300">
            Features
          </a>
          <a href="#risk-map" className="text-gray-500 hover:text-gray-300">
            Risk Map
          </a>
          <a
            href="#ai-classification"
            className="text-gray-500 hover:text-gray-300"
          >
            AI Classification
          </a>
        </div>
        <div className="flex gap-5 mt-3">
            <Link to="/login" className=" p-3 text-white border rounded-2xl hover:border-gray-500 hover:scale-105 transition-transform">Login</Link>
            <Link to="/register" className=" p-3 bg-linear-to-r from-yellow-500 to-yellow-800 font-bold rounded-2xl text-white hover:scale-105 transition-transform">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
