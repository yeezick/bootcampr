import {
  AuthSettingsFormDropdownProps,
  EmailFormData,
  PasswordFormData,
} from '../../../utilities/types/AccountSettingsInterface'
import {
  VALIDATION_HELPERS,
  validateEmailDropdown,
  validatePasswordDropdown,
} from '../helper/validation'
import { initialEmailFormData, initialPasswordFormData } from '../helper/data'
import { useEffect, useState } from 'react'
import { AuthFormInput } from './AuthFormInput'
import FormErrors from './FormErrors'
import { UpdateFeedback } from './UpdateFeedback'
import styles from '../css/AuthSettingsFormDropdown.module.css'
import { useParams } from 'react-router-dom'

const AuthSettingsFormDropdown = ({
  fields,
  type,
}: AuthSettingsFormDropdownProps): JSX.Element => {
  // Constants
  const emailDropDownActive: boolean = type[1] === 'newEmail'
  const { id } = useParams()

  // State Variables
  const [authFormData, setAuthFormData] = useState<
    EmailFormData | PasswordFormData
  >(emailDropDownActive ? initialEmailFormData : initialPasswordFormData)
  const [updateStatus, setUpdateStatus] = useState<string>('pending')
  const [disableButton, setDisableButton] = useState<boolean>(true)

  // Event Handlers
  const handleUpdateCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    const { fetchAPI } = VALIDATION_HELPERS
    const { status }: any = await fetchAPI(
      emailDropDownActive,
      authFormData,
      id
    )

    if (status === 201) return setUpdateStatus('authorized')
    if (status === 401) return setUpdateStatus('unauthorized')

    setUpdateStatus('error')
  }

  // Side Effects
  useEffect(() => {
    if (emailDropDownActive)
      validateEmailDropdown({ ...authFormData }, setDisableButton)
    else validatePasswordDropdown({ ...authFormData }, setDisableButton)
  }, [authFormData])

  return (
    <div className={styles['form-container']}>
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
          type='submit'
          className={styles['auth-form-submit-button']}
        >
          Update
        </button>

        <FormErrors
          emailDropDownActive={emailDropDownActive}
          authFormData={authFormData}
        />
        {updateStatus !== 'pending' && (
          <UpdateFeedback updateStatus={updateStatus} />
        )}
      </form>
    </div>
  )
}

export default AuthSettingsFormDropdown
