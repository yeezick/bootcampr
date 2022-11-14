import { useState, useEffect } from 'react'
import AuthFormInput from './AuthFormInput'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../../../utilities/redux/slices/users/userSlice'
import { updateUsersPassword, updateUsersEmail } from '../../../../utilities/api/users'
import { initialPasswordFormData, initialEmailFormData } from '../../helper/data'
import { EmailFormData, PasswordFormData, AuthSettingsFormDropdownProps } from '../../../../utilities/types/AccountSettingsInterface'
import styles from './AuthSettingsFormDropdown.module.css';

const AuthSettingsFormDropdown = ({ fields, type }: AuthSettingsFormDropdownProps): JSX.Element => {
  // Constants
  const emailDropDownActive: boolean = type[1] === 'newEmail'
  const { id } = useParams()
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // State Variables
  const [authFormData, setAuthFormData] = useState<EmailFormData | PasswordFormData>(emailDropDownActive ? initialEmailFormData : initialPasswordFormData)
  const [updateStatus, setUpdateStatus] = useState<string>("pending")
  const [confirmationMatches, setConfirmationMatches] = useState<boolean>(true)

  // Helper Functions
  const fetchAPI = async () => {
    if (emailDropDownActive) return await updateUsersEmail(authFormData, id)
    else return await updateUsersPassword(authFormData, id)
  }

  const validateForm = (): boolean => {
    let temp: any = { ...authFormData }

    if (emailDropDownActive) {
      const emailsDoNotMatch = temp['newEmail'] !== temp["confirmNewEmail"]
      const invalidEmail = !temp['newEmail'].match(VALID_EMAIL_REGEX)

      if (emailsDoNotMatch) setUpdateStatus(() => "email-match-error")
      if (invalidEmail) setUpdateStatus(() => "invalid-email")
      if (emailsDoNotMatch || invalidEmail) return false
    }

    const passwordsDoNotMatch = temp['newPassword'] !== temp["confirmNewPassword"]
    if (passwordsDoNotMatch) {
      setUpdateStatus(() => "password-match-error")
      return false
    }
    return true
  }

  // Event Handlers
  const handleUpdateCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    const { status }: any = await fetchAPI()

    if (status === 201) return setUpdateStatus(() => "authorized")
    if (status === 401) return setUpdateStatus(() => "unauthorized")

    setUpdateStatus("error")
  }

  // Side Effects
  useEffect(() => {
    setUpdateStatus(() => 'pending')
  }, [authFormData])

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleUpdateCredentials}>

        {fields.map((_, i) => (
          <AuthFormInput
            setAuthFormData={setAuthFormData}
            authFormData={authFormData}
            key={fields[i]}
            field={fields[i]}
            type={type[i]}
          />
        ))}

        <button
          type="submit"
          className={styles.auth_form_submit_button}>
          Update
        </button>
        {updateStatus === 'authorized' && <p>✔️ Update Successful</p>}
        {updateStatus === 'unauthorized' && <p>❌ Wrong Password</p>}
        {updateStatus === 'error' && <p>❌ Error, Please try again later</p>}
        {updateStatus === 'password-match-error' && <p>❌ Passwords don't match</p>}
        {updateStatus === 'email-match-error' && <p>❌ Emails don't match</p>}
        {updateStatus === 'invalid-email' && <p>❌ Invalid Email</p>}
      </form>
    </div>
  );
}

export default AuthSettingsFormDropdown;