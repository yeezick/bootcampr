import './UpdateEmailConfirmation.scss'
import { useLocation } from 'react-router-dom'
import { getEncodedEmail } from '../SignIn/SignIn'
import { UpdateEmailAddressLink } from '../SignUp/EmailSentConfirmation/UpdateEmailAddressLink'
import { useState } from 'react'

export const UpdateEmailConfirmation = () => {
  const pathInfo = useLocation()
  const { newEmail } = getEncodedEmail(pathInfo)
  const [email, setEmail] = useState(newEmail)

  return (
    <div className='update-email-confirmation'>
      <div className='content'>
        <h1>You've updated your email address!</h1>
        <h2>
          We sent a confirmation email to <span>{email}</span>.
        </h2>
        <p>It may be in your junk or spam folder.</p>
        <h3>Confirm your email address to log in.</h3>
        <div className='message-content update-email'>
          <UpdateEmailAddressLink setEmail={setEmail} />
          <span> if it's incorrect.</span>
        </div>
      </div>
    </div>
  )
}
