import React from 'react'
import { Link } from 'react-router-dom'

const LiveIncidents = ({incidents}) => {

    const SEV_COLOR={
          critical: '#F0555B',
  high: '#E88A2B',
  medium: '#4C9EEB',
  low: '#34D399',
    };

    const severityOrder={ critical: 0, high: 1, medium: 2, low: 3 };

    const activeIncidents=(incidents ?? [])
    .filter((inc)=>inc.status !== "resolved")
    .sort((a,b)=> severityOrder[a.severity]- severityOrder[b.severity])
    .slice(0,6);

  return (
   <div className="">
    <div className="flex justify-between p-1 border-b border-b-gray-700">
        <h1 className="text-gray-400 text-sm">LIVE INCIDENTS</h1>
        <p className="text-gray-600">real-time</p>
    </div>
    <div className="p-1">
      {activeIncidents.length===0 && (
        <p className="text-white">No incidents right now.</p>
      )}
      {activeIncidents.map((inc)=>{
         <Link to={`/incidents/${inc._id}`} key={inc._id}>
          <span className="" style={{background: SEV_COLOR[inc.severity]}}></span>
          <div className="" style={{color: SEV_COLOR[inc.severity]}}>{inc.severity}</div>
          <div className="">{inc.title}</div>
          <div className="">{new Date(inc.createdAt).toLocaleTimeString([],{
            hour:'2-digit',
            minutes:'2-digit',
          })}{''} . {inc.status}</div>
         </Link>
      })}
    </div>
   </div>
  )
}

export default LiveIncidents
