import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Layout} from 'layout'
import {Landing} from 'screens/Landing/Landing'
// import { ProjectDetails } from 'screens/Projects';
import {RegisterUserInfo} from 'screens/Auth'
import {SignIn} from 'screens/Auth'
import {SignUp} from 'screens/Auth'
import {UserProfile} from 'screens/UserProfile'
import {EditProfile} from 'screens/UserProfile'

import './App.css'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/users/:id' element={<UserProfile />} />
          <Route path='/users/:id/edit' element={<EditProfile />} />
          <Route
            path='/users/:id/account-setup'
            element={<RegisterUserInfo />}
          />
          {/* <Route path="/projects/:id" element={<ProjectDetails />} /> */}
        </Routes>
      </Layout>
    </>
  )
}

export default App
