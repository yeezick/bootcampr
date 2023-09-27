import { PasswordInputs } from 'components/Inputs'
import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import { useEffect, useState } from 'react'
import { emptyPasswordData } from 'utils/data/userConstants'
import { PasswordErrors } from 'interfaces/components/Input'
import { logOut, updateUsersPassword } from 'utils/api'
import { logoutAuthUser, selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import './Settings.scss'
import { useNavigate } from 'react-router-dom'

export const PasswordSettings = () => {
  const [formValues, setFormValues] =
    useState<PasswordFormData>(emptyPasswordData)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [isDisabled, toggleIsDisabled] = useState(false)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useDispatch()

  useEffect(() => {
    setFormValues(emptyPasswordData)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const reqBody = {
      password: formValues.currentPassword,
      newPassword: formValues.password,
      confirmNewPassword: formValues.confirmPassword,
    }
    const passwordData = await updateUsersPassword(reqBody, authUser._id)
    const severity = passwordData.status >= 400 ? 'error' : 'success'

    if (passwordData) {
      dispatch(
        createSnackBar({
          isOpen: true,
          message: passwordData.message,
          duration: 5000,
          vertical: 'top',
          horizontal: 'center',
          snackbarStyle: '',
          severity,
        })
      )
    }
  }

  const handleCancel = () => {
    toggleIsDisabled(true)
  }

  const { password, currentPassword } = formValues

  useFormValidation(formValues, currentPassword, toggleIsDisabled)
  return (
    <form className='settings-card' onSubmit={handleSubmit} autoComplete='off'>
      <PasswordInputs
        formValues={formValues}
        password={password}
        passwordErrors={passwordErrors}
        setPasswordErrors={setPasswordErrors}
        setFormValues={setFormValues}
        passwordInputName='settings-pwd-reset'
      />
      <div className='buttons'>
        <button className='cancel' type='button' onClick={handleCancel}>
          Cancel
        </button>
        <button className='update' type='submit' disabled={isDisabled}>
          Reset
        </button>
      </div>
    </form>
  )
}

export const ResetPassword = () => {
  const [formValues, setFormValues] =
    useState<PasswordFormData>(emptyPasswordData)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [passwordSuccessfullyReset, setPasswordSuccessfullyReset] =
    useState(false)
  const [isDisabled, toggleIsDisabled] = useState(true)
  const authUser = useAppSelector(selectAuthUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { password } = formValues

  console.log(formValues)

  const handleReset = async e => {
    e.preventDefault()

    const reqBody = {
      password: formValues.currentPassword,
      newPassword: formValues.password,
      confirmNewPassword: formValues.confirmPassword,
    }
    const passwordData = await updateUsersPassword(reqBody, authUser._id)
    if (passwordData.status < 400) {
      setPasswordSuccessfullyReset(true)
    }
  }

  const handleLogin = () => {
    logOut()
    dispatch(logoutAuthUser())
    navigate('/sign-in')
  }

  useFormValidation(formValues, password, toggleIsDisabled)

  return (
    <div className='reset-password-modal'>
      {!passwordSuccessfullyReset ? (
        <form className='settings-card ' onSubmit={handleReset}>
          <PasswordInputs
            formValues={formValues}
            password={password}
            passwordErrors={passwordErrors}
            setPasswordErrors={setPasswordErrors}
            setFormValues={setFormValues}
            passwordInputName='email-pwd-reset'
          />
          <div className='buttons'>
            <button
              className={isDisabled ? 'update' : 'reset-pwd-valid'}
              type='submit'
              disabled={isDisabled}
            >
              Reset Password
            </button>
          </div>
        </form>
      ) : (
        <div className='pwd-reset-success-container'>
          <div className='success-status'>Your password has been reset!</div>
          <p className='success-message'>
            Log in with your new password to have more fun working on a{' '}
            <br></br>
            project with a cross-functional team.
          </p>
          <button className='navigate-to-login' onClick={handleLogin}>
            Log in
          </button>
        </div>
      )}
    </div>
  )
}

export const useFormValidation = (
  formValues,
  requiredField,
  toggleIsDisabled
) => {
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})

  useEffect(() => {
    const validateForm = () => {
      const { confirmPassword, password } = formValues
      const emptyForm = () => {
        if (requiredField === '') {
          return false
        } else {
          return true
        }
      }
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

      if (emptyForm && passwordsMatch()) {
        return toggleIsDisabled(false)
      } else {
        return toggleIsDisabled(true)
      }
    }
    validateForm()
  }, [formValues, passwordErrors, requiredField, toggleIsDisabled])
}
