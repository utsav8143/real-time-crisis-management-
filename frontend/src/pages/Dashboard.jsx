import React from "react";
import SeverityBadge from "../components/incidents/SeverityBadge.jsx";
import IncidentMap from "../components/incidents/IncidentMap.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useSocket } from "../context/SocketContext.jsx";
import api from "../utils/axiosInstance.js";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Form, Map, Plus } from "lucide-react";
import { Navigate } from "react-router-dom";


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
    <div className="ms-6 mt-3">
      <div className="">
        <h1 className="text-white">Welcome, {user.name} !</h1>
        <h2 className="text-gray-600 text-sm">Last updated 2 sec ago </h2>
      </div>

      <div className="">
        <h1 className="">{incidents.length}</h1>
        <p className="">INCIDENTS</p>
      </div>
    </div>
  );
};

export default Dashboard;
