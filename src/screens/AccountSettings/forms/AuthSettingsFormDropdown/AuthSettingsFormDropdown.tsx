import { useState, useEffect } from 'react'
import AuthFormInput from './AuthFormInput'
import { useParams } from 'react-router-dom'
import { updateUsersPassword, updateUsersEmail } from '../../../../utilities/api/users'
import { initialPasswordFormData, initialEmailFormData } from '../../helper/data'
import { EmailFormData, PasswordFormData, AuthSettingsFormDropdownProps } from '../../../../utilities/types/AccountSettingsInterface'
import styles from './AuthSettingsFormDropdown.module.css';
import UpdateFeedback from '../../helper/UpdateFeedback'
import FormErrors from '../../helper/FormErrors';

const AuthSettingsFormDropdown = ({ fields, type }: AuthSettingsFormDropdownProps): JSX.Element => {
  // Constants
  const emailDropDownActive: boolean = type[1] === 'newEmail' // Lets us know whether or not the user is entering email or password info so we can change teh formData state accordingly.
  const { id } = useParams()
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // State Variables
  const [authFormData, setAuthFormData] = useState<EmailFormData | PasswordFormData>(emailDropDownActive ? initialEmailFormData : initialPasswordFormData)
  const [updateStatus, setUpdateStatus] = useState<string>("pending")
  const [disableButton, setDisableButton] = useState<boolean>(true)

  // Helper Functions
  const VALIDATION_HELPERS = {
    fetchAPI: async () => emailDropDownActive ? await updateUsersEmail(authFormData, id) : await updateUsersPassword(authFormData, id),
    emailsMatch: (temp: any | EmailFormData) => temp.newEmail === temp.confirmNewEmail,
    passwordsMatch: (temp: any | PasswordFormData) => temp.newPassword === temp.confirmNewPassword,
    validEmail: (temp: any | EmailFormData) => temp.newEmail.match(VALID_EMAIL_REGEX),
    emailFieldsFilledOut: (temp: any | EmailFormData) => temp.newEmail !== "" && temp.confirmNewEmail !== "",
    passwordFieldsFilledOut: (temp: any | PasswordFormData) => temp.newPassword !== "" && temp.confirmNewPassword !== ""
  }

  // Validate Email
  const validateEmailDropdown = (temp: EmailFormData) => {
    const { emailsMatch, validEmail } = VALIDATION_HELPERS

    if (validEmail(temp) && emailsMatch(temp)) return setDisableButton(false)
    else return setDisableButton(true)
  }

  // Validate Password
  const validatePasswordDropdown = (temp: PasswordFormData) => {
    const { passwordsMatch } = VALIDATION_HELPERS
    const fieldsNotFilledOut = temp.newPassword === "" || temp.password === ""

    if (!passwordsMatch(temp) || fieldsNotFilledOut) setDisableButton(true)
    else setDisableButton(false)
  }

  // Event Handlers
  const handleUpdateCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { fetchAPI } = VALIDATION_HELPERS

    const { status }: any = await fetchAPI()

    if (status === 201) return setUpdateStatus("authorized")
    if (status === 401) return setUpdateStatus("unauthorized")

    setUpdateStatus("error")
  }


  // Side Effects
  useEffect(() => {
    let temp: any = { ...authFormData }

    if (emailDropDownActive) validateEmailDropdown(temp)
    else validatePasswordDropdown(temp)

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

        < FormErrors VALIDATION_HELPERS={VALIDATION_HELPERS} emailDropDownActive={emailDropDownActive} authFormData={authFormData} />
        {updateStatus !== 'pending' && < UpdateFeedback updateStatus={updateStatus} />}

      </form>
    </div>
  );
}

export default AuthSettingsFormDropdown;