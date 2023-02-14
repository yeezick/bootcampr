import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../../utilities/redux/slices/users/userSlice'
import { getAllUsers } from '../../utilities/api/users'
import { AiOutlineStop, AiOutlineCheckCircle } from 'react-icons/ai'
import { SignUp } from 'screens/Auth/SignUp/SignUp'
import './Landing.scss'

export const Landing: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<boolean | null>(null)
  const dispatch = useDispatch()

  const randomUserLogin = async () => {
    const gettingAllUser = await getAllUsers()
    if (gettingAllUser) {
      dispatch(setAuthUser(gettingAllUser[2]))
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }

  const LoginStatusSymbol: React.FC = () => {
    if (loginStatus === true) {
      return <AiOutlineCheckCircle />
    } else if (loginStatus === false) {
      return <AiOutlineStop />
    } else {
      return <></>
    }
  }

  return (
    <div className='landing-container'>
      <div className='header-container'>
        <div className='header-grid'>
          <h1>Surpass Your Competition In The Tech Job Market</h1>
          <p>
            A platform to collaborate on real-world projects! Don't wait to
            build your development experience.
          </p>
          <Link to='/sign-up'>Start Today!</Link>
        </div>
        <div className='developer-grid'>
          <h1> For UX & Developers Only! </h1>
          <h2>
            Login as a random user using the button below <br /> Button is for
            devs who want to skip auth user flow
          </h2>
          <button onClick={randomUserLogin}>Login as random user</button>
          <LoginStatusSymbol />
        </div>
      </div>
      <div className='middle-container'>
        <img src='https://www.springboard.com/blog/wp-content/uploads/2020/07/what-does-a-software-engineer-do.png' />
        <>
          <SignUp />
        </>
      </div>
    </div>
  )
}
