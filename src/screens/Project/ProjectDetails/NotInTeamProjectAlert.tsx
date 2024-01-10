import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectParams } from 'interfaces'
import { GoAlert } from 'react-icons/go'
import './NotInTeamProjectAlert.scss'

export const NotInTeamProjectAlert = () => {
  const { projectId } = useParams<ProjectParams>()
  const [modalAlert, setModalAlert] = useState(false)

  const handleModalAlert = () => {
    if (projectId) {
      setModalAlert(true)
    }
  }

  return (
    <>
      {handleModalAlert && (
        <div className='not-in-team-alert'>
          <div className='nita-warning'>
            <GoAlert />
            <p>
              Bootcampr is now working to match you to a team. After your team
              of 3 SWEs and 2 UXDs is complete,
              <br /> we'll send an email with the date and time of your project
              kickoff meeting. (Approximately 1 - 2 weeks from today)
              <br />
              <br />
              In the meantime, explore the project details page. Other pages in
              Project Portal will be available once you are matched to a team.
              <br />
              <br />
              We love feedback. Please{' '}
              <a className='future-survey-link' href='_blank' target='_blank'>
                take this short survey
              </a>{' '}
              so we can improve.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
