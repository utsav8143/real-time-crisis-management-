import React from 'react'
import { Link } from 'react-router-dom'
import SeverityBadge from './SeverityBadge.jsx'

const IncidentCard = ({incident}) => {
 const time=new Date(incident.createdAt).toLocaleTimeString([],{
    hour:"2-digit",
    minute:"2-digit"
 });
  return (
    <Link to={`/incidents/${incident._id}`}>
    <div className="">
       <span className="">{time}</span>
       <span className="">{incident.category}</span>
       <SeverityBadge className=""/>
    </div>
    <p className="">{incident.title}</p>
    <p className="">Status: {incident.status}</p>
    </Link>
  )
}
export default IncidentCard


