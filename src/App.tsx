import { Routes, Route } from 'react-router-dom'
import { Layout } from 'layout'
import { SignIn, SignUp } from 'screens/Auth'
import { EmailVerify, ExpiredLink } from 'screens/Auth'
import { Landing } from 'screens/Landing'
import { EditProfile, UserProfile } from 'screens/UserProfile'
import { Onboarding } from 'screens/Onboarding/Onboarding'
import './App.css'
import { AllTicket } from './screens/TicketManager/AllTicket/AllTicket'
import HomePage from 'screens/HomePage/HomePage'
import CreateProject from 'screens/CreateProject/CreateProject'
import ProjectDetails from 'screens/ProjectDetails/ProjectDetails'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/CreateProject' element={<CreateProject />} />
          <Route path='/project/:id' element={<ProjectDetails />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
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
