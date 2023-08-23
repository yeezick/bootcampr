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
import { AllProjects, CreateProject, ProjectDetails } from 'screens/Project'
import { AvailabilityDemoScreen } from 'screens/TempFeatures/Availability'
import { CalendarScreen } from 'screens/Calendar/Calendar'
import './App.css'
import { UpdateEmailConfirmation } from 'screens/Auth/EmailUpdate/UpdateEmailConfirmation'
import { SnackBarToast } from 'components/SnackBarToast/SnackBarToast'
import { UnassignedProject } from 'screens/Project/UnassignedProject'

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
          <Route
            path='/users/:id/update-email-confirmation'
            element={<UpdateEmailConfirmation />}
          />
          <Route path='/users/:id/settings/:screen' element={<Settings />} />
          <Route path='/users/:id/settings' element={<Settings />} />
          {/* Project */}
          <Route path='/all-projects' element={<AllProjects />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/project/:id' element={<ProjectDetails />} />
          <Route path='/project/:id/calendar' element={<CalendarScreen />} />
          <Route path='/project/unassigned' element={<UnassignedProject />} />
        </Routes>
      </Layout>
      <SnackBarToast />
    </>
  )
}

export default App
