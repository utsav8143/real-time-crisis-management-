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

    const activeIncidents=incidents
    .filter((inc)=>inc.status !== "resolved")
    .sort((a,b)=> severityOrder[a.severity]- severityOrder[b.severity])
    .slice(0,6);

  return (
   <div className="">
    <div className="">
        <h1 className="">LIVE INCIDENTS</h1>
        <p className="">real-time</p>
    </div>
   </div>
  )
}

export default LiveIncidents
