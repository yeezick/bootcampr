import './Settings.scss'
import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import { PasswordErrors } from 'interfaces/components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOut, updateUsersPassword } from 'utils/api'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'
import { emptyPasswordData } from 'utils/data/userConstants'
import { useAppSelector } from 'utils/redux/hooks'
import { logoutAuthUser, selectAuthUser } from 'utils/redux/slices/userSlice'
import { useFormValidation } from 'utils/helpers'
import { PasswordInputs } from 'components/Inputs'
import { useNavigate } from 'react-router-dom'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { PrimaryButton } from 'components/Buttons'

export const ChangePassword = () => {
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

      dispatch(errorSnackbar(passwordData.friendlyMessage))
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
        <PrimaryButton
          type='submit'
          disabled={isDisabled}
          label='Change password'
        />
      </form>
    </div>
  )
}
