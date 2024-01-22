import './Role.scss'
import { useEffect, useState } from 'react'
import { updateUserProfile } from 'utils/api'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'
import { useParams } from 'react-router-dom'
import { PrimaryButton } from 'components/Buttons'

export const Role = ({ handlePageNavigation }) => {
  const dispatch = useDispatch()
  const [selectedRole, setSelectedRole] = useState('')
  const [buttonEnabled, setButtonEnabled] = useState(false)
  const params = useParams()

  const authUser = useAppSelector(selectAuthUser)

  const handleRoleSelect = event => {
    setSelectedRole(event.target.value)
    setButtonEnabled(true)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await updateUserProfile(params.id, {
        role: selectedRole,
      })
      dispatch(updateAuthUser(response.userProfile))
      setButtonEnabled(false)
      handlePageNavigation('next')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const { role } = authUser
    if (role) {
      setSelectedRole(role)
      setButtonEnabled(true)
    }
  }, [authUser])

  return (
    <div className='onboarding-container'>
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
                <p className='software-eng-p1'>
                  Software Engineer (should be comfortable with MERN/full stack)
                </p>
              </div>
            </label>
          </div>
          <div className='onboarding-button-section'>
            <PrimaryButton
              handler={handleSubmit}
              text='Set availability'
              paginatorBtn={true}
              isDisabled={!buttonEnabled}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
