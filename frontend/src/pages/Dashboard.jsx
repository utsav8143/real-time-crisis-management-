import LiveIncidents from "../components/incidents/LiveIncidents.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useSocket } from "../context/SocketContext.jsx";
import api from "../utils/axiosInstance.js";

import IncidentMap from "../components/incidents/IncidentMap.jsx";

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
        const { data } = await api.get("/api/incident/view-incidents",{withCredentials:true});
        setIncident(data.incident);
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

  const criticalCount = (incident ?? []).filter(
    (inc) => inc.severity === "critical",
  ).length;

  const resolvedToday = (incident ?? []).filter(
    (inc) =>
      inc.status === "resolved" &&
      new Date(inc.updatedAt).toString() === new Date().toString(),
  ).length;

  const active= (incident ?? []).filter(inc=>inc.status==="reported").length;

  return (
    <div className="ms-5 mt-3 me-5">
      <div className="lg:ms-12">
        <h1 className="text-white">Welcome, {user.name} !</h1>
        <h2 className="text-gray-600 text-sm">Last updated 2 sec ago </h2>
      </div>

<div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 mt-10 place-items-center space-y-5 lg:space-y-0">
      <div className="border border-gray-700 bg-gray-800 p-4 rounded-xl border-t-2 border-t-amber-600 w-75 h-25">
        <h1 className="text-white font-bold text-2xl ">
          {(incident ?? []).length}
        </h1>
        <p className="text-gray-400 text-sm ">INCIDENTS</p>
      </div>

      <div className="border border-gray-700 bg-gray-800 p-4 rounded-xl border-t-2 border-t-red-600 w-75 h-25">
        <h1 className="text-white text-2xl font-bold">{criticalCount}</h1>
        <p className="text-gray-400 text-sm">CRITICAL</p>
      </div>

      <div className="border border-gray-700 bg-gray-800 p-4 rounded-xl border-t-2 border-t-green-600 w-75 h-25">
        <h1 className="text-white text-2xl font-bold">{resolvedToday}</h1>
        <p className="text-gray-400 text-sm">RESOLVED</p>
      </div>
      </div>

      <div className="lg:flex gap-5 grid grid-cols-1">
      <div className="mt-10 border border-gray-700 lg:w-3/5 w-full h-80 rounded-lg">
        <div className="flex justify-between border-b border-b-gray-700 p-1">
          <h1 className="text-gray-400 text-sm">LIVE RISK MAP</h1>
          <p className="text-gray-600">{active} active</p>
        </div>
        <div className="flex-1 min-h-0">
          <IncidentMap incidents={incident}/>
        </div>
      </div>

      <div className="mt-10 border border-gray-700 lg:w-3/8 rounded-lg h-108">
       <LiveIncidents/>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
