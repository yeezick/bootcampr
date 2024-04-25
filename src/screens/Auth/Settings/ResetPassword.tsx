import './Settings.scss'
import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import { PasswordErrors } from 'interfaces/components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUsersPassword } from 'utils/api'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'
import { emptyPasswordData } from 'utils/data/userConstants'
import { useFormValidation } from 'utils/helpers'
import { PasswordInputs } from 'components/Inputs'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { PrimaryButton } from 'components/Buttons'

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
      dispatch(errorSnackbar(passwordData.friendlyMessage))
    } else {
      navigate(`/success/${userId}?screen=${SuccessQueryParam.resetPassword}`)
    }
  }

  useFormValidation(formValues, password, toggleIsDisabled)

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
        <PrimaryButton
          type='submit'
          disabled={isDisabled}
          label='Reset password'
        />
      </form>
    </div>
  )
}
