import React, { useEffect, useState } from 'react'
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

export const SignUp: React.FC = () => {
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
        <div className='honeycomb'>
          <img src='./drawing-wireframes.jpg' />
        </div>

        <div className='signup-container'>
          <form onSubmit={handleSubmit} autoComplete='off'>
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
            />

            <AcceptTermsCheckbox
              isAccepted={isAccepted}
              setIsAccepted={setIsAccepted}
            />

            <div className='form-btn'>
              <button type='submit' disabled={disabledForm}>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const AcceptTermsCheckbox = ({ isAccepted, setIsAccepted }) => {
  // reset validations states here
  const handleCheckbox = e => setIsAccepted(e.target.checked)
  const checkboxStyles = {
    '& .MuiFormControlLabel-root': {
      display: 'flex',
    },
    '& .MuiCheckbox-root': {
      backgroundColor: '',
      alignSelf: 'flex-start',
    },
  }

  return (
    <div id='signup-agreement'>
      <FormControlLabel
        sx={checkboxStyles}
        control={<Checkbox checked={isAccepted} onChange={handleCheckbox} />}
        label={`I agree to receive email notification(s). We will only send 
        emails with important information, like project start dates.
        We will not sell your information!`}
      />
    </div>
  )
}
