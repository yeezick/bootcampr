import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import { AuthFormInputProps } from 'interfaces/AccountSettingsInterface'
import styles from '../css/AuthSettingsFormDropdown.module.css'
import { useState } from 'react'

export const AuthFormInput = ({
  setAuthFormData,
  authFormData,
  field,
  type,
}: AuthFormInputProps): JSX.Element => {
  // Constants
  const PasswordInput = type.toLowerCase().includes('password')

  // State Variables
  const [showPassword, setShowPassword] = useState<boolean>(
    PasswordInput ? false : true
  )

  // Event Handlers
  const handleTogglePassword = () => setShowPassword(state => !state)
  const handleUpdateFormData = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAuthFormData({ ...authFormData, [type]: e.target.value })
  // styles['auth-form-label']
  return (
    <div className={styles['form-input-container']}>
      <label className={styles['auth-form-label']} htmlFor={`${type}_input`}>
        {field}*
      </label>
      <input
        className={styles['auth-form-input']}
        id={`${type}_input`}
        name={`${type}_input`}
        type={`${showPassword ? 'text' : 'password'}`}
        onChange={handleUpdateFormData}
      />

      {PasswordInput && (
        <span
          className={styles['toggle-hide-password']}
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <BsEyeFill className={styles['pwd-reveal']} />
          ) : (
            <BsEyeSlash className={styles['pwd-reveal-gray']} />
          )}
        </span>
      )}
    </div>
  )
}
