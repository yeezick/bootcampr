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
import { AllProjects, CreateProject, TaskManagement } from 'screens/Project'
import { ProjectDetails } from 'screens/Project/ProjectDetails/ProjectDetails'
import { Team } from 'screens/Project/ProjectDetails/Team'
import { AvailabilityDemoScreen } from 'screens/TempFeatures/Availability'
import { Calendar } from 'screens/Project/ProjectDetails/Calendar'
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
          <Route path='/users/:id/settings' element={<Settings />} />
          {/* Project */}
          <Route path='/all-projects' element={<AllProjects />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/project/:id/calendar' element={<Calendar />} />
          <Route path='/project/:id/details' element={<ProjectDetails />} />
          <Route path='/project/team' element={<Team />} />
          <Route
            path='/project/:id/task-management'
            element={<TaskManagement />}
          />
        </Routes>
      </Layout>
    </>
  )
}

export default App
