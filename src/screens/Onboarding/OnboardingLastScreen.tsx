import React from 'react'
import './Onboarding.scss'

export const OnboardingLastScreen = () => {
  return (
    <div className='onboarding-container'>
      <div className='header'>
        <h1> You're a Bootcampr now!</h1>
      </div>
      <div className='whats-next'>
        <h2> What's next?</h2>
        <p>
          We'll send you an email when we are ready to begin the beta Bootcampr
          launch. The email will tell you the date and time of the first meeting
          with your project team. It will ask you to confirm you're availability
          to attend the first meeting.
        </p>
      </div>
      <div className='survey'>
        <p>
          We love feedback. Please take this short survey so we can improve.
        </p>
        <p>Your answers will be kept confidential. Thank you!</p>
      </div>
      <div className='project-details'>
        <p>You can view the project details at any time.</p>
        <button>View Project Details</button>
      </div>
    </div>
  )
}
