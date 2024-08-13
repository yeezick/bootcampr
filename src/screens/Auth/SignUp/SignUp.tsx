import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaInfoCircle } from 'react-icons/fa'
import { GoAlert } from 'react-icons/go'
import { register, reset, uiStatus } from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { SignUpInterface } from 'interfaces/UserInterface'
import { PasswordErrors } from 'interfaces/components/Input'
import { AlertBanners } from 'interfaces/AccountSettingsInterface'
import { emptySignUp } from 'utils/data/userConstants'
import { Email, Text, PasswordInputs, RoleInput } from 'components/Inputs'
import { Checkbox, FormControlLabel } from '@mui/material'
import { PrimaryButton } from 'components/Buttons'
import './SignUp.scss'

export const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const [disabledForm, setDisabledForm] = useState(true)
  const [formValues, setFormValues] = useState<SignUpInterface>(emptySignUp)
  const [isAccepted, setIsAccepted] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const [alertBanner, setAlertBanner] = useState<AlertBanners>({
    status: false,
    text: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { password } = formValues
  const ALERT_BANNER_TIMEOUT = 16000

  useEffect(() => {
    if (status.isSuccess) {
      dispatch(reset())
      setFormValues(emptySignUp)
      setAlertBanner({ status: true })
    }
  }, [status.isSuccess, dispatch])

  useEffect(() => {
    const validateForm = () => {
      const emptyForm = Object.entries(formValues)
        .filter(([key, _value]) => key !== 'confirmPassword') // should confirmPassword be removed from signUp interface and constants to avoid this approach?
        .some(([_key, value]) => value === '')
      const passwordHasErrors = Object.values(passwordErrors).some(error =>
        ['neutral', 'criteria-not-met'].includes(error)
      )

      if (!emptyForm && isAccepted && !passwordHasErrors && isValidEmail) {
        return setDisabledForm(false)
      } else {
        return setDisabledForm(true)
      }
    }
    validateForm()
  }, [formValues, isAccepted, passwordErrors, isValidEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const validForm = await dispatch(register(formValues))
      const { payload } = validForm
      const localUser = {
        userId: payload.newUser,
        email: formValues.email,
      }
      sessionStorage.setItem('bootcamprLocalUser', JSON.stringify(localUser))

      navigate(`/sign-up/${payload.newUser}/confirmation-email-sent`, {
        replace: true,
      })
      window.scrollTo(0, 0) // Scroll to top to view alert banner

      const alertType =
        payload.invalidCredentials && payload.existingAccount
          ? 'warning'
          : 'info'
      const alertIcon =
        payload.invalidCredentials && payload.existingAccount ? (
          <GoAlert />
        ) : (
          <FaInfoCircle />
        )
      setAlertBanner({
        status: true,
        text: payload.message,
        icon: alertIcon,
        type: alertType,
      })

      setTimeout(() => {
        setAlertBanner({ status: false })
      }, ALERT_BANNER_TIMEOUT)
      setIsLoading(false)
    } catch (error) {
      console.error('Error occurred during form submission:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className='signup-screen'>
      {alertBanner.status && (
        <div className={alertBanner.type}>
          {alertBanner.icon}
          <p>{alertBanner.text}</p>
        </div>
      )}
      <div className='signup-header'>
        <h1>Join Bootcampr today.</h1>
      </div>
      <div className='signup-banner'>
        <div className='signup-container'>
          <form className='signup-form' autoComplete='off'>
            <Text
              label='First Name'
              name='firstName'
              required
              setFormValues={setFormValues}
            />
            <Text
              label='Last Name'
              name='lastName'
              required
              setFormValues={setFormValues}
            />
            <RoleInput
              label='Role'
              name='role'
              required
              setFormValues={setFormValues}
              formValues={formValues}
            />
            <Email
              setFormValues={setFormValues}
              setIsValidEmail={setIsValidEmail}
            />
            <PasswordInputs
              formValues={formValues}
              password={password}
              passwordErrors={passwordErrors}
              setPasswordErrors={setPasswordErrors}
              setFormValues={setFormValues}
              passwordInputName='sign-up'
            />
            <AcceptTermsCheckbox
              isAccepted={isAccepted}
              setIsAccepted={setIsAccepted}
            />
            <PrimaryButton
              onClick={handleSubmit}
              loading={isLoading}
              disabled={disabledForm}
              fullWidth
              label='Sign up'
              style={{ marginTop: '-10px' }}
            />
            <div className='sign-up-redirect-link'>
              <p>
                Already have an account? <Link to='/sign-in'>Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const AcceptTermsCheckbox = ({ isAccepted, setIsAccepted }) => {
  const handleCheckbox = () => {
    setIsAccepted(true)
    window.open(
      'https://docs.google.com/document/d/1Mhl_-ON-qayHKilEKCWKZ8xQBi8JLR9U5Mi_0dWLh8c/edit?usp=sharing',
      '_blank'
    )
  }
  const checkboxStyles = {
    '& .MuiFormControlLabel-root': {
      display: 'flex',
    },
    '& .MuiCheckbox-root': {
      alignSelf: 'flex-start',
      backgroundColor: '',
    },
    '& .MuiTypography-root': {
      fontSize: '14px',
    },
  }

  return (
    <div id='signup-agreement'>
      <FormControlLabel
        sx={checkboxStyles}
        control={
          <Checkbox
            checked={isAccepted}
            onChange={handleCheckbox}
            aria-required
          />
        }
        label={<TermsLink />}
      />
    </div>
  )
}

const TermsLink = () => {
  return (
    <a
      href='https://docs.google.com/document/d/1Mhl_-ON-qayHKilEKCWKZ8xQBi8JLR9U5Mi_0dWLh8c/edit?usp=sharing'
      target='_blank'
      rel='noreferrer'
    >
      I have read the terms and conditions.
    </a>
  )
}
