import { Routes, Route } from 'react-router-dom'
import { Layout } from 'layout'
import {
  ChangePassword,
  EmailSentConfirmation,
  EmailVerify,
  ExpiredLink,
  ResetPassword,
  SignIn,
  SignUp,
} from 'screens/Auth'
import { Landing } from 'screens/Landing'
import { EditProfile, UserProfile } from 'screens/UserProfile'
import { Onboarding } from 'screens/Onboarding/Onboarding'
import { ProjectCompletion } from './screens/ProjectCompletion/ProjectCompletion'
import {
  AllProjects,
  ProjectDetails,
  TaskManagement,
  TeamMembers,
  UnassignedProject,
} from 'screens/Project'
import { CalendarScreen } from 'screens/Calendar/Calendar'
import { UpdateEmailConfirmation } from 'screens/Auth/EmailUpdate/UpdateEmailConfirmation'
import { SnackBarToast } from 'components/SnackBarToast/SnackBarToast'
import { AboutUs, HowTo } from 'screens/Landing'
import { Account, Email } from 'screens/Auth/Settings'
import { SuccessScreen } from 'screens/SuccessScreen/SuccessScreen'
import './App.css'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/how-to' element={<HowTo />} />
          {/* Auth */}
          <Route path='/sign-up' element={<SignUp />} />
          <Route
            path='/sign-up/:id/confirmation-email-sent'
            element={<EmailSentConfirmation />}
          />
          <Route path='/success/:userId' element={<SuccessScreen />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/users/:id/expired-link' element={<ExpiredLink />} />
          <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
          <Route
            path='/users/:id/reset-password/:token'
            element={<ResetPassword />}
          />
          {/* User */}
          <Route path='/onboarding/:id' element={<Onboarding />} />
          <Route path='/users/:userId' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
          <Route
            path='/users/:id/update-email-confirmation'
            element={<UpdateEmailConfirmation />}
          />
          <Route path='/users/:id/settings'>
            <Route path='email' element={<Email />} />
            <Route path='password' element={<ChangePassword />} />
            <Route path='account' element={<Account />} />
          </Route>
          {/* Project */}
          <Route path='/project'>
            <Route path=':projectId' element={<ProjectDetails />} />
            <Route path=':projectId/complete' element={<ProjectCompletion />} />
            <Route path=':projectId/calendar' element={<CalendarScreen />} />
            <Route path=':projectId/tasks' element={<TaskManagement />} />
            <Route path=':projectId/team' element={<TeamMembers />} />
            <Route path='unassigned' element={<UnassignedProject />} />
          </Route>
          <Route path='/all-projects' element={<AllProjects />} />
        </Routes>
      </Layout>
      <SnackBarToast />
    </>
  )
}

export default App
