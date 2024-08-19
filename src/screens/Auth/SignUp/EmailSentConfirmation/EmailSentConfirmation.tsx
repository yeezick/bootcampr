import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isMobileWidth } from 'utils/helpers'
import { PrimaryButton } from 'components/Buttons'
import { UpdateEmailAddressLink } from '../../../../components/UpdateEmailAddressLink/UpdateEmailAddressLink'
import './EmailSentConfirmation.scss'

export const EmailSentConfirmation: React.FC = () => {
  const [email, setEmail] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('collabifyLocalUser'))
    return storedUser ? storedUser.email : ''
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      isMobileWidth() ? setIsMobile(true) : setIsMobile(false)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (isMobile) {
    return <MobileEmailSentConfirmation email={email} setEmail={setEmail} />
  } else {
    return <DesktopEmailSentConfirmation email={email} setEmail={setEmail} />
  }
}

const DesktopEmailSentConfirmation = ({ email, setEmail }) => {
  return (
    <div className='email-confirmation-container'>
      <p className='message-content subheader'>
        We sent a confirmation email to <span>{email}</span>.
      </p>
      <div className='message-content text'>
        <strong>Confirm your email address to log in</strong>
      </div>
      <div className='message-content text'>
        <p>It may be in your junk or spam folder.</p>
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

const MobileEmailSentConfirmation = ({ email, setEmail }) => {
  const navigate = useNavigate()
  const handleRouteToHomepage = () => navigate('/')

  return (
    <div className='email-confirmation-container'>
      <p className='message-content subheader'>
        We sent a confirmation email to <span>{email}</span>.
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
        <img alt='A person smiles from behind a laptop while a rocket launches in the background' />
      </div>
      <PrimaryButton
        label="Visit Collabify's homepage'"
        onClick={handleRouteToHomepage}
      />
    </div>
  )
}
