import './EmailSentConfirmation.scss'
import accountCreated from '../../../../assets/Images/accountCreated.png'
import { UpdateEmailAddressLink } from './UpdateEmailAddressLink'
import { useState } from 'react'

export const EmailSentConfirmation: React.FC = () => {
  const [email, setEmail] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('bootcamprLocalUser'))
    return storedUser ? storedUser.email : ''
  })

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
        <img
          src={accountCreated}
          alt='A person jumps in the air in celebration'
        />
      </div>
    </div>
  )
}
