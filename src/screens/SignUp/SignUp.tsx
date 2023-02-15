import {
  register,
  reset,
  uiStatus,
} from '../../utilities/redux/slices/users/userSlice'
import React, { useEffect, useState } from 'react'
import { SignUpInterface } from '../../utilities/types/UserInterface'
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import { FaInfoCircle } from 'react-icons/fa'
import './SignUp.scss'
import { emptySignUp } from '../../utilities/data/userConstants'
import { AlertBanners } from '../../utilities/types/AccountSettingsInterface'
import { GoAlert } from 'react-icons/go'

type PasswordMatchCases = null | boolean

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const [inputType, setInputType] = useState('password')
  const [passwordsMatch, togglePasswordsMatch] =
    useState<PasswordMatchCases>(null)
  const [formValues, setFormValues] = useState<SignUpInterface>(emptySignUp)
  const { confirmPassword, email, firstName, lastName, password } = formValues
  const [alertBanner, setAlertBanner] = useState<AlertBanners>({
    status: false,
    text: '',
  })

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

  const passwordReveal = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password')
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
          <div className='form-input'>
            <label>First Name</label>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              onChange={handleChange}
              value={firstName}
              autoComplete='off'
              required
            />
          </div>

          <div className='form-input'>
            <label>Last Name</label>
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              onChange={handleChange}
              value={lastName}
              autoComplete='off'
              required
            />
          </div>

          <div className='form-input'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              onChange={handleChange}
              value={email}
              autoComplete='off'
              required
            />
          </div>

          <div className='pwd-input'>
            <div>
              <label>Password</label>
              {inputType === 'password' ? (
                <BsEyeSlash
                  onClick={passwordReveal}
                  className='pwd-reveal-gray'
                />
              ) : (
                <BsEyeFill onClick={passwordReveal} className='pwd-reveal' />
              )}
              <input
                type={inputType}
                name='password'
                placeholder='Password'
                onChange={handleChange}
                value={password}
                autoComplete='off'
              />
            </div>
          </div>

          <div className='form-input'>
            <label>Confirm Password</label>
            <input
              type={inputType}
              name='confirmPassword'
              placeholder='Confirm Password'
              onChange={handleChange}
              value={confirmPassword}
              autoComplete='off'
            />
          </div>

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
