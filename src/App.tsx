import { Routes, Route } from 'react-router-dom'
import { Layout } from 'layout'
import { SignIn, SignUp } from 'screens/Auth'
import { EmailVerify } from 'screens/Auth'
import { Landing } from 'screens/Landing'
import { EditProfile, UserProfile } from 'screens/UserProfile'
import { Onboarding } from 'screens/Onboarding/Onboarding'
import './App.css'
import { useEffect } from 'react'
import { verify } from 'utils/api/users'
import { useDispatch } from 'react-redux'
import { ExpiredLink } from 'screens/Auth/ExpiredLink/ExpiredLink'
import { AllTicket } from 'screens/TicketManager/AllTicket/AllTicket'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'
import { RegisterUserInfo } from './screens/Auth/RegisterUserInfo/RegisterUserInfo'

function App() {
  const dispatch = useDispatch()
  const authUser = useAppSelector(selectAuthUser)

  useEffect(() => {
    const persist = async () => {
      const user = await verify()
      dispatch(updateAuthUser)
    }
    persist()
  }, [])

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
          <Route path='/users/:id/manager' element={<AllTicket />} />
          <Route
            path='/users/:id/account-setup'
            element={<RegisterUserInfo />}
          />
          <Route path='/users/:id/expired-link' element={<ExpiredLink />} />
          <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/users/onboarding' element={<Onboarding />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
