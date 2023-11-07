import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from 'utils/redux/hooks'
import { signIn } from 'utils/api'
import { setAuthUser } from 'utils/redux/slices/userSlice'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { SignInInterface } from 'interfaces/UserInterface'
import { AlertBanners } from 'interfaces/AccountSettingsInterface'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import { ForgotPasswordModal } from '../ResetPassword/ForgotPasswordModal'
import { toggleVisiblity } from 'components/Inputs'
import { GoAlert, GoVerified } from 'react-icons/go'
import loginBanner from '../../../assets/images/login-image.png'
import { FormControl, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import './SignIn.scss'

const SignIn: React.FC = (): JSX.Element => {
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
  const [inputType, setInputType] = useState('password')
  const pathInfo = useLocation()
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)

  const VALID_EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const openForgotModal = () => setForgotPasswordModal(!forgotPasswordModal)
  const closeForgotModal = () => setForgotPasswordModal(false)

  // Event Handlers
  // This is no longer being used from <EmailVerify />
  // Retaining logic only as an example for future use case
  // TODO: Remove this logic? (reach out to Eric)
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

    const { newEmail, status } = getEncodedEmail(pathInfo)

    if (status === 'SUCCESS' && newEmail.length > 0) {
      dispatch(
        createSnackBar({
          isOpen: true,
          message:
            'Your new email has successfully been updated in the database. Please log in with your new email address.',
          duration: 5000,
          vertical: 'top',
          horizontal: 'center',
          snackbarStyle: '',
          severity: 'success',
        })
      )
      setFormData({
        ...formData,
        email: newEmail,
      })
    } else if (newEmail.length > 0) {
      dispatch(
        createSnackBar({
          isOpen: true,
          message:
            'There was an error updating your email in the database. Please try again or contact support.',
          duration: 5000,
          vertical: 'top',
          horizontal: 'center',
          snackbarStyle: '',
          severity: 'error',
        })
      )
    }
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

  useEffect(() => {
    formValidation()
  }, [formData])

  const nextButtonStyle = `${
    buttonDisabled ? 'sign_in_btn' : 'sign_in_btn_active'
  }`

  return (
    <div>
      <div className='sign_in'>
        <div className='sign_in_container'>
          <img src={loginBanner} alt='login-banner' />
          <form className='sign_in_form' onSubmit={handleSubmitForm}>
            <div className='sign_in_content'>
              <h1>Log in</h1>
              {alertBanner.status ? (
                <div className='sign_in_alert'>
                  <div className={alertBanner.type}>
                    {alertBanner.icon}
                    <p>{alertBanner.text}</p>
                  </div>
                </div>
              ) : null}
              <div className='sign_in_column'>
                <label className='sign_in_label' htmlFor='email'>
                  Email address
                </label>
                <input
                  className='input'
                  name='email'
                  id='email'
                  type='email'
                  onChange={handleFormDataChange}
                  value={formData.email}
                  required
                />
              </div>

              <FormControl variant='standard'>
                <div className='sign_in_column'>
                  <label className='sign_in_label' htmlFor='password'>
                    Password
                  </label>
                  <div className='sign_in_adorned_input'>
                    <input
                      className='input'
                      name='password'
                      id='password'
                      type={inputType}
                      onChange={handleFormDataChange}
                      value={formData.password}
                      required
                    />
                    <IconButton
                      className='eyecon'
                      aria-label='toggle password visibility'
                      onClick={() => toggleVisiblity(inputType, setInputType)}
                    >
                      {inputType === 'password' ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </div>
                </div>
              </FormControl>
            </div>
            <div className='sign_in_forgot_pswd' onClick={openForgotModal}>
              <p>Forgot your Password?</p>
              {forgotPasswordModal && (
                <ForgotPasswordModal
                  onClose={closeForgotModal}
                  forgotPasswordModal={forgotPasswordModal}
                  onSuccessMessage='Email sent!'
                  onFailureMessage='An error occurred. Please check entered email and try again.'
                />
              )}
            </div>
            <div>
              <button
                className={nextButtonStyle}
                disabled={buttonDisabled}
                type='submit'
              >
                Log in
              </button>
            </div>
            <div className='sign_in_redirect_link'>
              <p>
                Don't have an account? <Link to='/sign-up'>Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getEncodedEmail = pathInfo => {
  const { search } = pathInfo
  const pathArr = search.slice(1).split('&')

  return {
    newEmail: atob(pathArr[0]),
    status: pathArr[1] === 'status=FAIL' ? 'FAIL' : 'SUCCESS',
  }
}

export { SignIn }
