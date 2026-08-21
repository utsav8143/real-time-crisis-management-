import React from "react";
import SeverityBadge from "../components/incidents/SeverityBadge.jsx";
import IncidentMap from "../components/incidents/IncidentMap.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useSocket } from "../context/SocketContext.jsx";
import api from "../utils/axiosInstance.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [incident, setIncident] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const socket = useSocket();
  const { user, logout } = useAuth();

  // Initial load via REST
  useEffect(() => {
    async function fetchIncidents() {
      try {
        const { data } = await api.get("/incidents");
        setIncident(data);
      } catch (err) {
        console.error("Failed to fetch incidents", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchIncidents();
  }, []);

  // Live updates via socket.io
  useEffect(() => {
    if (!socket) return;

    const handleNewIncidents = (incident) => {
      setIncident((prev) => [incident, ...prev]);
    };

    const handleUpdatedIncidents = (updated) => {
      setIncident((prev) => {
        prev.map((inc) => (inc._id === updated._id ? updated : inc));
      });
    };

    socket.on("newIncident", handleNewIncidents);
    socket.on("incidentUpdated", handleUpdatedIncidents);
  }, [socket]);

  const filtered =
    filter === "all" ? incident : incident.filter((i) => i.severity === filter);

  if (isLoading) return <div className="">Loading incidents...</div>;

  return (
    <div className="">

      {/* Header Section */}
      <div className="border-b-white border-b flex justify-between items-center">
        <div className="flex items-center  pb-2">
          <div className="flex  mt-3 ms-3 lg:ms-5 ">
            <div className=" h-3 w-3 bg-red-600 rounded-sm  mt-5  flex justify-center items-center animate-pulse  ">
              <div className="h-1.5 w-1.5 bg-red-900 rounded-sm "></div>
            </div>
            <h1 className="font-bold text-2xl m-2 text-white">ResQ</h1>
          </div>
          <div className="flex items-center gap-2 justify-center mt-4 lg:ms-30">
            <div className="w-2 h-2 rounded-xl bg-red-700 shadow=[0_0_0_0_rgba(229,72,77,0.6)] animate-pulse-ring shrink"></div>
            <h1 className="text-red-700 font-extrabold">LIVE</h1>
          </div>
        </div>
        <div className="me-5">
          <div className="flex gap-3 items-center ">
            <Link to="/report" className="flex items-center font-bold text-primary border p-2 rounded-full hover:border hover:border-white hover:scale-95 hover:transition-all duration-200  ">Report <div className="h-2 w-2 bg-primary rounded-full ms-1"></div></Link>
            <div className="">
              <span className="text-white">{user.name} {user.role}</span>
              <button onClick={logout} className="border border-white text-white p-2 rounded-full hover:border-primary hover:text-primary hover:cursor-pointer transition-all hover:scale-95 duration-200">Logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="">
        <div className="border border-white lg:w-1/7 w-1/4 h-screen"></div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Dashboard;
