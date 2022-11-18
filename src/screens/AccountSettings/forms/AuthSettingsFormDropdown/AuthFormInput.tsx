import { AuthFormInputProps } from '../../../../utilities/types/AccountSettingsInterface'
import { useState } from 'react'
import styles from './AuthSettingsFormDropdown.module.css'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';

const AuthFormInput = ({ setAuthFormData, authFormData, field, type }: AuthFormInputProps): JSX.Element => {
  // Constants
  const PasswordInput = type.toLowerCase().includes('password')

  // State Variables
  const [showPassword, setShowPassword] = useState<boolean>(PasswordInput ? false : true)


  return (
    <div className={styles.form_input_container}>

      <label className={styles.auth_form_label} htmlFor={`${type}_input`}>{field}*</label>
      <input
        className={styles.auth_form_input}
        id={`${type}_input`}
        name={`${type}_input`}
        type={`${showPassword ? 'text' : 'password'}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthFormData({ ...authFormData, [type]: e.target.value })}
      />

      {PasswordInput && (
        <span
          className={styles.toggle_hide_password}
          onClick={() => setShowPassword(state => !state)}>
          {showPassword ? < BsEyeFill className={styles.pwd_reveal} /> : <BsEyeSlash className={styles.pwd_reveal_gray} />}
        </span>
      )}
    </div>
  )
}

export default AuthFormInput;