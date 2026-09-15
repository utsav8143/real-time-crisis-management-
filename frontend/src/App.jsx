import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'
import LandingPage from './pages/LandingPage.jsx'
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import IncidentMap from './components/incidents/IncidentMap.jsx'
import IncidentCard from './components/incidents/IncidentCard.jsx'
import IncidentForm from './components/incidents/IncidentForm.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import IncidentDetail from './pages/IncidentDetail.jsx'


const App = () => {

  const [incidents, setIncidents] = useState([])

  useEffect(() => {

    const token=localStorage.getItem("token");

  axios.get("/api/incident/view-incidents", {
  headers: {Authorization: `Bearer ${token}`},
})
    .then(res=>{
      
      setIncidents(res.data.incidents)})
    .catch(err=>console.error(err));
  },[])

  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
        <DashboardLayout/>
        </ProtectedRoute>
      }>
      <Route index element={<Dashboard/>}/>
      <Route path="incidents/:id" element={<IncidentDetail incident={incidents} />} />
    <Route path="map" element={<IncidentMap incidents={incidents} />} />
    <Route path="report" element={<IncidentForm/>}/>
    </Route>
    </Routes>
  )
}

export default App
