import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';

import { AuthFormInputProps } from '../../../utilities/types/AccountSettingsInterface'
import styles from '../css/AuthSettingsFormDropdown.module.css'
import { useState } from 'react'

const AuthFormInput = ({ setAuthFormData, authFormData, field, type }: AuthFormInputProps): JSX.Element => {
  // Constants
  const PasswordInput = type.toLowerCase().includes('password')

  // State Variables
  const [showPassword, setShowPassword] = useState<boolean>(PasswordInput ? false : true)

  // Event Handlers
  const handleTogglePassword = () => setShowPassword(state => !state)
  const handleUpdateFormData = (e: React.ChangeEvent<HTMLInputElement>) => setAuthFormData({ ...authFormData, [type]: e.target.value })

  return (
    <div className={styles.form_input_container}>

      <label className={styles.auth_form_label} htmlFor={`${type}_input`}>{field}*</label>
      <input
        className={styles.auth_form_input}
        id={`${type}_input`}
        name={`${type}_input`}
        type={`${showPassword ? 'text' : 'password'}`}
        onChange={handleUpdateFormData}
      />

      {PasswordInput && (
        <span
          className={styles.toggle_hide_password}
          onClick={handleTogglePassword}>
          {showPassword ? < BsEyeFill className={styles.pwd_reveal} /> : <BsEyeSlash className={styles.pwd_reveal_gray} />}
        </span>
      )}
    </div>
  )
}

export default AuthFormInput;