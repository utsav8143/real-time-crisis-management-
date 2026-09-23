import React from "react";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { LayoutDashboard, Plus, Form, Map, Menu, X} from "lucide-react";
import {useState} from "react"; 
import incidentMap from "../incidents/IncidentMap.jsx";


const DashboardLayout = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const {user,logout} = useAuth();

  return (
    <div className="max-h-screen">
      {/* Header Section */}
      <div className="border-b-gray-700 border-b flex justify-between items-center">
        <div className="flex items-center pb-2">
          <div className="flex mt-3 ms-3 lg:ms-5">
            <div className="h-3 w-3 bg-red-600 rounded-sm lg:mt-5 mt-4 flex justify-center items-center animate-pulse">
              <div className="h-1.5 w-1.5 bg-red-900 rounded-sm"></div>
            </div>
            <h1 className="font-bold lg:text-2xl text-xl m-2 text-white">ResQ</h1>
          </div>
          <div className="flex items-center lg:gap-2 gap-1 justify-center mt-4 lg:ms-30 ms-5  border border-red-600 rounded-full  p-1 px-2">
            <div className="w-2 h-2 rounded-xl bg-red-700 shadow=[0_0_0_0_rgba(229,72,77,0.6)] animate-pulse-ring shrink"></div>
            <h1 className="text-red-700 lg:font-extrabold font-bold ">LIVE</h1>
          </div>
        </div>

        <div className="me-5">
          <div className="flex gap-3 items-center">
            <div className="text-white border border-gray-600 p-2 rounded-xl text-sm lg:text-lg">{user?.name} {user?.role}</div>
            <Link
              to="/dashboard/report"
              className="lg:flex hidden items-center font-bold text-primary border p-2 rounded-full hover:border hover:border-white hover:scale-95 hover:transition-all duration-200"
            >
              Report{" "}
              <div className="h-2 w-2 bg-primary rounded-full ms-1"></div>
            </Link>
            <div className="">
              <button
                onClick={logout}
                className="lg:flex hidden border border-white text-white p-2 rounded-full hover:border-primary hover:text-primary hover:cursor-pointer transition-all hover:scale-95 duration-200"
              >
                Logout
              </button>
               
              {/* Hamburger Button for small screens */}
              <button onClick={()=> setIsOpen(!isOpen)} className="text-white lg:hidden ms-2 mt-1 ">
                {isOpen? <X/> : <Menu/>}
              </button>
              
             {/* Mobile Menu */}
              {isOpen && (
                <div className="absolute top-16 right-0 bg-gray-800 border border-gray-700 rounded-bl-lg rounded-br-lg p-4 z-50 w-full opacity-98 lg:hidden ">
                  <div className="flex flex-col gap-2  items-center">
                    <div
                      className="text-white flex items-center gap-2  p-2 text-sm hover:cursor-pointer hover:bg-gray-800 transition-all duration-200"
                      onClick={() => { handleNavigate("/dashboard"); setIsOpen(false); }}
                    >
                      <LayoutDashboard className="size-5" />
                      <h1 className="">Dashboard</h1>
                    </div>
                    <div
                      className="text-white flex items-center gap-2  p-2 text-sm hover:cursor-pointer hover:bg-gray-800 transition-all duration-200"
                      onClick={() => { handleNavigate("/dashboard/report"); setIsOpen(false); }}
                    >
                      <Form className="size-5" />
                      <h1 className="">Incident Form</h1>
                    </div>
                    <div
                      className="text-white flex items-center gap-2  p-2 text-sm hover:cursor-pointer hover:bg-gray-800 transition-all duration-200"
                      onClick={() => { handleNavigate("/dashboard/map"); setIsOpen(false); }}
                    >
                      <Map className="size-5" />
                      <h1 className="">Live Map</h1>
                    </div>
                    <div
                      className="text-white flex items-center gap-2  p-2 text-sm hover:cursor-pointer hover:bg-gray-800 transition-all duration-200"
                      onClick={() => { handleNavigate("/dashboard/incidents"); setIsOpen(false); }}
                    >
                      <Plus className="size-5" />
                      <h1 className="">Incidents</h1>
                    </div>
                    
                     
                  </div>
                    <div className=" mt-2 flex items-center justify-center  bg-gray-400  border border-white  p-2 rounded-full hover:border-primary hover:text-primary hover:cursor-pointer transition-all hover:scale-95 duration-200  ">
                      <button className="text-black font-bold" onClick={logout}>Logout</button>
                    </div>
                    <div className="mt-3 flex items-center justify-center font-bold text-primary border p-2 rounded-full hover:border hover:border-white hover:scale-95 hover:transition-all duration-200"
                    onClick={()=>isOpen(false)}>
                      <Link to="/dashboard/report">Report</Link>
                    </div>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className="border-r border-gray-700 border-l  lg:w-1/7 w-1/4  hidden lg:block h-screen">
          <div
            className="text-white flex items-center gap-2  p-5 text-sm hover:cursor-pointer hover:bg-gray-800 transition-all duration-200"
            onClick={() => {handleNavigate("/dashboard") }}
          >
            <LayoutDashboard className="size-5" />
            <h1 className="">Dashboard</h1>
          </div>
          <div
            className="text-white flex items-center gap-2  p-5 text-sm mt-4 hover:cursor-pointer hover:bg-gray-800 transition-all duration-200"
            onClick={() => handleNavigate("/dashboard/report")}
          >
            <Plus className="size-5" />
            <h1 className="">Incident Form</h1>
          </div>
          <div
            className="text-white flex items-center gap-2  p-5 text-sm mt-4 hover:cursor-pointer hover:bg-gray-800 transition-all duration-200"
            onClick={() => handleNavigate("/dashboard/map")}
          >
            <Map className="size-5" />
            <h1 className="">Live Map</h1>
          </div>
          <div
            className="text-white flex items-center gap-2  p-5 text-sm mt-4 hover:cursor-pointer hover:bg-gray-800 transition-all duration-200"
            onClick={() => handleNavigate("/dashboard/incidents") }
          >
            <Form className="size-5" />
            <h1 className="">Incidents</h1>
          </div>
        
        </div>
          <div className="w-full pb-7">
            <main className="">
              <Outlet/>
            </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
