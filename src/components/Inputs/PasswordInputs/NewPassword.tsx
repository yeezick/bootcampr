import { useEffect, useState } from 'react'
import { handleFormInputChange, passwordInputLabel } from 'utils/helpers'
import {
  PasswordCriteria,
  handlePasswordMatching,
  toggleVisiblity,
} from '../Passwords'
import { FormControl, IconButton } from '@mui/material'
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
  const [inputTouched, setInputTouched] = useState(false)
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

    setPasswordErrors({
      length:
        value.length < 8 && value.length >= 0 ? 'neutral' : 'criteria-met',
      uppercase: /[A-Z]/.test(value) ? 'criteria-met' : 'neutral',
      lowercase: /[a-z]/.test(value) ? 'criteria-met' : 'neutral',
      number: /\d/.test(value) ? 'criteria-met' : 'neutral',
    })

    handlePasswordMatching(formValues.confirmPassword, value, setPasswordMatch)
  }

  const handleValidatePassword = e => {
    const { value } = e.target
    handleFormInputChange(e, setFormValues)

    setPasswordErrors({
      length: value.length >= 8 ? 'criteria-met' : 'criteria-not-met',
      uppercase: /[A-Z]/.test(value) ? 'criteria-met' : 'criteria-not-met',
      lowercase: /[a-z]/.test(value) ? 'criteria-met' : 'criteria-not-met',
      number: /\d/.test(value) ? 'criteria-met' : 'criteria-not-met',
    })

    handlePasswordMatching(formValues.confirmPassword, value, setPasswordMatch)
  }

  useEffect(() => {
    const inputElement = document.getElementById(inputId)

    const handleInput = event => {
      if (event.inputType === 'insertText') {
        handlePasswordChange({ target: inputElement })
      }
    }

    inputElement.addEventListener('input', handleInput)

    return () => {
      inputElement.removeEventListener('input', handleInput)
    }
  }, [])

  const PasswordValidations = ({ errors }) => {
    const { length, lowercase, number, uppercase } = errors
    return (
      <div className='password-errors'>
        {Object.keys(passwordErrorMessages).map(key => (
          <div key={key}>
            {inputTouched && (
              <PasswordCriteria
                criteria={passwordErrorMessages[key]}
                errorState={passwordErrors[key]}
              />
            )}
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
    <div className='new-password'>
      <FormControl className='new-password container'>
        <label htmlFor={inputId}>{inputLabel}</label>
        <div className='new-password adorned-input'>
          <input
            aria-required
            id={inputId}
            name={name}
            required
            onChange={handlePasswordChange}
            type={inputType}
            autoComplete='password'
            onFocus={() => setInputTouched(true)}
            onBlur={handleValidatePassword}
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
      </FormControl>
    </div>
  )
}
