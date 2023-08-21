import styles from './SignIn.module.css'
import { useState, useEffect } from 'react'
import { signIn } from 'utils/api/users'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import { setAuthUser } from 'utils/redux/slices/userSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { SignInInterface } from 'interfaces/UserInterface'
import { GoAlert, GoVerified } from 'react-icons/go'
import { AlertBanners } from 'interfaces/AccountSettingsInterface'
import { storeUserProject } from 'utils/helpers/stateHelpers'

const SignIn: React.FC = (): JSX.Element => {
  // State Variables
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [formData, setFormData] = useState<SignInInterface>({
    email: '',
    password: '',
  })
  const [alertBanner, setAlertBanner] = useState<AlertBanners>({
    status: false,
    text: '',
    type: '',
  })
  const pathInfo = useLocation()

  // Constants
  const VALID_EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // Event Handlers
  // This is no longer being used from <EmailVerify />
  // Retaining logic only as an example for future use case
  useEffect(() => {
    if (location.state && location.state.status) {
      setAlertBanner({
        status: true,
        text: location.state.message,
        icon: <GoVerified />,
        type: 'success',
      })
      setTimeout(() => {
        setAlertBanner({ status: false })
        location.state = { success: false }
      }, 8000)
    }
    const newEmail = getEncodedEmail(pathInfo)
    setFormData({
      ...formData,
      email: newEmail,
    })
  }, [])

  const formValidation = (): void => {
    const validEmailAddressProvided = formData.email.match(VALID_EMAIL_REGEX)
    const passwordFieldFilledOut = formData.password !== ''

    if (validEmailAddressProvided && passwordFieldFilledOut)
      setButtonDisabled(false)
    else setButtonDisabled(true)
  }

  const handleFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmitForm = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    const response = await signIn(formData)

    if (response?.message) {
      setAlertBanner({
        status: true,
        text: response.message,
        icon: <GoAlert />,
        type: 'warning',
      })
      setTimeout(() => {
        setAlertBanner({ status: false })
      }, 12000)
      return
    }

    dispatch(setAuthUser(response))
    storeUserProject(dispatch, response.project)

    !response.onboarded
      ? navigate(`/onboarding/${response._id}`)
      : navigate(`/project/${response.project}`)
  }

  // Side Effects
  useEffect(() => {
    formValidation()
  }, [formData])

  return (
    <div>
      <div>
        {alertBanner.status ? (
          <div className={alertBanner.type}>
            {alertBanner.icon}
            <p>{alertBanner.text}</p>
          </div>
        ) : null}
      </div>
      <div className={styles.sign_in_container}>
        <form className={styles.sign_in_form} onSubmit={handleSubmitForm}>
          <div className={styles.sign_in_inputs}>
            <h3>Sign-In</h3>

            <div className={styles.flex_column}>
              <label className={styles.input_label} htmlFor='email'>
                Email
              </label>
              <input
                className={styles.input}
                name='email'
                id='email'
                type='email'
                onChange={handleFormDataChange}
                value={formData.email}
                required
              />
            </div>

            <div className={styles.flex_column}>
              <label className={styles.input_label} htmlFor='password'>
                Password
              </label>
              <input
                className={styles.input}
                name='password'
                id='password'
                type='password'
                onChange={handleFormDataChange}
                value={formData.password}
                required
              />
            </div>
          </div>

          <button disabled={buttonDisabled} type='submit'>
            Go
          </button>
        </form>
      </div>
    </div>
  )
}

const getEncodedEmail = pathInfo => {
  const { search } = pathInfo
  return atob(search.slice(1))
}

export { SignIn }
