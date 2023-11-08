import './SuccessScreen.scss'
import { Button } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'
import { forgotPasswordEmailVerification, getOneUser } from 'utils/api'
import { useAppDispatch } from 'utils/redux/hooks'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export interface SuccessScreenValues {
  heading: string
  subHeading?: string
  body: string
  body2?: string
  hyperlinkLabel?: string
  hyperlinkAction?: any
  buttonLabel?: string
  buttonAction?: any
}

const enum ResType {
  success = 'success',
  error = 'error',
}

export const SuccessScreen = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userId } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const screen = queryParams.get('screen')
  const [values, setValues] = useState<SuccessScreenValues>({
    heading: '',
    subHeading: '',
    body: '',
    body2: '',
    hyperlinkLabel: '',
    hyperlinkAction: null,
    buttonLabel: '',
    buttonAction: null,
  })

  const handleToast = (resType: 'success' | 'error') => {
    if (resType === 'success') {
      dispatch(
        createSnackBar({
          isOpen: true,
          message: 'Email sent!',
          duration: 5000,
          severity: 'success',
          horizontal: 'right',
        })
      )
    }

    if (resType === 'error') {
      dispatch(
        createSnackBar({
          isOpen: true,
          message:
            'There was an error sending the email. Please try again or contact support.',
          duration: 6000,
          severity: 'error',
          horizontal: 'right',
        })
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
  }

  useEffect(() => {
    if (screen && successScreenData[screen]) {
      setValues(successScreenData[screen])
    }
  }, [screen])

  return (
    <div className='success-screen container'>
      <div className='success-screen main-content'>
        <div className='success-screen headers'>
          {values.heading && (
            <div className='headers header'>{values.heading}</div>
          )}
          {values.subHeading && (
            <div className='headers subheader'>{values.subHeading}</div>
          )}
        </div>
        <div className='success-screen body'>
          {values.body && <div className='body body1'>{values.body}</div>}
          {values.body2 && <div className='body body2'>{values.body2}</div>}
        </div>
      </div>
      <div className='success-screen actions'>
        {values.buttonLabel && (
          <Button className='actions button' onClick={values.buttonAction}>
            {values.buttonLabel}
          </Button>
        )}
        {values.hyperlinkLabel && (
          <div className='actions hyperlink' onClick={values.hyperlinkAction}>
            {values.hyperlinkLabel}
          </div>
        )}
      </div>
    </div>
  )
}
