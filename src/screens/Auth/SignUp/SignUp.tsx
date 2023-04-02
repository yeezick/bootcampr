import React, { useEffect, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { GoAlert } from 'react-icons/go'
import { register, reset, uiStatus } from 'utils/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { SignUpInterface } from 'interfaces/UserInterface'
import { AlertBanners } from 'interfaces/AccountSettingsInterface'
import { emptySignUp } from 'utils/data/userConstants'
import { Email, Text, PasswordInputs } from 'components/Inputs'
import './SignUp.scss'

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const [formValues, setFormValues] = useState<SignUpInterface>(emptySignUp)
  const [disabledForm, setDisabledForm] = useState(true)
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
      const passwordsMatch = () => {
        if (confirmPassword === '' || password === '') {
          return false
        } else if (confirmPassword !== password) {
          return false
        }
        return true
      }
      if (emptyForm === false && passwordsMatch()) {
        return setDisabledForm(false)
      } else {
        return setDisabledForm(true)
      }
    }
    validateForm()
  }, [formValues])

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
            setFormValues={setFormValues}
          />

          <div className='form-btn'>
            <button type='submit' disabled={disabledForm}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
