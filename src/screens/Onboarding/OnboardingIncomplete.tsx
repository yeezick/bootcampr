import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser, updateProfile } from 'utils/redux/slices/userSlice'

export const OnboardingIncomplete = () => {
  const [selectedRole, setSelectedRole] = useState(null)
  const [buttonEnabled, setButtonEnabled] = useState(false)

  const authUser = useAppSelector(selectAuthUser)
  console.log(authUser, 'authUser')

  const handleRoleSelect = event => {
    setSelectedRole(event.target.value)
    setButtonEnabled(true)
  }

  return (
    <div className='onboarding-container'>
      <h1>Welcome {authUser.firstName}</h1>
      <p>Let's start with information we'll use to best match project teams.</p>
      <h2>First, tell us your role.</h2>
      <p>
        Please note that you should feel comfortable performing the duties of
        your role from the project inception to completion.
      </p>
      <h2>I am a...</h2>
      <ul>
        <li>
          <label>
            <input
              type='radio'
              name='role'
              value='UX Designer'
              onChange={handleRoleSelect}
            />
            UX Designer
          </label>
        </li>
        <li>
          <label>
            <input
              type='radio'
              name='role'
              value='Software Engineer'
              onChange={handleRoleSelect}
            />
            Software Engineer
          </label>
        </li>
      </ul>
      <button
        style={{ backgroundColor: buttonEnabled ? 'orange' : 'light gray' }}
        disabled={!buttonEnabled}
      >
        Set availability
      </button>
    </div>
  )
}

/*handleclick and link to next page */
