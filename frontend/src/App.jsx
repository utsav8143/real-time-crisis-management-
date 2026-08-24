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


const App = () => {
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
      <Route path="incidents" element={<IncidentCard />} />
    <Route path="map" element={<IncidentMap />} />
    <Route path="incident-form" element={<IncidentForm/>}/>
    </Route>
    </Routes>
  )
}

export default App
