import { useEffect, useState } from 'react'
import './EmailSentConfirmation.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneUser, resendNewEmailLink } from 'utils/api'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { SnackBarSeverity } from 'interfaces/SnackBarToast'
import { selectUserEmail } from 'utils/redux/slices/userSlice'
import { PrimaryButton } from 'components/Buttons'
import { isMobileWidth } from 'utils/helpers'
import accountCreated from '../../../../assets/Images/accountCreated.png'
import { UpdateEmailAddressLink } from './UpdateEmailAddressLink'
import { useState } from 'react'

export const EmailSentConfirmation: React.FC = () => {
  const [email, setEmail] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('bootcamprLocalUser'))
    return storedUser ? storedUser.email : ''
  })
  const dispatch = useAppDispatch()
  const { id: newUserId } = useParams()
  const [userEmail, setUserEmail] = useState(useAppSelector(selectUserEmail))
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const { email } = await getOneUser(newUserId)
        setUserEmail(email)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (!userEmail) {
      fetchUserEmail()
    }
  }, [newUserId, userEmail])

  useEffect(() => {
    const handleResize = () => {
      isMobileWidth() ? setIsMobile(true) : setIsMobile(false)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //TODO: replace this with a modal to complete update email flow (BC-753)
  const handleResendEmailClick = async () => {
    try {
      const res: any = await resendNewEmailLink(newUserId)

      let toastSeverity: SnackBarSeverity = null

      if (res.status === 200) {
        toastSeverity = 'success'
      } else {
        toastSeverity = 'error'
      }
      dispatch(
        createSnackBar({
          message: res.data.friendlyMessage,
          severity: toastSeverity,
        })
      )
    } catch (error) {
      console.error('Error resending new email verification link.', error)
    }
  }

  if (isMobileWidth()) {
    return (
      <MobileEmailSentConfirmation
        handleResendEmailClick={handleResendEmailClick}
        userEmail={userEmail}
      />
    )
  } else {
    return (
      <DesktopEmailSentConfirmation
        handleResendEmailClick={handleResendEmailClick}
        userEmail={userEmail}
      />
    )
  }
}

const DesktopEmailSentConfirmation = ({
  handleResendEmailClick,
  userEmail,
}) => {
  return (
    <div className='email-confirmation-container'>
      <p className='message-content header'>
        Congrats! You've taken the first step.
      </p>
      <p className='message-content subheader'>
        We sent a confirmation email to <span>{email}</span>.
      </p>
      <div className='message-content text'>
        <p>It may be in your junk or spam folder.</p>
      </div>
      <div className='message-content confirm'>
        <p>Confirm your email address to log in.</p>
      </div>
      <div className='message-content update-email'>
        <UpdateEmailAddressLink setEmail={setEmail} />
        <span> if it's incorrect.</span>
      </div>
      <div className='img-container'>
        <img alt='A person jumps in the air in celebration' />
      </div>
    </div>
  )
}

const MobileEmailSentConfirmation = ({ handleResendEmailClick, userEmail }) => {
  const navigate = useNavigate()
  const handleRouteToHomepage = () => navigate('/')

  return (
    <div className='email-confirmation-container'>
      <p className='message-content subheader'>
        We sent a confirmation email to <span>{userEmail}</span>.
      </p>
      <div className='message-content text'>
        Important! We are not optimized for mobile yet.
      </div>
      <div className='message-content content'>
        Please confirm your email address on a desktop or laptop to log in.{' '}
      </div>
      <div className='message-content update-email'>
        <UpdateEmailAddressLink setEmail={setEmail} />
        <span> if it's incorrect.</span>
      </div>
      <div className='img-container'>
        <img alt='A person jumps in the air in celebration' />
      </div>
      <PrimaryButton
        text="Visit Bootcampr's homepage'"
        handler={handleRouteToHomepage}
      />
    </div>
  )
}

const MobileEmailSentConfirmation = ({ handleResendEmailClick, userEmail }) => {
  const navigate = useNavigate()
  const handleRouteToHomepage = () => navigate('/')

  return (
    <div className='email-confirmation-container'>
      <p className='message-content subheader'>
        We sent a confirmation email to <span>{userEmail}</span>.
      </p>
      <div className='message-content text'>
        Important! We are not optimized for mobile yet.
      </div>
      <div className='message-content content'>
        Please confirm your email address on a desktop or laptop to log in.{' '}
      </div>
      <div className='message-content update-email'>
        <button onClick={handleResendEmailClick}>
          Update your email address
        </button>
        <span>if it's incorrect.</span>
      </div>
      <div className='img-container'>
        <img alt='A person jumps in the air in celebration' />
      </div>
      <PrimaryButton
        text="Visit Bootcampr's homepage'"
        handler={handleRouteToHomepage}
      />
    </div>
  )
}
