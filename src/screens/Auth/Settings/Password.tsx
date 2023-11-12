import './Settings.scss'
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
import { useNavigate, useParams } from 'react-router-dom'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'

export const PasswordSettings = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] =
    useState<PasswordFormData>(emptyPasswordData)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [inputError, setInputError] = useState<boolean>(false)
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

    if (passwordData.status >= 400) {
      passwordData.friendlyMessage === 'Your password is incorrect.' &&
        setInputError(true)

      dispatch(
        createSnackBar({
          isOpen: true,
          message: passwordData.friendlyMessage,
          duration: 5000,
          severity: 'error',
          horizontal: 'right',
        })
      )
    } else {
      await logOut()
      dispatch(logoutAuthUser())
      setInputError(false)
      navigate(
        `/success/${authUser._id}?screen=${SuccessQueryParam.changePassword}`
      )
    }
  }

  const resetErrorState = () => {
    setInputError(false)
  }

  const { password, currentPassword } = formValues

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFA726',
      },
      action: {
        disabledBackground: '',
      },
    },
  })

  useFormValidation(formValues, currentPassword, toggleIsDisabled)
  return (
    <div className='settings-change-password container'>
      <form className='settings-change-password form' onSubmit={handleSubmit}>
        <div className='settings-change-password header'>Change password</div>
        <PasswordInputs
          disableErrorState={resetErrorState}
          formValues={formValues}
          inputError={inputError}
          password={password}
          passwordErrors={passwordErrors}
          setPasswordErrors={setPasswordErrors}
          setFormValues={setFormValues}
          passwordInputName='settings-pwd-reset'
        />
        <ThemeProvider theme={theme}>
          <Button
            className='settings-change-password button'
            variant='contained'
            type='submit'
            disabled={isDisabled}
          >
            Change password
          </Button>
        </ThemeProvider>
      </form>
    </div>
  )
}

export const ResetPassword = () => {
  const [formValues, setFormValues] =
    useState<PasswordFormData>(emptyPasswordData)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [isDisabled, toggleIsDisabled] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id: userId } = useParams()
  const { password } = formValues

  const handleReset = async e => {
    e.preventDefault()

    const reqBody = {
      newPassword: formValues.password,
      confirmNewPassword: formValues.confirmPassword,
    }
    const passwordData = await updateUsersPassword(reqBody, userId)

    if (passwordData.status >= 400) {
      dispatch(
        createSnackBar({
          isOpen: true,
          message: passwordData.friendlyMessage,
          duration: 5000,
          severity: 'error',
          horizontal: 'right',
        })
      )
    } else {
      navigate(`/success/${userId}?screen=${SuccessQueryParam.resetPassword}`)
    }
  }

  useFormValidation(formValues, password, toggleIsDisabled)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFA726',
      },
    },
  })

  return (
    <div className='settings-reset-password container'>
      <form className='settings-reset-password form' onSubmit={handleReset}>
        <div className='settings-reset-password header'>Reset Password</div>
        <PasswordInputs
          formValues={formValues}
          password={password}
          passwordErrors={passwordErrors}
          setPasswordErrors={setPasswordErrors}
          setFormValues={setFormValues}
          passwordInputName='email-pwd-reset'
        />
        <ThemeProvider theme={theme}>
          <Button
            className='settings-reset-password button'
            variant='contained'
            type='submit'
            disabled={isDisabled}
          >
            Reset password
          </Button>
        </ThemeProvider>
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

      if (emptyForm() && passwordsMatch()) {
        return toggleIsDisabled(false)
      } else {
        return toggleIsDisabled(true)
      }
    }
    validateForm()
  }, [formValues, passwordErrors, requiredField, toggleIsDisabled])
}
