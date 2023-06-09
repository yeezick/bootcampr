import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthUser } from 'utils/redux/slices/userSlice'
import { getAllUsers } from 'utils/api/users'
import { AiOutlineStop, AiOutlineCheckCircle } from 'react-icons/ai'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { getRandomInt } from 'screens/AccountSettings/helper/data'
import './Landing.scss'

export const Landing: React.FC = () => {
  const [loginStatus, setLoginStatus] = useState<boolean | null>(null)
  const authUser = useAppSelector(selectAuthUser)

  const dispatch = useDispatch()

  const randomUserLogin = async () => {
    if (authUser._id) {
      console.log('User already logged in')
      return
    }

    try {
      const gettingAllUser = await getAllUsers()
      if (gettingAllUser && gettingAllUser.length > 0) {
        const randomUser = gettingAllUser[getRandomInt(gettingAllUser.length)]
        dispatch(setAuthUser(randomUser))
        setLoginStatus(true)
      } else {
        setLoginStatus(false)
      }
    } catch (err) {
      console.error('Unable to set random user:', err)
      setLoginStatus(false)
    }
  }

  useEffect(() => {
    authUser._id ? setLoginStatus(true) : setLoginStatus(false)
  }, [authUser._id])

  const LoginStatusSymbol: React.FC = () => {
    if (loginStatus === true && authUser._id) {
      return <AiOutlineCheckCircle className='logged-in' />
    } else {
      return <AiOutlineStop className='logged-out' />
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
    </div>
  )
}
