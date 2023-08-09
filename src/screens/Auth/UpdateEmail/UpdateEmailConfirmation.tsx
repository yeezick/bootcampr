import React from 'react'
import './UpdateEmailConfirmation.scss'

export default function UpdateEmailConfirmation() {
  return (
    <div className='update-email-confirmation'>
      <div className='content'>
        <h1>Email address updated!</h1>
        <h2>We sent you a confirmation email.</h2>
        <p>
          Verify your updated email address to log in. If you don't see it after
          a few minutes, please check your junk or span folder.
        </p>
        <p>The link provided in the email will expire in 30 minutes.</p>
        <p className='resend'>Re-send email</p>
      </div>
    </div>
  )
}
