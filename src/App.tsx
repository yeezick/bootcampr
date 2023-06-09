import { Routes, Route } from 'react-router-dom'
import { Layout } from 'layout'
import { EmailVerify, ExpiredLink, SignIn, SignUp } from 'screens/Auth'
import { Landing } from 'screens/Landing'
import { EditProfile, UserProfile } from 'screens/UserProfile'
import { Onboarding } from 'screens/Onboarding/Onboarding'
import { PaginatorExample } from 'components/Paginator/Examples/PaginatorExample'
import { AllProjects, CreateProject, ProjectDetails } from 'screens/Project'
import ProjectPage from 'screens/Project/ProjectPage' // revisit
import { AvailabilityDemoScreen } from 'screens/TempFeatures/Availability'
import { Calendar } from 'screens/Project/Calendar'
import './App.css'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing />} />
          {/* Auth */}
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/users/:id/expired-link' element={<ExpiredLink />} />
          <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
          {/* User */}
          <Route path='/availability' element={<AvailabilityDemoScreen />} />
          <Route path='/onboarding/:userId' element={<Onboarding />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
          {/* Todo: Remove once onboarding flow is complete */}
          <Route path='/paginator-example' element={<PaginatorExample />} />
          {/* Project */}
          <Route path='/all-projects' element={<AllProjects />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/project/:id' element={<ProjectDetails />} />
          <Route path='/project/:id/calendar' element={<Calendar />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
