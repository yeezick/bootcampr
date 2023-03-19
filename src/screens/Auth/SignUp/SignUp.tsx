import { register, reset, uiStatus } from 'utilities/redux/slices/userSlice'
import React, { useEffect, useRef, useState } from 'react'
import { SignUpInterface } from 'utilities/types/UserInterface'
import { useAppDispatch, useAppSelector } from 'utilities/redux/hooks'
import { FaInfoCircle } from 'react-icons/fa'
import './SignUp.scss'
import { emptySignUp } from 'utilities/data/userConstants'
import { AlertBanners } from 'utilities/types/AccountSettingsInterface'
import { GoAlert } from 'react-icons/go'
import { Input } from 'components/Input/Input'

type PasswordMatchCases = null | boolean

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const [passwordInputType, setPasswordInputType] = useState('password')
  const [confirmPasswordInputType, setConfirmPasswordInputType] =
    useState('password')
  const [passwordsMatch, togglePasswordsMatch] =
    useState<PasswordMatchCases>(null)
  const [formValues, setFormValues] = useState<SignUpInterface>(emptySignUp)
  const { confirmPassword, email, firstName, lastName, password } = formValues
  const [alertBanner, setAlertBanner] = useState<AlertBanners>({
    status: false,
    text: '',
  })

  const confirmPasswordRef = useRef(null)
  const emailRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    if (status.isSuccess) {
      dispatch(reset())
      setFormValues(emptySignUp)
      setAlertBanner({ status: true })
      togglePasswordsMatch(null)
    }
  }, [status.isSuccess, dispatch])

  useEffect(() => {
    if (password.length === 0 || confirmPassword.length === 0) {
      togglePasswordsMatch(null)
    } else if (password !== confirmPassword) {
      togglePasswordsMatch(false)
    } else {
      togglePasswordsMatch(true)
    }
  }, [password, confirmPassword])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validForm = await dispatch(register(formValues))
    const { payload } = validForm

    if (payload.invalidCredentials && payload.existingAccount) {
      setAlertBanner({
        status: true,
        text: payload.message,
        icon: <GoAlert />,
        type: 'warning',
      })
    } else {
      setAlertBanner({
        status: true,
        text: payload.message,
        icon: <FaInfoCircle />,
        type: 'info',
      })
    }
    setTimeout(() => {
      setAlertBanner({ status: false })
    }, 16000)
  }

  const validateForm = () => {
    if (!passwordsMatch) return true
    for (const value of Object.values(formValues)) {
      if (!value) return true
    }
  }

  const PasswordMatchStatus: React.FC | null = () => {
    switch (passwordsMatch) {
      case true:
        return <h4 className='pwd-match'>Passwords match!</h4>
      case false:
        return <h4 className='pwd-mismatch'>Passwords do not match</h4>
      default:
        return null
    }
  }

  return (
    <div>
      {alertBanner.status ? (
        <div className={alertBanner.type}>
          {alertBanner.icon}
          <p>{alertBanner.text}</p>
        </div>
      ) : null}

      <div className='signup-container'>
        <h3>User Register</h3>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <Input
            autoComplete='off'
            inputRef={firstNameRef}
            label='First Name'
            name='firstName'
            onChange={handleChange}
            placeholder='First Name'
            required
            type='text'
            value={firstName}
          />

          <Input
            autoComplete='off'
            inputRef={lastNameRef}
            label='Last Name'
            name='lastName'
            onChange={handleChange}
            placeholder='Last Name'
            required
            type='text'
            value={lastName}
          />

          <Input
            autoComplete='off'
            inputRef={emailRef}
            label='Email'
            name='email'
            onChange={handleChange}
            placeholder='Email'
            required
            type='email'
            value={email}
          />

          <Input
            autoComplete='off'
            inputRef={passwordRef}
            label='Password'
            name='password'
            onChange={handleChange}
            passwordProps={{
              setInputType: setPasswordInputType,
              inputType: passwordInputType,
            }}
            placeholder='Password'
            required
            type={passwordInputType}
            value={password}
          />

          <Input
            autoComplete='off'
            inputRef={confirmPasswordRef}
            label='Confirm Password'
            name='confirmPassword'
            onChange={handleChange}
            passwordProps={{
              setInputType: setConfirmPasswordInputType,
              inputType: confirmPasswordInputType,
            }}
            placeholder='Confirm Password'
            required
            type={confirmPasswordInputType}
            value={confirmPassword}
          />

          <div className='form-btn'>
            <button type='submit' disabled={validateForm()}>
              Create Account
            </button>
          </div>
        </form>
        <PasswordMatchStatus />
      </div>
    </div>
  )
}
