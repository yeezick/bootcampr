import './UpdateEmailConfirmation.scss'

export const UpdateEmailConfirmation = () => {
  return (
    <div className='update-email-confirmation'>
      <div className='content'>
        <h1>Email address updated!</h1>
        <h2>We sent you a confirmation email.</h2>
        <p>
          Verify your updated email address to log in. If you don't see it after
          a few minutes, please check your junk or spam folder.
        </p>
        <p>The link provided in the email will expire in 30 minutes.</p>
        {/* TODO: Add functionality to this button */}
        <p className='resend'>Re-send email</p>
      </div>
    </div>
  )
}
