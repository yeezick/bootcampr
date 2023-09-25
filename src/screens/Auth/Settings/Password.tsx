import { PasswordInputs } from 'components/Inputs'
import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import { useEffect, useState } from 'react'
import { emptyPasswordData } from 'utils/data/userConstants'
import { PasswordErrors } from 'interfaces/components/Input'
import { updateUsersPassword } from 'utils/api'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import './Settings.scss'

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
  const [isDisabled, toggleIsDisabled] = useState(true)
  const { password } = formValues

  useFormValidation(formValues, password, toggleIsDisabled)

  return (
    <div>
      <form className='settings-card'>
        <PasswordInputs
          formValues={formValues}
          password={password}
          passwordErrors={passwordErrors}
          setPasswordErrors={setPasswordErrors}
          setFormValues={setFormValues}
          passwordInputName='email-pwd-reset'
        />
        <div className='buttons'>
          <button className='update' type='submit' disabled={isDisabled}>
            Reset Password
          </button>
        </div>
      </form>
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
