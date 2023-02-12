import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from 'utilities/redux/slices/users/userSlice'
import { getAllUsers } from 'utilities/api/users'
import { AiOutlineStop, AiOutlineCheckCircle } from 'react-icons/ai'

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
    <div className=''>
      <h1> landing screen </h1>
      <h2>
        Login as a random user using the button below <br /> Button is for devs
        who want to skip auth user flow
      </h2>
      <button onClick={randomUserLogin}>Login as random user</button>
      <LoginStatusSymbol />
    </div>
  )
}
