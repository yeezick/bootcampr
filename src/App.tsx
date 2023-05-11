import { Routes, Route } from 'react-router-dom'
import { Layout } from 'layout'
import { SignIn, SignUp } from 'screens/Auth'
import { EmailVerify, ExpiredLink } from 'screens/Auth'
import { Landing } from 'screens/Landing'
import { EditProfile, UserProfile } from 'screens/UserProfile'
import { Onboarding } from 'screens/Onboarding/Onboarding'
import './App.css'
import ProjectPage from 'screens/Project/ProjectPage'
import CreateProject from 'screens/Project/CreateProject'
import ProjectDetails from 'screens/Project/ProjectDetails'
import { AvailabilityDemoScreen } from 'screens/TempFeatures/Availability'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/ProjectPage' element={<ProjectPage />} />
          <Route path='/CreateProject' element={<CreateProject />} />
          <Route path='/project/:id' element={<ProjectDetails />} />
          <Route path='/' element={<Landing />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
          <Route path='/users/:id/expired-link' element={<ExpiredLink />} />
          <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/users/onboarding' element={<Onboarding />} />
          <Route path='/availability' element={<AvailabilityDemoScreen />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
