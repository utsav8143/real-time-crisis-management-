import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../utils/axiosInstance.js'
import SeverityBadge from "../components/incidents/SeverityBadge.jsx"

const IncidentDetail = () => {

    const {id}=useParams();

    const [incident, setIncident] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        api.get(`/incident/view-incidents/${id}`, { withCredentials: true })
           .then(res => {
             console.log("Incident details response:", res.data);
             setIncident(res.data.incident);
           })
           .catch((err) =>{
            console.log(err);
            setError("Failed to fetch incident details");
           })
           .finally(() => setIsLoading(false));
    },[id]);

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>
    if(!incident) return <p>Incident not found.</p>

    const date=new Date(incident.createdAt).toLocaleTimeString([] , {
        hour:"2-digit",
        minute:"2-digit",
    })



  return (
    <div className="p-3 h-screen  text-white">
  <div className="text-white">Details</div>
  <div className="font-bold text-primary">
    <p className="">{incident.category}</p>
    <p className="">{incident.description}</p>
    <p className="">{date}</p>
    <p className="">{incident.status}</p>
    <SeverityBadge severity={incident.severity}/>
    </div>
</div>
)}

export default IncidentDetail
