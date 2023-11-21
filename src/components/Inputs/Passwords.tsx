import { useState } from 'react'
import { IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { PasswordInputProps } from 'interfaces/components/Input'
import {
  handleFormInputChange,
  passwordInputLabel,
} from 'utils/helpers/stateHelpers'
import { ForgotPasswordLink } from 'screens/AccountSettings/components/ForgotPasswordLink'
import { MdCheck } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export const PasswordInputs = (props: PasswordInputProps) => {
  const [passwordMatch, setPasswordMatch] = useState(null)
  const { passwordInputName } = props
  const propsWithPasswordMatch = {
    ...props,
    passwordMatch,
    setPasswordMatch,
    passwordInputName,
  }

  return (
    <div className='password-inputs-wrapper'>
      {passwordInputName === 'settings-pwd-reset' && (
        <CurrentPassword {...propsWithPasswordMatch} name='currentPassword' />
      )}
      <Password {...propsWithPasswordMatch} name='password' />
      <ConfirmPassword {...propsWithPasswordMatch} name='confirmPassword' />
    </div>
  )
}

export const Password = ({
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

export const ConfirmPassword = ({
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

/* Helpers */
const PasswordMatchError = ({ matchStatus }) => {
  if (matchStatus === null) {
    return
  } else if (matchStatus) {
    return (
      <div className='match-status'>
        <MdCheck className='criteria-check' size={14} />
        <p className='password-criteria criteria-met'>Passwords match!</p>
      </div>
    )
  } else {
    return (
      <div className='match-status'>
        <RxCross2 className='criteria-cross' size={14} />
        <p className='password-criteria criteria-not-met'>
          Passwords don't match
        </p>
      </div>
    )
  }
}

export const toggleVisiblity = (inputType, setInputType) => {
  if (inputType === 'password') setInputType('text')
  else setInputType('password')
}

const handlePasswordMatching = (
  confirmPassword,
  password,
  setPasswordMatch
) => {
  if (password === '' || confirmPassword === '') {
    setPasswordMatch(null)
  } else if (password === confirmPassword) {
    setPasswordMatch(true)
  } else {
    setPasswordMatch(false)
  }
}

const PasswordCriteria = ({ criteria, errorState = 'neutral' }) => {
  return (
    <div className='password-criteria'>
      {errorState === 'criteria-met' && (
        <MdCheck className='criteria-check' size={14} />
      )}
      {errorState === 'criteria-not-met' && (
        <RxCross2 className='criteria-cross' size={14} />
      )}
      <p className={errorState}>{criteria}</p>
    </div>
  )
}

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
