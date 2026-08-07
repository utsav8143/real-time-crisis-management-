import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div >
      <div className="flex  lg:justify-evenly justify-between ">
        <div className="flex  mt-3 sm:ms-5 ">
          <div className=" h-3 w-3 bg-red-600 rounded-sm  mt-5  flex justify-center items-center animate-pulse  ">
            <div className="h-1.5 w-1.5 bg-red-900 rounded-sm "></div>
          </div>
          <h1 className="font-bold text-2xl m-2 text-white">ResQ</h1>
        </div>
        <div className="lg:flex hidden gap-10 mt-6">
          <a
            href="#pipeline"
            className="text-gray-400 hover:text-primary transition-colors duration-300 relative 
         after:content-['']
         after:absolute
         after:left-0
         after:bottom-3
         after:w-full
         after:h-0.5
         after:bg-primary
         after:opacity-0
         after:transition-[opacity,all,transform]
         after:duration-300
         hover:after:opacity-100
         hover:after:translate-y-1
         focus:after:opacity-100
         focus:after:translate-y-1"
          >
            How it Works
          </a>
          <a
            href="#features"
            className="text-gray-400 hover:text-primary transition-colors duration-300 relative 
         after:content-['']
         after:absolute
         after:left-0
         after:bottom-3
         after:w-full
         after:h-0.5
         after:bg-primary
         after:opacity-0
         after:transition-[opacity,all,transform]
         after:duration-300
         hover:after:opacity-100
         hover:after:translate-y-1
         focus:after:opacity-100
         focus:after:translate-y-1"
          >
            Features
          </a>
          <a
            href="#risk-map"
            className="text-gray-400 hover:text-primary transition-colors duration-300 relative 
         after:content-['']
         after:absolute
         after:left-0
         after:bottom-3
         after:w-full
         after:h-0.5
         after:bg-primary
         after:opacity-0
         after:transition-[opacity,all,transform]
         after:duration-300
         hover:after:opacity-100
         hover:after:translate-y-1
         focus:after:opacity-100
         focus:after:translate-y-1"
          >
            Risk Map
          </a>
          <a
            href="#ai-classification"
            className="text-gray-400 hover:text-primary transition-colors duration-300 relative 
         after:content-['']
         after:absolute
         after:left-0
         after:bottom-3
         after:w-full
         after:h-0.5
         after:bg-primary
         after:opacity-0
         after:transition-[opacity,all,transform]
         after:duration-300
         hover:after:opacity-100
         hover:after:translate-y-1
         focus:after:opacity-100
         focus:after:translate-y-1"
          >
            AI Classification
          </a>
        </div>
        <div className="lg:flex hidden gap-5 mt-3">
          <Link
            to="/login"
            className=" p-3 text-white border rounded-2xl hover:border-gray-500 hover:scale-105 transition-transform duration-250"
          >
            Login
          </Link>
          <Link
            to="/register"
            className=" p-3 bg-linear-to-r from-yellow-500 to-yellow-800 font-bold rounded-2xl text-white hover:scale-105 transition-transform duration-250"
          >
            Register
          </Link>
        </div>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden me-40 mt-5 text-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="">
          <div className="lg:hidden flex flex-col items-center justify-center  mt-5 bg-gray-800 opacity-75">
            <a
              href="#pipeline"
              className="text-gray-300 font-bold  p-5 hover:text-gray-100 transition-transform"
            >
              How it Works
            </a>
            <a
              href="#features"
              className="text-gray-300 font-bold  p-5 hover:text-gray-100 transition-transform"
            >
              Features
            </a>
            <a
              href="#risk-map"
              className="text-gray-300 font-bold  p-5 hover:text-gray-100 transition-transform"
            >
              Risk Map
            </a>
            <a
              href="#ai-classification"
              className="text-gray-300 font-bold  p-5 hover:text-gray-100 transition-transform"
            >
              AI Classification
            </a>

            <div className="flex flex-col gap-2 mb-5 mt-5 ">
              <Link
                to="/login"
                className=" p-3 text-white border rounded-2xl hover:border-gray-500 hover:scale-105 transition-transform text-center w-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className=" p-3 bg-linear-to-r from-yellow-500 to-yellow-800 font-bold rounded-2xl text-white hover:scale-105 transition-transform text-center w-100"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
