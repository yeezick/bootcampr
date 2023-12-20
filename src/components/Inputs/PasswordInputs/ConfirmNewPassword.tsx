import { useState } from 'react'
import { handleFormInputChange, passwordInputLabel } from 'utils/helpers'
import {
  PasswordMatchError,
  handlePasswordMatching,
  toggleVisiblity,
} from '../Passwords'
import { IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const ConfirmNewPassword = ({
  password,
  passwordMatch,
  name,
  setFormValues,
  setPasswordMatch,
  passwordInputName,
}) => {
  const [inputType, setInputType] = useState('password')
  const inputId = 'confirmPassword'

  const handleConfirmPassword = e => {
    const { value } = e.target
    handleFormInputChange(e, setFormValues)
    handlePasswordMatching(value, password, setPasswordMatch)
  }

  const inputLabel = passwordInputLabel(
    passwordInputName,
    'Re-enter password',
    'Re-enter new password',
    'Re-enter new password'
  )

  return (
    <>
      <form className='confirm-password container'>
        <label htmlFor={inputId}>{inputLabel}</label>
        <div className='confirm-password adorned-input'>
          <input
            id={inputId}
            name={name}
            onChange={handleConfirmPassword}
            required
            type={inputType}
          />
          <IconButton
            className='confirm-password eyecon'
            aria-label='toggle password visibility'
            onClick={() => toggleVisiblity(inputType, setInputType)}
          >
            {inputType === 'password' ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
        <PasswordMatchError matchStatus={passwordMatch} />
      </form>
    </>
  )
}
