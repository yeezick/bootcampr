import { Routes, Route } from 'react-router-dom'
import { Layout } from 'layout'
import {
  EmailVerify,
  ExpiredLink,
  Settings,
  SignIn,
  SignUp,
} from 'screens/Auth'
import { Landing } from 'screens/Landing'
import { EditProfile, UserProfile } from 'screens/UserProfile'
import { Onboarding } from 'screens/Onboarding/Onboarding'
import { PaginatorExample } from 'components/Paginator/Examples/PaginatorExample'
import { AllProjects, CreateProject, ProjectDetails } from 'screens/Project'
import { AvailabilityDemoScreen } from 'screens/TempFeatures/Availability'
import { CalendarScreen } from 'screens/Calendar/Calendar'
import './App.css'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about-us' element />
          <Route path='/how-to' element />
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
          <Route path='/users/:id/settings' element={<Settings />} />
          {/* Todo: Remove once onboarding flow is complete */}
          <Route path='/paginator-example' element={<PaginatorExample />} />
          {/* Project */}
          <Route path='/all-projects' element={<AllProjects />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/project/:id' element={<ProjectDetails />} />
          <Route path='/project-portal' element />
          <Route path='/project/:id/calendar' element={<CalendarScreen />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
