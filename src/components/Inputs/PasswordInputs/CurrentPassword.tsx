import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const inputElement = document.getElementById(inputId)

    const handleAutoFill = event => {
      if (event.animationName === 'onAutoFillStart') {
        handlePasswordChange({ target: inputElement })
      }
    }

    inputElement.addEventListener('animationstart', handleAutoFill)

    return () => {
      inputElement.removeEventListener('animationstart', handleAutoFill)
    }
  }, [])

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
    <div className='current-password'>
      <FormControl className='current-password container'>
        <label htmlFor={inputId}>Current password</label>
        <div className='current-password input-container'>
          <div className='current-password adorned-input'>
            <input
              aria-required
              id={inputId}
              className={inputClassname}
              name={name}
              required
              onChange={handlePasswordChange}
              type={inputType}
              autoComplete='current-password'
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
      </FormControl>
    </div>
  )
}
