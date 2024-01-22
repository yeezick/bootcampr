import './WhatsNext.scss'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { PrimaryButton } from 'components/Buttons'

export const WhatsNext = () => {
  const authUser = useAppSelector(selectAuthUser)
  const navigate = useNavigate()

  const handleViewProjectDetails = () => {
    // If user is not yet assigned a project, route them to the generic Project Details page
    const projectSlug = authUser.project ? authUser.project : 'not-yet-assigned'
    navigate(`/project/${projectSlug}`)
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
            3 SWEs and 2 UXDs is complete, we'll send an email with the date and
            time of your project kickoff meeting. (Approximately 1 - weeks from
            today)
          </p>
        </div>
        <div className='lastscreen-survey'>
          <p className='lastscreen-feedback'>
            We love feedback. Please take&ensp;
            <span>
              <a href='https://forms.gle/vfdAQpNMv2tZBwBB6' target='_blank'>
                this short survey
              </a>
            </span>
            &ensp;so we can improve.
          </p>
          <p>Your answers will be kept confidential. Thank you!</p>
        </div>
        <div className='project-details'>
          <p>You can view the project details at any time.</p>
          <PrimaryButton
            handler={handleViewProjectDetails}
            paginatorBtn={false}
            text='View project details'
          />
        </div>
      </div>
    </div>
  )
}
