import { useState, useEffect } from 'react'
import AuthFormInput from './AuthFormInput'
import { useParams } from 'react-router-dom'
import { updateUsersPassword, updateUsersEmail } from '../../../../utilities/api/users'
import { initialPasswordFormData, initialEmailFormData } from '../../helper/data'
import { EmailFormData, PasswordFormData, AuthSettingsFormDropdownProps } from '../../../../utilities/types/AccountSettingsInterface'
import styles from './AuthSettingsFormDropdown.module.css';
import UpdateFeedback from '../../helper/UpdateFeedback'

const AuthSettingsFormDropdown = ({ fields, type }: AuthSettingsFormDropdownProps): JSX.Element => {
  // Constants
  const emailDropDownActive: boolean = type[1] === 'newEmail'
  const { id } = useParams()
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // State Variables
  const [authFormData, setAuthFormData] = useState<EmailFormData | PasswordFormData>(emailDropDownActive ? initialEmailFormData : initialPasswordFormData)
  const [updateStatus, setUpdateStatus] = useState<string>("pending")
  const [disableButton, setDisableButton] = useState<boolean>(true)

  // Helper Functions
  const fetchAPI = async () => {
    if (emailDropDownActive) return await updateUsersEmail(authFormData, id)
    else return await updateUsersPassword(authFormData, id)
  }

  // Validate Email
  const validateEmailDropdown = (temp: any) => {
    const validEmail = temp.newEmail.match(VALID_EMAIL_REGEX)
    const emailsMatch = temp.newEmail === temp.confirmNewEmail

    if (validEmail && emailsMatch) setDisableButton(false)
    else setDisableButton(true)
  }

  // Validate Password
  const validatePasswordDropdown = (temp: any) => {
    const passwordsDoNotMatch = temp.newPassword !== temp.confirmNewPassword
    const fieldsNotFilledOut = temp.newPassword === "" || temp.password === ""

    if (passwordsDoNotMatch || fieldsNotFilledOut) setDisableButton(true)
    else setDisableButton(false)
  }

  // Event Handlers
  const handleUpdateCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { status, data }: any = await fetchAPI()

    if (status === 201) {
      return setUpdateStatus("authorized")
    }

    if (status === 401) {
      if (data.message === "Password is required") return setUpdateStatus("enter-valid-password")
      else return setUpdateStatus("unauthorized")
    }

    setUpdateStatus("error")
  }


  // Side Effects
  useEffect(() => {
    if (emailDropDownActive) validateEmailDropdown({ ...authFormData })
    else validatePasswordDropdown({ ...authFormData })
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
          disabled={disableButton}
          type="submit"
          className={styles.auth_form_submit_button}>
          Update
        </button>

        {updateStatus !== 'pending' && < UpdateFeedback updateStatus={updateStatus} />}

      </form>
    </div>
  );
}

export default AuthSettingsFormDropdown;