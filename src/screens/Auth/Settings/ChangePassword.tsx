import './Settings.scss'
import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import { PasswordErrors } from 'interfaces/components'
import { useEffect, useState } from 'react'
import { updateUsersPassword } from 'utils/api'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'
import { emptyPasswordData } from 'utils/data/userConstants'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useFormValidation } from 'utils/helpers'
import { PasswordInputs } from 'components/Inputs'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

export const ChangePassword = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] =
    useState<PasswordFormData>(emptyPasswordData)
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
  const [inputError, setInputError] = useState<boolean>(false)
  const [isDisabled, toggleIsDisabled] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const authUser = useAppSelector(selectAuthUser)

  useEffect(() => {
    setFormValues(emptyPasswordData)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const reqBody = {
      password: formValues.currentPassword,
      newPassword: formValues.password,
      confirmNewPassword: formValues.confirmPassword,
    }
    const passwordData = await updateUsersPassword(reqBody, authUser._id)

    if (passwordData.status >= 400) {
      passwordData.friendlyMessage === 'Your password is incorrect.' &&
        setInputError(true)
    } else {
      setInputError(false)
      navigate(`/success?screen=${SuccessQueryParam.changePassword}`)
    }
    setIsLoading(false)
  }

  const resetErrorState = () => {
    setInputError(false)
  }

  const { password, currentPassword } = formValues

  useFormValidation(formValues, currentPassword, toggleIsDisabled)
  return (
    <div className='settings-change-password container'>
      <form className='settings-change-password form'>
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
        <ButtonContainer style={{ marginTop: '32px' }}>
          <PrimaryButton
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isDisabled}
            label='Change password'
          />
        </ButtonContainer>
      </form>
    </div>
  )
}
