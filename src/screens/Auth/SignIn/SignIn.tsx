import './SignIn.scss'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch } from 'utils/redux/hooks'
import { signIn } from 'utils/api'
import { setAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'
import { SignInInterface } from 'interfaces/UserInterface'
import { AlertBanners } from 'interfaces/AccountSettingsInterface'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import { ForgotPasswordLink } from 'screens/AccountSettings/components/ForgotPasswordLink'
import { toggleVisiblity } from 'components/Inputs'
import { GoAlert } from 'react-icons/go'
import { FormControl, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import login from '../../../assets/Images/login.png'
import './SignIn.scss'
import { buildProjectPortal } from 'utils/helpers'
import { setPortal } from 'utils/redux/slices/userInterfaceSlice'
import { isSandboxId, isWaitlistExperience } from 'utils/helpers/taskHelpers'
import { PrimaryButton } from 'components/Buttons'

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

  const VALID_EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    const { payment, onboarded, projects } = response

    if (payment.experience === 'unchosen') {
      navigate('/payment/choose-experience')
    } else if (payment.experience === 'waitlist' && !onboarded) {
      navigate(`/onboarding`)
    } else if (
      isSandboxId(payment.experience) ||
      (isWaitlistExperience(payment.experience) &&
        projects.activeProject === null)
    ) {
      navigate('/project/sandbox')
      storeUserProject(dispatch, 'sandbox')
      dispatch(setPortal(buildProjectPortal('sandbox')))
      dispatch(
        updateAuthUser({
          project: 'sandbox',
          projects: { activeProject: 'sandbox' },
        })
      )
    } else {
      navigate(`/project/${projects.activeProject}`)
      storeUserProject(dispatch, projects.activeProject)
      dispatch(setPortal(buildProjectPortal(projects.activeProject)))
    }
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
          <img src={login} alt='a person seated at a desk types on a laptop' />
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
                  placeholder='email@email.com'
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
            <ForgotPasswordLink hyperlinkText='Forgot your password?' />
            <PrimaryButton
              label='Log in'
              disabled={buttonDisabled}
              fullWidth
              style={{ marginTop: '32px' }}
              type='submit'
            />
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
