import { useState } from 'react'
import AuthFormInput from './AuthFormInput'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../../../utilities/redux/slices/users/userSlice'
import { updateUsersPassword, updateUsersEmail } from '../../../../utilities/api/users'
import { EmailFormData, PasswordFormData, initialPasswordFormData, initialEmailFormData, AuthSettingsFormDropdownProps } from '../../helper/data'
import styles from './AuthSettingsFormDropdown.module.css';

const AuthSettingsFormDropdown = ({ fields, type }: AuthSettingsFormDropdownProps): JSX.Element => {
  // Constants
  const emailDropDownActive: boolean = type[1] === 'newEmail'
  const authUser = useSelector(selectAuthUser)
  const _id = authUser?._id

  // State Variables
  const [authFormData, setAuthFormData] = useState<EmailFormData | PasswordFormData>(emailDropDownActive ? initialEmailFormData : initialPasswordFormData)

  const [updateStatus, setUpdateStatus] = useState<string>("pending")

  // Event Handlers
  const handleUpdateCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let response: any;
    if (emailDropDownActive) {
      response = await updateUsersEmail(authFormData, _id)
      console.log('Response: ', response)
    } else {
      response = await updateUsersPassword(authFormData, _id)
      console.log('Response: ', response)
    }

    switch (response.status) {
      case 201:
        setUpdateStatus("authorized")
        break;
      case 401:
        setUpdateStatus("unauthorized")
        break;
      default:
        setUpdateStatus("error")
        break;
    }
  }

  return (
    <div className={styles.form_container}>
      <form onSubmit={(e) => handleUpdateCredentials(e)}>
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
          className={styles.auth_form_submit_button}
        >Update</button>
        {updateStatus === 'authorized' && <p>✔️ Update Successful</p>}
        {updateStatus === 'unauthorized' && <p>❌ Wrong Password</p>}
        {updateStatus === 'error' && <p>❌ Error, Please try again later</p>}
      </form>
    </div>
  );
}

export default AuthSettingsFormDropdown;