import { useEffect, useState } from 'react'
import { handleFormInputChange, passwordInputLabel } from 'utils/helpers'
import {
  PasswordMatchError,
  handlePasswordMatching,
  toggleVisiblity,
} from '../Passwords'
import { FormControl, IconButton } from '@mui/material'
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
  const [isValid, setIsValid] = useState(true)
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

  useEffect(() => {
    if (passwordMatch === false) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [passwordMatch])

  useEffect(() => {
    const inputElement = document.getElementById(inputId)

    const handleInput = event => {
      if (event.inputType === 'insertText') {
        handleConfirmPassword({ target: inputElement })
      }
    }

    inputElement.addEventListener('input', handleInput)

    return () => {
      inputElement.removeEventListener('input', handleInput)
    }
  }, [])

  return (
    <div className='confirm-password'>
      <FormControl className='confirm-password container'>
        <label htmlFor={inputId}>{inputLabel}</label>
        <div className='confirm-password adorned-input'>
          <input
            aria-required
            id={inputId}
            name={name}
            required
            onChange={handleConfirmPassword}
            type={inputType}
            autoComplete='confirmPassword'
            style={{
              borderColor: !isValid ? '#d32f2f' : '',
            }}
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
      </FormControl>
    </div>
  )
}
