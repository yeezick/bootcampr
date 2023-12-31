import { useEffect, useState } from 'react'
import { handleFormInputChange, passwordInputLabel } from 'utils/helpers'
import {
  PasswordMatchError,
  handlePasswordMatching,
  toggleVisiblity,
} from '../Passwords'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FaExclamationCircle } from 'react-icons/fa'
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

  return (
    <form className='confirm-password container'>
      <label htmlFor={inputId}>{inputLabel}</label>
      <div className='confirm-password adorned-input'>
        <input
          id={inputId}
          name={name}
          onChange={handleConfirmPassword}
          required
          type={inputType}
          style={{
            borderColor: isValid === false ? '#d32f2f' : '',
          }}
        />
        {isValid === false ? (
          <InputAdornment position='end'>
            <div className='pwd-mismatch-icon'>
              <FaExclamationCircle
                size={18}
                color='white'
                aria-label='validation error'
              />
            </div>
          </InputAdornment>
        ) : (
          <IconButton
            className='confirm-password eyecon'
            aria-label='toggle password visibility'
            onClick={() => toggleVisiblity(inputType, setInputType)}
          >
            {inputType === 'password' ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )}
      </div>
      <PasswordMatchError matchStatus={passwordMatch} />
    </form>
  )
}
