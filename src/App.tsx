import { Routes, Route } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { SignIn, SignUp } from './screens/Auth'
import { EmailVerify, ExpiredLink } from './screens/Auth'
import { EditProfile, UserProfile } from './screens/UserProfile'
import { Onboarding } from './screens/Onboarding/Onboarding'
import './App.css'
import { AvailabilityDemoScreen } from './screens/TempFeatures/Availability'
import { AllTicket } from './screens/TicketManager/AllTicket/AllTicket'
import React from 'react'
import { RegisterUserInfo } from './screens/Auth'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
          <Route
            path='/users/:id/account-setup'
            element={<RegisterUserInfo />}
          />
          <Route path='/availability' element={<AvailabilityDemoScreen />} />
          {/* <Route path="/projects/:id" element={<ProjectDetails />} /> */}
          <Route path='/users/:id/expired-link' element={<ExpiredLink />} />
          <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/users/onboarding' element={<Onboarding />} />
          <Route path='/users/:id/manager' element={<AllTicket />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
