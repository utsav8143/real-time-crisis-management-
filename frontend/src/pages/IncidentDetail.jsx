import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/axiosInstance.js";
import SeverityBadge from "../components/incidents/SeverityBadge.jsx";

const IncidentDetail = () => {
  const { id } = useParams();

   const SEV_COLOR = {
    critical: "#F0555B",
    high: "#E88A2B",
    medium: "#4C9EEB",
    low: "#34D399",
  };

  const [incident, setIncident] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/incident/view-incidents/${id}`, { withCredentials: true })
      .then((res) => {
        
        setIncident(res.data.incident);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch incident details");
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <p className="p-5 text-white">Loading details...</p>;
  if (error) return <p className="p-5 text-red-700">{error}</p>;
  if (!incident) return <p className="p-5 text-white">Incident not found.</p>;

  const date = new Date(incident.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-3 h-screen  text-white ">
      <div className="bg-gray-900 h- p-3 rounded-lg pb-10 ">
      <div className="text-primary font-bold text-2xl">Details
        <div className="border-t border-gray-700 mt-3"></div>
      </div>
      <div className="font-bold mt-5">
        <span className="flex lg:text-lg ">Category :
        <p className="ms-1 "> {incident.category}</p></span>
        <p className="mt-5 w-1/2">Description : {incident.description}</p>
        <p className="mt-5">Date : {date}</p>
        <p className="mt-5">Status : {incident.status}</p>
        
        <div className="mt-6 flex">Severity : 
          <div
                  className=" ms-2 w-20 h-8 rounded-lg  flex items-center justify-center  uppercase font-bold text-sm "
                  style={{
                    background: `color-mix(in srgb, ${SEV_COLOR[incident.severity]} 30%, transparent)`,
                  }}
                 >
                  <div className=" " style={{ color: SEV_COLOR[incident.severity] }}>
                    {incident.severity}
                  </div>
                </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
