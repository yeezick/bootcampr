import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectCompletedInfo,
  selectProject,
} from 'utils/redux/slices/projectSlice'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { useState } from 'react'

export const WhatsNextPage = () => {
  const completedInfo = useSelector(selectCompletedInfo)
  const navigate = useNavigate()
  const project = useSelector(selectProject)
  const projectID = project._id
  const [isDisabled, setIsDisabled] = useState(false)

  const handleSurvey = e => {
    e.preventDefault()
    alert('TBD Google Survey Path')
    setIsDisabled(true)
  }

  const handleCancel = () => {
    navigate(`/project/${projectID}`)
  }

  const teamPresenting = completedInfo.presenting

  return (
    <div
      className='project-completion-whats-next-page'
      aria-labelledby='pageHeader'
    >
      <h1 id='pageHeader'>Yay! You did it!</h1>
      <div className='content'>
        <section>
          <h2>What's next?</h2>
          {teamPresenting ? (
            <p>
              We’ll send all team members a meeting link for the presentation
              day. Your team can present in any way or format, so be creative!
            </p>
          ) : (
            <p>
              It was a pleasure having you and your teammates try out our soft
              launch Bootcampr product! We’ll be releasing our official product
              soon with more prompts for you to try. So, we are hoping we get to
              see you again in the future!
            </p>
          )}
        </section>
        <section>
          <h2>In the meantime...</h2>
          <p>
            We love feedback! Please answer a short survey about your experience
            with Bootcampr. We’ll send the survey to your team members, too.
            <br />
            <br />
            Upon completion, we’ll send you a certificate of completion by email
            for you to show off on LinkedIn!
          </p>
        </section>
      </div>
      <Stack className='btn-container'>
        <SecondaryButton
          handler={handleCancel}
          text='Back to Project Details'
        />
        <PrimaryButton
          aria-disabled={isDisabled}
          handler={handleSurvey}
          isDisabled={isDisabled}
          text='Answer survey'
        />
      </Stack>
    </div>
  )
}
