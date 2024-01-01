import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { ForgotPasswordLink } from 'screens/AccountSettings/components/ForgotPasswordLink'
import { handleFormInputChange } from 'utils/helpers'
import { toggleVisiblity } from '../Passwords'

export const CurrentPassword = ({
  formValues,
  name,
  setFormValues,
  disableErrorState = () => {},
  inputError = false,
}) => {
  const [inputType, setInputType] = useState('password')
  const inputId = 'currentPassword'

  const handlePasswordChange = e => {
    disableErrorState()
    handleFormInputChange(e, setFormValues)
  }

  const displayInputIcon = () => {
    if (inputError) {
      return <HiOutlineExclamationCircle />
    }

    if (!inputError && inputType === 'password') {
      return <VisibilityOff />
    } else {
      return <Visibility />
    }
  }

  const handleEyeconClick = () => {
    if (!inputError) {
      toggleVisiblity(inputType, setInputType)
    }
  }

  const inputClassname = inputError ? 'input-error' : ''
  const eyeconClassname = inputError ? 'error-icon' : 'eyecon'

  return (
    <>
      <form className='current-password container'>
        <label htmlFor={inputId}>Current password</label>
        <div className='current-password input-container'>
          <div className='current-password adorned-input'>
            <input
              id={inputId}
              className={inputClassname}
              name={name}
              required
              onChange={handlePasswordChange}
              type={inputType}
            />
            <IconButton
              className={`current-password ${eyeconClassname}`}
              aria-label='toggle password visibility'
              disableRipple={inputError}
              onClick={handleEyeconClick}
            >
              {displayInputIcon()}
            </IconButton>
          </div>
          {inputError && (
            <div className='current-password error-message'>
              Incorrect password
            </div>
          )}
        </div>
        <ForgotPasswordLink />
      </form>
    </>
  )
}
