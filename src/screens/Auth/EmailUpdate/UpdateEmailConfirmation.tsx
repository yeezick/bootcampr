import './UpdateEmailConfirmation.scss'
import { useLocation } from 'react-router-dom'
import { getEncodedEmail } from '../SignIn/SignIn'
import { UpdateEmailAddressLink } from '../../../components/UpdateEmailAddressLink/UpdateEmailAddressLink'
import { useState } from 'react'

export const UpdateEmailConfirmation = () => {
  const pathInfo = useLocation()
  const { newEmail } = getEncodedEmail(pathInfo)
  const [email, setEmail] = useState(newEmail)

  return (
    <div className='upd-email-confirmation-container'>
      <p className='upd-message-content header'>
        You've updated your email address!
      </p>
      <p className='upd-message-content subheader'>
        We sent a confirmation email to <span>{email}</span>.
      </p>
      <div className='upd-message-content text'>
        <p>It may be in your junk or spam folder.</p>
      </div>
      <div className='upd-message-content confirm'>
        <p>Confirm your updated email address to log in.</p>
      </div>
      <div className='upd-message-content update-email'>
        <UpdateEmailAddressLink setEmail={setEmail} />
        <span> if it's incorrect.</span>
      </div>
    </div>
  )
}
