import React, { useState } from 'react'
import { updateUser } from 'utils/api'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  updateProfile,
  updateAuthUser,
} from 'utils/redux/slices/userSlice'
import { FiArrowRight } from 'react-icons/fi'

export const OnboardingIncomplete = ({ handlePageNavigation }) => {
  const dispatch = useAppDispatch()
  const [selectedRole, setSelectedRole] = useState('')
  const [buttonEnabled, setButtonEnabled] = useState(false)

  const authUser = useAppSelector(selectAuthUser)

  const handleRoleSelect = event => {
    setSelectedRole(event.target.value)
    setButtonEnabled(true)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await updateUser(authUser._id, { role: selectedRole })

      dispatch(updateAuthUser(response))

      setButtonEnabled(false)
    } catch (error) {
      console.error(error)
    }
    handlePageNavigation('next')
  }

  return (
    <div className='onboarding-incomplete-container'>
      <div className='onboarding-incomplete-text-container'>
        <div className='welcome-container'>
          <h1>Welcome, {authUser.firstName}!</h1>
          <p>
            Let's start with information we'll use to best match project teams.
          </p>
        </div>

        <div className='role-selection-container'>
          <h2 className='tell-role'>First, tell us your role.</h2>
          <p>
            Please note that you should feel comfortable performing the duties
            of your role from the project inception to completion.
          </p>

          <h2 className='select-role'>I am a...</h2>
          <form className='onboarding-form-container'>
            <div className='radio-btn'>
              <label>
                <input
                  type='radio'
                  name='role'
                  value='UX Designer'
                  checked={selectedRole === 'UX Designer'}
                  onChange={handleRoleSelect}
                />
                UX Designer
              </label>

              <label className='software-engineer-btn'>
                <input
                  type='radio'
                  name='role'
                  value='Software Engineer'
                  checked={selectedRole === 'Software Engineer'}
                  onChange={handleRoleSelect}
                />
                Software Engineer
              </label>
            </div>

            <div className='software-engineer-msg'>
              <p>*SWEs should have MERN/full stack experience </p>
            </div>

            <div className='onboarding-button-section'>
              <button
                type='submit'
                style={{
                  backgroundColor: buttonEnabled ? 'orange' : 'light gray',
                }}
                disabled={!buttonEnabled}
                onClick={handleSubmit}
                className='onboarding-incomplete-btn'
              >
                <p>Set availability </p> <FiArrowRight className='arrow-icon' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
