import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaInfoCircle } from 'react-icons/fa'
import { GoAlert } from 'react-icons/go'
import {
  register,
  reset,
  uiStatus,
  setConfirmationEmailAddress,
} from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { SignUpInterface } from 'interfaces/UserInterface'
import { PasswordErrors } from 'interfaces/components/Input'
import { AlertBanners } from 'interfaces/AccountSettingsInterface'
import { emptySignUp } from 'utils/data/userConstants'
import { Email, Text, PasswordInputs } from 'components/Inputs'
import './SignUp.scss'
import { Checkbox, FormControlLabel } from '@mui/material'
import signup from '../../../assets/Images/signup.png'
import { PrimaryButton } from 'components/Buttons'
import { DisabledByDefault } from '@mui/icons-material'

export const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const [disabledForm, setDisabledForm] = useState(true)
  const [formValues, setFormValues] = useState<SignUpInterface>(emptySignUp)
  const [isAccepted, setIsAccepted] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [alertBanner, setAlertBanner] = useState<AlertBanners>({
    status: false,
    text: '',
  })
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
      const { confirmPassword, password } = formValues
      const emptyForm = Object.values(formValues).some(value => value === '')
      const passwordHasErrors = Object.values(passwordErrors).some(error =>
        ['neutral', 'criteria-not-met'].includes(error)
      )
      const passwordsMatch = () => {
        if (confirmPassword === '' || password === '' || passwordHasErrors) {
          return false
        } else if (confirmPassword !== password) {
          return false
        }
        return true
      }

      if (emptyForm === false && isAccepted && passwordsMatch()) {
        return setDisabledForm(false)
      } else {
        return setDisabledForm(true)
      }
    }
    validateForm()
  }, [formValues, isAccepted, passwordErrors])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      dispatch(setConfirmationEmailAddress(formValues.email))

      const validForm = await dispatch(register(formValues))
      const { payload } = validForm

      navigate(`/sign-up/${payload.newUser}/confirmation-email-sent`)
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
    } catch (error) {
      console.error('Error occurred during form submission:', error)
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
        <h2>Get the experience. Get the job.</h2>
      </div>
      <div className='signup-banner'>
        <div>
          <img
            src={signup}
            alt='A person smiles while working on a laptop at a coffee shop'
          />
        </div>

        <div className='signup-container'>
          <form
            className='signup-form'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
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
            <Email setFormValues={setFormValues} />
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
            //TODO circle back on making this do handleSubmit on click
            <PrimaryButton
              disabled={disabledForm}
              fullWidth
              label='Sign up'
              style={{ marginTop: '-10px' }}
              type='submit'
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
  const handleCheckbox = e => setIsAccepted(e.target.checked)
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
      <p>
        Bootcampr sends important information, including project start dates and
        team notifications by email. We will not sell your information!
      </p>
      <FormControlLabel
        sx={checkboxStyles}
        control={
          <Checkbox
            checked={isAccepted}
            onChange={handleCheckbox}
            aria-required
          />
        }
        label={`I agree to receive emails from Bootcampr.`}
      />
    </div>
  )
}
