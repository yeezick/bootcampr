import './Settings.scss'
import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import { PasswordErrors } from 'interfaces/components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { logOut, updateUsersPassword, verify } from 'utils/api'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'
import { emptyPasswordData, emptyUser } from 'utils/data/userConstants'
import { useFormValidation } from 'utils/helpers'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { PasswordInputs } from 'components/Inputs'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { PrimaryButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import {
  logoutAuthUser,
  selectUserId,
  setAuthUser,
  updateAuthUser,
} from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'

export const ResetPassword = () => {
  const [formValues, setFormValues] =
    useState<PasswordFormData>(emptyPasswordData)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [isDisabled, toggleIsDisabled] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useParams()
  const { password } = formValues
  const [userId, setUserId] = useState('')
  const authUserId = useAppSelector(selectUserId)

  useEffect(() => {
    const verifyValidToken = async () => {
      if (!localStorage.getItem('collabifyAuthToken') && token) {
        localStorage.setItem('collabifyAuthToken', token)
      }

      const user = await verify()
      if (user?._id) {
        navigate('/users/reset-password', { replace: true })
        setUserId(user._id)
      } else {
        dispatch(errorSnackbar('There was an issue verifying your token.'))
        navigate('/sign-in', { replace: true })
        await logOut()
      }
    }
    verifyValidToken()
  }, [])

  useEffect(() => {
    const beforeUnload = async () => {
      await logOut()
      dispatch(logoutAuthUser())
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => {
      window.removeEventListener('beforeunload', beforeUnload)
    }
  }, [])

  const handleReset = async e => {
    e.preventDefault()

    const reqBody = {
      newPassword: formValues.password,
      confirmNewPassword: formValues.confirmPassword,
    }
    const passwordData = await updateUsersPassword(reqBody, userId)

    if (passwordData.status >= 400) {
      dispatch(errorSnackbar(passwordData.friendlyMessage))
    } else {
      navigate(`/success?screen=${SuccessQueryParam.resetPassword}`)
    }
  }

  useFormValidation(formValues, password, toggleIsDisabled)

  return (
    <div className='settings-reset-password container'>
      <form className='settings-reset-password form'>
        <div className='settings-reset-password header'>Reset Password</div>
        <PasswordInputs
          formValues={formValues}
          password={password}
          passwordErrors={passwordErrors}
          setPasswordErrors={setPasswordErrors}
          setFormValues={setFormValues}
          passwordInputName='email-pwd-reset'
        />
        <ButtonContainer style={{ marginTop: '32px' }}>
          <PrimaryButton
            onClick={handleReset}
            disabled={isDisabled}
            label='Reset password'
          />
        </ButtonContainer>
      </form>
    </div>
  )
}
