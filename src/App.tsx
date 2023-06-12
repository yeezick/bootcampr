import { Routes, Route } from 'react-router-dom'
import { Layout } from 'layout'
import { SignIn, SignUp } from 'screens/Auth'
import { EmailVerify, ExpiredLink } from 'screens/Auth'
import { Landing } from 'screens/Landing'
import { EditProfile, UserProfile } from 'screens/UserProfile'
import { Onboarding } from 'screens/Onboarding/Onboarding'
import { PaginatorExample } from 'components/Paginator/Examples/PaginatorExample'
import './App.css'
import ProjectPage from 'screens/Project/ProjectPage'
import CreateProject from 'screens/Project/CreateProject'
import ProjectDetails from 'screens/Project/ProjectDetails'
import { AvailabilityDemoScreen } from 'screens/TempFeatures/Availability'
import { PaginatorOnboarding } from 'components/Paginator/Onboarding/PaginatorOnboarding'

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
          <Route path='/availability' element={<AvailabilityDemoScreen />} />
          <Route path='/onboarding/:userId' element={<Onboarding />} />
          {/* Todo: Remove once onboarding flow is complete */}
          <Route path='/paginator-example' element={<PaginatorExample />} />
          <Route
            path='/paginator-onboarding'
            element={<PaginatorOnboarding />}
          />
        </Routes>
      </Layout>
    </>
  )
}

export default App
