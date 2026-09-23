import React from 'react'
import { useState, useEffect } from 'react'
import api from "../../utils/axiosInstance.js"
import { useSocket } from '../../context/SocketContext'

const SEV_COLOR = {
  critical: "#F0555B",
  high: "#E88A2B",
  medium: "#4C9EEB",
  low: "#34D399",
};

const IncidentCard = () => {

   const [incident, setIncident] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   const socket=useSocket();

   useEffect(()=>{
      async function fetchIncidents(){
         setIsLoading(true);
         try{
         const {data}=await api.get("/incident/view-incidents", { withCredentials:true });
         console.log("Incidents:",incident)
          setIncident(data.incidents);
      } catch(err){
         console.log("Failed to fetch Incidents",err);
         setError("Failed to fetch incidents");
      } finally{
        setIsLoading(false);
      }}
     fetchIncidents();
   },[]);

   useEffect(()=>{
      if(!socket) return

      const handleNewIncidents=(incident)=>{
         setIncident((prev)=>[incident,...prev]);
      }
       const handleUpdatedIncidents = (updated) => {
      setIncident((prev) => {
        prev.map((inc) => (inc._id === updated._id ? updated : inc));
      });
    };
    socket.on("newIncident", handleNewIncidents);
    socket.on("incidentUpdated", handleUpdatedIncidents);
  }, [socket]);

   const activeIncidents = incident.filter((inc) => inc.status !== "resolved");

  if(isLoading) return <p className="p-4 text-white font-bold lg:text-lg">Loading Incidents...</p>
  if(error) return <p className="text-red-700 border border-red-700 rounded-xl p-2">{error}</p>
   

  return (
    <div className='h-screen'>
      <div className="overflow-y-auto  scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thin  ">
        {activeIncidents.length === 0 && (
          <p className="text-white p-2 font-bold">No incidents now.</p>
        )}
         <div className="text-gray-400 grid grid-cols-4 p-4 font-bold lg:text-lg ">
                  <p className="ms-2">Severity</p>
                  <p className="">Title</p>
                  <p className="">Description</p>
                  <p className="">Time</p>
               </div>
               <div className="border-t  border-gray-700"></div>
        {activeIncidents.map((incident) => {
          return (
            <div>
              
               
            <div className="border-b border-b-gray-700 grid grid-cols-4 p-4 " key={incident._id}>
                <div
                  className="lg:w-25 lg:h-10 w-20 h-7  rounded-full border flex items-center justify-center  uppercase font-bold text-sm "
                  style={{
                    background: `color-mix(in srgb, ${SEV_COLOR[incident.severity]} 30%, transparent)`,
                  }}
                 >
                  <div className=" " style={{ color: SEV_COLOR[incident.severity] }}>
                    {incident.severity}
                  </div>
                </div>
                <div className="text-white lg:text-base text-sm">{incident.title}</div>
                <div className="text-white lg:text-base text-sm">{incident.description}</div>
                <div className="text-gray-500 lg:text-base text-sm">
                  {new Date(incident.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {""} . {incident.status}
                </div>
              
            </div>
            </div>
          );
        })}
      </div>
    </div>
   
  )
}

export default IncidentCard
