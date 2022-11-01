import { AuthSettingsFormDropdownProps, initialState } from '../../helper/data'
import { useState } from 'react'
import AuthFormInput from './AuthFormInput'
import styles from './AuthSettingsFormDropdown.module.css';
import { EmailFormData, PasswordFormData, initialPasswordFormData, initialEmailFormData } from '../../helper/data'

const AuthSettingsFormDropdown = ({ fields, type }: AuthSettingsFormDropdownProps): JSX.Element => {
  const [authFormData, setAuthFormData] = useState<EmailFormData | PasswordFormData>(type === 'email' ? initialEmailFormData : initialPasswordFormData)

  return (
    <div className={styles.form_container}>
      {fields.map(field => (
        <AuthFormInput
          setAuthFormData={setAuthFormData}
          authFormData={authFormData}
          key={field}
          field={field} />
      ))}
    </div>
  );
}

export default AuthSettingsFormDropdown;