import { AuthFormInputProps } from '../../../../utilities/types/AccountSettingsInterface'
import styles from './AuthSettingsFormDropdown.module.css'

const AuthFormInput = ({ setAuthFormData, authFormData, field, type }: AuthFormInputProps): JSX.Element => {
  return (
    <div className={styles.form_input_container}>
      <label className={styles.auth_form_label} htmlFor={`${type}_input`}>{field}</label>
      <input
        className={styles.auth_form_input}
        id={`${type}_input`}
        name={`${type}_input`}
        type='text'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthFormData({ ...authFormData, [type]: e.target.value })}
      />
    </div>
  )
}

export default AuthFormInput;