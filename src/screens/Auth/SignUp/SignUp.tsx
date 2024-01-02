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
import { Email, Text, PasswordInputs } from 'components/Inputs'
import './SignUp.scss'
import { Checkbox, FormControlLabel } from '@mui/material'
import signupImage from '../../../assets/Images/sign-up-flow-image.png'

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

    const validForm = await dispatch(register(formValues))
    const { payload } = validForm

    navigate(`/sign-up/${payload.newUser}/confirmation-email-sent`)
    window.scrollTo(0, 0) // Scroll to top to view alert banner
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

  const submitButtonStyle = `${
    disabledForm ? 'sign-up-btn' : 'sign-up-btn-active'
  }`

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
            src={signupImage}
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

            <div className='sign-up-btn-container'>
              <button
                className={submitButtonStyle}
                disabled={disabledForm}
                type='submit'
              >
                Sign up
              </button>
            </div>
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
        control={<Checkbox checked={isAccepted} onChange={handleCheckbox} />}
        label={`I agree to receive emails from Bootcampr.`}
      />
    </div>
  )
}
