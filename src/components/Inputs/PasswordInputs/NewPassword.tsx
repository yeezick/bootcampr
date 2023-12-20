import { useState } from 'react'
import { handleFormInputChange, passwordInputLabel } from 'utils/helpers'
import {
  PasswordCriteria,
  handlePasswordMatching,
  toggleVisiblity,
} from '../Passwords'
import { IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const NewPassword = ({
  formValues,
  name,
  passwordErrors,
  setFormValues,
  setPasswordErrors,
  setPasswordMatch,
  passwordInputName,
}) => {
  const [inputType, setInputType] = useState('password')
  const inputId = 'password'
  const passwordErrorMessages = {
    uppercase: '1 uppercase',
    lowercase: '1 lowercase',
    number: '1 number',
    length: 'Minimum 8 characters',
  }

  const handlePasswordChange = e => {
    const { value } = e.target
    handleFormInputChange(e, setFormValues)

    if (value.length === 0) {
      setPasswordErrors({
        length: 'neutral',
        uppercase: 'neutral',
        lowercase: 'neutral',
        number: 'neutral',
      })
    } else {
      setPasswordErrors({
        length:
          value.length < 8 && value.length >= 1
            ? 'criteria-not-met'
            : 'criteria-met',
        uppercase: /[A-Z]/.test(value) ? 'criteria-met' : 'criteria-not-met',
        lowercase: /[a-z]/.test(value) ? 'criteria-met' : 'criteria-not-met',
        number: /\d/.test(value) ? 'criteria-met' : 'criteria-not-met',
      })
    }

    handlePasswordMatching(formValues.confirmPassword, value, setPasswordMatch)
  }

  const PasswordValidations = ({ errors }) => {
    const { length, lowercase, number, uppercase } = errors
    return (
      <div className='password-errors'>
        {Object.keys(passwordErrorMessages).map(key => (
          <div key={key}>
            <PasswordCriteria
              criteria={passwordErrorMessages[key]}
              errorState={passwordErrors[key]}
            />
          </div>
        ))}
      </div>
    )
  }

  const inputLabel = passwordInputLabel(
    passwordInputName,
    'Password',
    'Enter new password',
    'New password'
  )

  return (
    <>
      <form className='new-password container'>
        <label htmlFor={inputId}>{inputLabel}</label>
        <div className='new-password adorned-input'>
          <input
            id={inputId}
            name={name}
            required
            onChange={handlePasswordChange}
            type={inputType}
          />
          <IconButton
            className='new-password eyecon'
            aria-label='toggle password visibility'
            onClick={() => toggleVisiblity(inputType, setInputType)}
          >
            {inputType === 'password' ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
        <PasswordValidations errors={passwordErrors} />
      </form>
    </>
  )
}
