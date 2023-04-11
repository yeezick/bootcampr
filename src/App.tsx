import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from 'layout'
import { Landing } from 'screens/Landing/Landing'
// import { ProjectDetails } from 'screens/Projects';
import { RegisterUserInfo } from 'screens/Auth'
import { SignIn } from 'screens/Auth'
import { SignUp } from 'screens/Auth'
import { UserProfile } from 'screens/UserProfile'
import { EditProfile } from 'screens/UserProfile'
import { EmailVerify } from 'screens/Auth/EmailVerify/EmailVerify'
import './App.css'
import { useEffect } from 'react'
import { verify } from 'utilities/api/users'
import { useDispatch } from 'react-redux'
import { updateAuthUser } from 'utilities/redux/slices/users/userSlice'
import { ExpiredLink } from 'screens/Auth/ExpiredLink/ExpiredLink'
import { AllTicket } from 'screens/TicketManager/AllTicket/AllTicket'
import { selectAuthUser } from 'utilities/redux/slices/users/userSlice'
import { useAppDispatch, useAppSelector } from 'utilities/redux/hooks'

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
          <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/users/:id/expired-link' element={<ExpiredLink />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
          <Route path='/users/:id/manager' element={<AllTicket />} />
          <Route
            path='/users/:id/account-setup'
            element={<RegisterUserInfo />}
          />
        </Routes>
      </Layout>
    </>
  )
}

export default App
