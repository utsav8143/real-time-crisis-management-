import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
      }/>
    </Routes>
  )
}

export default App
