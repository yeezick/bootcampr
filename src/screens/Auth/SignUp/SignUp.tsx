import React, { useEffect, useRef, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { GoAlert } from 'react-icons/go'
import { register, reset, uiStatus } from 'utilities/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utilities/redux/hooks'
import { SignUpInterface } from 'interfaces/UserInterface'
import { AlertBanners } from 'interfaces/AccountSettingsInterface'
import { emptySignUp } from 'utilities/data/userConstants'
import { Email, Text, Password } from 'components/Inputs'
import './SignUp.scss'

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
          <Text
            inputRef={firstNameRef}
            label='First Name'
            name='firstName'
            onChange={handleChange}
            required
            value={firstName}
          />

          <Text
            inputRef={lastNameRef}
            label='Last Name'
            name='lastName'
            onChange={handleChange}
            required
            value={lastName}
          />

          <Email
            helperText='(ex. jeanine@bootcampr.io)'
            inputRef={emailRef}
            label='Email'
            name='email'
            onChange={handleChange}
            required
            value={email}
          />

          {/* Need to remove type from passwords, should look into moving all
              password logic into its component.  */}
          <Password
            helperText='(Min 8 characters, 1 upper, 1 lower, 1 symbol)'
            inputRef={passwordRef}
            label='Password'
            name='password'
            onChange={handleChange}
            setInputType={setPasswordInputType}
            inputType={passwordInputType}
            required
            type={passwordInputType}
            value={password}
          />

          <Password
            inputRef={confirmPasswordRef}
            label='Re-enter Password'
            name='confirmPassword'
            onChange={handleChange}
            setInputType={setConfirmPasswordInputType}
            inputType={confirmPasswordInputType}
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
