import { FormErrorsProps } from "../../../utilities/types/AccountSettingsInterface";
import { VALIDATION_HELPERS } from "../helper/validation";
import styles from '../css/AuthSettingsFormDropdown.module.css'

const FormErrors = ({ emailDropDownActive, authFormData }: FormErrorsProps) => {

  const { emailsMatch, passwordsMatch, validEmail, emailFieldsFilledOut, passwordFieldsFilledOut } = VALIDATION_HELPERS

  const emailMatchError = () => {
    if (emailDropDownActive && !emailsMatch({ ...authFormData }) && emailFieldsFilledOut({ ...authFormData })) {
      return <p className={styles['match-error']}>Emails don't match</p>
    }
  }

  const invalidEmailError = () => {
    if (emailDropDownActive && !validEmail({ ...authFormData }) && emailFieldsFilledOut({ ...authFormData })) {
      return <p className={styles['match-error']}>Invalid Email</p>
    }
  }

  const passwordMatchError = () => {
    if (!emailDropDownActive && !passwordsMatch({ ...authFormData }) && passwordFieldsFilledOut({ ...authFormData })) {
      return <p className={styles['match-error']}>Passwords don't match</p>
    }
  }

  return (
    <>
      {emailMatchError()}
      {invalidEmailError()}
      {passwordMatchError()}
    </>
  )
}

export default FormErrors;