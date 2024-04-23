import { Routes, Route } from 'react-router-dom'
import { AuthWrapper, Layout } from 'layout'
import {
  ChangePassword,
  EmailSentConfirmation,
  EmailVerify,
  ExpiredLink,
  ResetPassword,
  SignIn,
  SignUp,
} from 'screens/Auth'
import { Community, ContactUs, Enterprise, Landing } from 'screens/Landing'
import { EditProfile, UserProfile } from 'screens/UserProfile'
import { Onboarding } from 'screens/Onboarding/Onboarding'
import { ProjectCompletion } from './screens/ProjectCompletion/ProjectCompletion'
import { AllProjects, ProjectDetails, TeamMembers } from 'screens/Project'
import { CalendarScreen } from 'screens/Calendar/Calendar'
import { UpdateEmailConfirmation } from 'screens/Auth/EmailUpdate/UpdateEmailConfirmation'
import { SnackBarToast } from 'components/SnackBarToast/SnackBarToast'
import { WhatsNext } from 'screens/Onboarding/WhatsNext'
import { Account, Email } from 'screens/Auth/Settings'
import { SuccessScreen } from 'screens/SuccessScreen/SuccessScreen'
import { ChooseExperience, MaxUsers } from 'screens/Payment'
import './App.css'
import { EmailRouter } from 'components/EmailRouter/EmailRouter'
import { MobileGate } from 'screens/Auth/Mobile/MobileGate'
import { TaskBoard } from 'screens/Project/TaskManagement'
import { OAuthSuccess } from 'screens/Auth/SignIn/OAuthSuccess'

function App() {
  return (
    <>
      <AuthWrapper>
        <Layout>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/community' element={<Community />} />
            <Route path='/enterprise' element={<Enterprise />} />
            {/* Auth */}
            <Route path='/sign-up' element={<SignUp />} />
            <Route
              path='/sign-up/:id/confirmation-email-sent'
              element={<EmailSentConfirmation />}
            />
            <Route path='/success/:userId' element={<SuccessScreen />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-in/oauth-success' element={<OAuthSuccess />} />
            <Route path='/users/:id/expired-link' element={<ExpiredLink />} />
            <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
            <Route
              path='/users/:id/reset-password/:token'
              element={<ResetPassword />}
            />
            {/* Payment */}
            <Route path='/payment'>
              <Route path='choose-experience' element={<ChooseExperience />} />
              <Route path='max-users' element={<MaxUsers />} />
            </Route>
            {/* User */}
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path='/whats-next' element={<WhatsNext />} />
            <Route path='/users/:userId' element={<UserProfile />} />
            <Route path='/users/:id/edit' element={<EditProfile />} />
            <Route
              path='/users/:id/update-email-confirmation'
              element={<UpdateEmailConfirmation />}
            />
            <Route path='/notifications/:userId' element={<EmailRouter />} />
            <Route path='/users/:id/settings'>
              <Route path='email' element={<Email />} />
              <Route path='password' element={<ChangePassword />} />
              <Route path='account' element={<Account />} />
            </Route>
            {/* Project */}
            <Route path='/project'>
              <Route path=':projectId' element={<ProjectDetails />} />
              <Route
                path=':projectId/complete'
                element={<ProjectCompletion />}
              />
              <Route path=':projectId/calendar' element={<CalendarScreen />} />
              <Route path=':projectId/tasks' element={<TaskBoard />} />
              <Route path=':projectId/team' element={<TeamMembers />} />
            </Route>
            <Route path='/all-projects' element={<AllProjects />} />
            {/* TODO create 404 page */}
            <Route path='/mobile' element={<MobileGate />} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Routes>
        </Layout>
        <SnackBarToast />
      </AuthWrapper>
    </>
  )
}

export default App
