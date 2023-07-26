import React from 'react'
import './Onboarding.scss'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'

//TODO: make CSS true to Figma, inspect margins//

export const OnboardingLastScreen = ({ handlePageNavigation }) => {
  const authUser = useAppSelector(selectAuthUser)

  const handlePrevious = () => {
    handlePageNavigation('previous')
  }

  return (
    <div className='onboarding-lastscreen-container'>
      <div className='lastscreen-text-container'>
        <div className='lastscreen-header'>
          <h1> You're a Bootcampr now!</h1>
        </div>
        <div className='whats-next'>
          <h2> What's next?</h2>
          <p>
            Bootcampr is now working to match you to a team. After your team of
            3 SWEs and 2UXDS is complete, we'll send an email with the date and
            time of your project kickoff meeting.(1-4 weeks from today)
          </p>
        </div>
        <div className='lastscreen-survey'>
          <p className='lastscreen-feedback'>
            We love feedback. Please take <span> this short survey </span> so we
            can improve.
          </p>
          <p>Your answers will be kept confidential. Thank you!</p>
        </div>
        <div className='project-details'>
          <p>You can view the project details at any time.</p>
          <Link className='link' to={`/project/${authUser.project}`}>
            <button className='project-details-btn'>
              View project details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
