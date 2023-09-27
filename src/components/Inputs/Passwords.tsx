import { useState } from 'react'
import { FormControl, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { PasswordInputProps } from 'interfaces/components/Input'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'
import { ForgotPasswordModal } from 'screens/Auth/ResetPassword/ForgotPasswordModal'

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
    <div className='passwords-wrapper'>
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

  return (
    <div className='password'>
      <FormControl variant='standard'>
        <label htmlFor={inputId}>
          {passwordInputName === 'sign-up' ? 'Password' : 'New Password'}
        </label>
        <div className='adorned-input'>
          <input
            id={inputId}
            name={name}
            required
            onChange={handlePasswordChange}
            type={inputType}
          />
          <IconButton
            className='eyecon'
            aria-label='toggle password visibility'
            onClick={() => toggleVisiblity(inputType, setInputType)}
          >
            {inputType === 'password' ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>
        <PasswordValidations errors={passwordErrors} />
      </FormControl>
    </div>
  )
}

export const ConfirmPassword = ({
  password,
  passwordMatch,
  name,
  setFormValues,
  setPasswordMatch,
}) => {
  const [inputType, setInputType] = useState('password')
  const inputId = 'confirmPassword'

  const handleConfirmPassword = e => {
    const { value } = e.target
    handleFormInputChange(e, setFormValues)
    handlePasswordMatching(value, password, setPasswordMatch)
  }

  return (
    <div className='confirm-password'>
      <FormControl variant='standard'>
        <label htmlFor={inputId}>Re-enter password</label>
        <div className='adorned-input'>
          <input
            id={inputId}
            name={name}
            onChange={handleConfirmPassword}
            required
            type={inputType}
          />
          <IconButton
            className='eyecon'
            aria-label='toggle password visibility'
            onClick={() => toggleVisiblity(inputType, setInputType)}
          >
            {inputType === 'password' ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>
        <PasswordMatchError matchStatus={passwordMatch} />
      </FormControl>
    </div>
  )
}

/* Helpers */
const PasswordMatchError = ({ matchStatus }) => {
  if (matchStatus === null) {
    return
  } else if (matchStatus) {
    return <p className='password-criteria criteria-met'>Passwords match!</p>
  } else {
    return (
      <p className='password-criteria criteria-not-met'>
        Passwords do not match.
      </p>
    )
  }
}

const toggleVisiblity = (inputType, setInputType) => {
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
        <div>
          <img src='/check.png' className='criteria-check' />
        </div>
      )}
      <p className={errorState}>{criteria}</p>
    </div>
  )
}

export const CurrentPassword = ({ formValues, name, setFormValues }) => {
  const [inputType, setInputType] = useState('currentPassword')
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
  const inputId = 'currentPassword'

  const handlePasswordChange = e => {
    handleFormInputChange(e, setFormValues)
  }

  const openModal = () => {
    setForgotPasswordModal(!forgotPasswordModal)
  }

  const closeModal = () => {
    setForgotPasswordModal(false)
  }

  return (
    <div className='password'>
      <FormControl variant='standard'>
        <label htmlFor={inputId}>Current Password</label>
        <div className='adorned-input'>
          <input
            id={inputId}
            name={name}
            required
            onChange={handlePasswordChange}
            type={inputType}
          />
          <IconButton
            className='eyecon'
            aria-label='toggle password visibility'
            onClick={() => toggleVisiblity(inputType, setInputType)}
          >
            {inputType === 'password' ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>
      </FormControl>
      <div id='forgot-password-link' onClick={openModal}>
        Forgot Password?
      </div>
      {forgotPasswordModal && (
        <ForgotPasswordModal
          onClose={closeModal}
          onSuccessMessage='Email sent!'
          onFailureMessage='An error occurred. Please check entered email and try again.'
        />
      )}
    </div>
  )
}
