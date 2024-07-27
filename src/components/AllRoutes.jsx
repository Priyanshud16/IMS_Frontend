import React from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignUp'
import AdminUpload from './AdminUpload'
import AgentDashboard from './AgentDashboard'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'

function AllRoutes() {
  return (
    <div>
       <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/admin' element={
            <PrivateRoutes>
            <AdminUpload />
            </PrivateRoutes>
            } />
          <Route path='/agent' element={
            <PrivateRoutes>
             <AgentDashboard />
            </PrivateRoutes>
           } />
        </Routes>
    </div>
  )
}

export default AllRoutes
