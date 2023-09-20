import {
  PasswordInputs,
  Text,
  Password,
  ConfirmPassword,
  CurrentPassword,
} from 'components/Inputs'
import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import { useEffect, useState } from 'react'
import { emptyPasswordData } from 'utils/data/userConstants'
import { PasswordErrors } from 'interfaces/components/Input'
import { updateUsersPassword } from 'utils/api'
import { selectAuthUser, setAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const PasswordSettings = () => {
  const [formValues, setFormValues] =
    useState<PasswordFormData>(emptyPasswordData)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useDispatch()

  useEffect(() => {
    setFormValues(emptyPasswordData)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const reformatValues = {
      password: formValues.currentPassword,
      newPassword: formValues.password,
      confirmNewPassword: formValues.confirmPassword,
    }
    const passwordData = await updateUsersPassword(reformatValues, authUser._id)
    const severity = passwordData.status >= 400 ? 'error' : 'success'
    console.log(severity)
    console.log(passwordData.message)
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

  const handleCancel = () => {}

  const { password } = formValues
  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <PasswordInputs
        formValues={formValues}
        password={password}
        passwordErrors={passwordErrors}
        setPasswordErrors={setPasswordErrors}
        setFormValues={setFormValues}
      />
      <div className='form-btn'>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      <div className='form-btn'>
        <button type='submit'>Reset Password</button>
      </div>
    </form>
  )
}
