import { FormErrorsProps } from "../../../utilities/types/AccountSettingsInterface";
import styles from '../forms/AuthSettingsFormDropdown/AuthSettingsFormDropdown.module.css'

const FormErrors = ({ VALIDATION_HELPERS, emailDropDownActive, authFormData }: FormErrorsProps) => {
  const { emailsMatch, passwordsMatch, validEmail, emailFieldsFilledOut, passwordFieldsFilledOut } = VALIDATION_HELPERS

  return (
    <>
      {emailDropDownActive && !emailsMatch({ ...authFormData }) && emailFieldsFilledOut({ ...authFormData }) && <p className={styles.match_error}>Emails don't match</p>}
      {emailDropDownActive && !validEmail({ ...authFormData }) && emailFieldsFilledOut({ ...authFormData }) && <p className={styles.match_error}>Invalid Email</p>}
      {!emailDropDownActive && !passwordsMatch({ ...authFormData }) && passwordFieldsFilledOut({ ...authFormData }) && <p className={styles.match_error}>Passwords don't match</p>}
    </>
  )
}

export default FormErrors;