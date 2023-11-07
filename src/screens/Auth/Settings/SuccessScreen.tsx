import { Button } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './Settings.scss'
import { useEffect, useState } from 'react'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'
import { resendNewEmailLink } from 'utils/api'
import { AxiosResponse } from 'axios'

export interface SuccessScreenValues {
  heading: string
  subHeading?: string
  body: string
  body2?: string
  hyperlinkLabel?: string
  hyperlinkAction?: any
  buttonLabel?: string
  buttonAction?: any // Adjust the type as needed
}

export const SuccessScreen = () => {
  const navigate = useNavigate()
  const { id: userId } = useParams()
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

  const successScreenData: Record<string, SuccessScreenValues> = {
    [SuccessQueryParam.resetPasswordEmail]: {
      heading: 'Email sent!',
      subHeading: 'Follow the instructions in the email',
      body: `If you don't see it after a few minutes, please check your junk or spam folder.`,
      body2: 'The link in the email will expire in 30 minutes.',
      hyperlinkLabel: 'Re-send email',
      hyperlinkAction: () => resendNewEmailLink(userId),
    },
  }

  useEffect(() => {
    if (screen && successScreenData[screen]) {
      setValues(successScreenData[screen])
    }
  }, [screen])

  const handleClick = () => {
    navigate('/sign-in')
  }
  return (
    <div className='updated-password-message'>
      {values.heading && <p className='message header'>{values.heading}</p>}
      {values.subHeading && (
        <p className='message subHeader'>{values.subHeading}</p>
      )}
      {values.body && <p className='message body'>{values.body}</p>}
      {values.body2 && <p className='message body2'>{values.body2}</p>}
      {values.buttonLabel && (
        <Button className='message button' onClick={values.buttonAction}>
          {values.buttonLabel}
        </Button>
      )}
      {values.hyperlinkLabel && (
        <div onClick={values.hyperlinkAction}>{values.hyperlinkLabel}</div>
      )}
    </div>
  )
}
