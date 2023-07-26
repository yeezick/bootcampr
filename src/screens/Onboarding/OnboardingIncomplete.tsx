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
      handlePageNavigation('next')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='onboarding-incomplete-container'>
      <form className='onboarding-form-container'>
        <div className='welcome-container'>
          <h1>Welcome, {authUser.firstName}!</h1>
          <p>
            Let's start with information we'll use to best match project teams.
          </p>
        </div>
        <div className='role-selection-container'>
          <div className='role-title-explanation'>
            <div>
              <h2 className='tell-role'>First, tell us your role.</h2>
            </div>
            <div className='tell-role-content'>
              <p>
                Please note that you should feel comfortable performing the
                duties of your role from project inception to completion.
              </p>
            </div>
          </div>
          <div>
            <h2 className='select-role'>I am a...</h2>
          </div>
          <div className='radio-btn'>
            <label className='ux-designer-btn'>
              <input
                type='radio'
                name='role'
                value='UX Designer'
                checked={selectedRole === 'UX Designer'}
                onChange={handleRoleSelect}
              />
              <div>
                <p>UX Designer</p>
              </div>
            </label>
            <label className='software-engineer-btn'>
              <input
                type='radio'
                name='role'
                value='Software Engineer'
                checked={selectedRole === 'Software Engineer'}
                onChange={handleRoleSelect}
              />
              <div>
                <p className='software-eng-p1'>Software Engineer</p>
                <p className='software-eng-p2'>
                  *SWEs should have MERN/full stack experience
                </p>
              </div>
            </label>
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
              id='set-availability'
            >
              <p>Set availability </p> <FiArrowRight className='arrow-icon' />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
