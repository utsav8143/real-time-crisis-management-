import React from 'react'
import SeverityBadge from '../components/incidents/SeverityBadge.jsx'
import IncidentMap from '../components/incidents/IncidentMap.jsx'

const Dashboard = () => {
  return (
    <div>
    <SeverityBadge/>
    <IncidentMap/>
    </div>
  )
}

export default Dashboard
