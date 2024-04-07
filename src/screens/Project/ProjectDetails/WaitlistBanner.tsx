import { GoAlert } from 'react-icons/go'
import './WaitlistBanner.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserProjectId } from 'utils/redux/slices/userSlice'

export const WaitlistBanner = () => {
  const projectId = useAppSelector(selectUserProjectId)
  const shouldDisplayBanner = projectId ? false : true

  return (
    <>
      {shouldDisplayBanner && (
        <div className='not-in-team-alert'>
          <div className='nita-warning'>
            <GoAlert />
            <p>
              Bootcampr is now working to match you to a team. After your team
              of 3 SWEs and 2 UXDs, and 1 PM is complete, we'll send an email
              with the date and time of your project kickoff meeting.
              (Approximately 1 - 2 weeks from today).
              <br />
              <br />
              In the meantime, explore the product details page. Other pages in
              Project Portal will be available once you are matched to a team.
              <br />
              <br />
              We love feedback. Please&nbsp;
              <a
                className='future-survey-link'
                href='https://forms.gle/a6KGMe1SJnMD6V8a9'
                target='_blank'
              >
                take this short survey
              </a>
              &nbsp;so we can improve.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
