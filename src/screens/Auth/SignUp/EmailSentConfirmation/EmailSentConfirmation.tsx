import './EmailSentConfirmation.scss'

export const EmailSentConfirmation: React.FC = () => {
  return (
    <div className='email-confirmation-container'>
      <p className='message-content header'>
        Congrats! You've taken the first step.
      </p>
      <p className='message-content subheader'>
        We sent you a confirmation email.
      </p>
      <div className='message-content text'>
        <p>
          Verify your email address to log in. If you don’t see it after a few
          minutes, please check your junk or spam folder.
        </p>
        <p>The link provided in the email will expire in 30 minutes. </p>
      </div>
      <button className='resend-link'>Re-send email</button>
    </div>
  )
}
