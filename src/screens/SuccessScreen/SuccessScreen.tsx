import './SuccessScreen.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  ResType,
  SuccessQueryParam,
  emptySuccessScreenValues,
} from 'utils/data/authSettingsConstants'
import { forgotPasswordEmailVerification, getOneUser } from 'utils/api'
import { useAppDispatch } from 'utils/redux/hooks'
import { SuccessScreenValues } from 'interfaces/AccountSettingsInterface'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { PrimaryButton } from 'components/Buttons'

export const SuccessScreen = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userId } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const screen = queryParams.get('screen')
  const [values, setValues] = useState<SuccessScreenValues>(
    emptySuccessScreenValues
  )
  const {
    heading,
    subHeading,
    body,
    body2,
    hyperlinkLabel,
    hyperlinkAction,
    buttonLabel,
    buttonAction,
  } = values

  const handleToast = (resType: 'success' | 'error') => {
    if (resType === 'success') {
      dispatch(successSnackbar('Email sent!'))
    }

    if (resType === 'error') {
      dispatch(
        errorSnackbar(
          'There was an error sending the email. Please try again or contact support.'
        )
      )
    }
  }

  const resendForgotPasswordEmail = async () => {
    const { email } = await getOneUser(userId)
    const res = await forgotPasswordEmailVerification(email)

    if (res && !res.data.status) {
      handleToast(ResType.error)
    } else {
      handleToast(ResType.success)
    }
  }

  const successScreenData: Record<string, SuccessScreenValues> = {
    [SuccessQueryParam.resetPasswordEmail]: {
      heading: 'Email sent!',
      subHeading: 'Follow the instructions in the email',
      body: `If you don't see it after a few minutes, please check your junk or spam folder.`,
      body2: 'The link in the email will expire in 30 minutes.',
      hyperlinkLabel: 'Re-send email',
      hyperlinkAction: () => resendForgotPasswordEmail(),
    },
    [SuccessQueryParam.resetPassword]: {
      heading: `You've reset your password!`,
      body: 'Log in with your new password to have more fun working on a project with a cross-functional team.',
      buttonLabel: 'Log in',
      buttonAction: () => navigate('/sign-in'),
    },
    [SuccessQueryParam.changePassword]: {
      heading: `You've changed your password!`,
      body: `Log in with your new password to have more fun working on a project with a cross-functional team.`,
      buttonLabel: 'Log in',
      buttonAction: () => navigate('/sign-in'),
    },
  }

  useEffect(() => {
    if (screen && successScreenData[screen]) {
      setValues(successScreenData[screen])
    }
  }, [screen])

  const containerClass =
    screen === SuccessQueryParam.resetPasswordEmail
      ? 'container-spaced'
      : 'container'

  const mainContentClass =
    screen === SuccessQueryParam.resetPasswordEmail
      ? 'main-content-spaced'
      : 'main-content'

  const bodyClass =
    screen === SuccessQueryParam.resetPasswordEmail ? 'body-wide' : 'body'

  return (
    <div className={`success-screen ${containerClass}`}>
      <div className={`success-screen ${mainContentClass}`}>
        <div className='success-screen headers'>
          {heading && <div className='headers header'>{heading}</div>}
          {subHeading && <div className='headers subheader'>{subHeading}</div>}
        </div>
        <div className={`success-screen ${bodyClass}`}>
          {body && <div className='body body1'>{body}</div>}
          {body2 && <div className='body body2'>{body2}</div>}
        </div>
      </div>
      <div className='success-screen actions'>
        {buttonLabel && (
          <PrimaryButton
            className='actions button'
            onClick={buttonAction}
            label={buttonLabel}
          />
        )}
        {hyperlinkLabel && (
          <div className='actions hyperlink' onClick={hyperlinkAction}>
            {hyperlinkLabel}
          </div>
        )}
      </div>
    </div>
  )
}
