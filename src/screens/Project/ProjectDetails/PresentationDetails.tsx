import { Stack } from '@mui/material'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import { useAppSelector } from 'utils/redux/hooks'
import { getUserTimezone } from 'utils/redux/slices/userSlice'
import { selectPresentationDate } from 'utils/redux/slices/projectSlice'
import {
  formatPresentationDate,
  convertPresentationDateUserTZ,
} from 'utils/helpers/projectHelpers'
import './PresentationDetails.scss'
import { convertOffsetToTimezone } from 'utils/data/timeZoneConstants'

export const PresentationDetails = () => {
  const userTimezoneOffset = useAppSelector(getUserTimezone)
  const presentationDateEST = useAppSelector(selectPresentationDate)
  const isPresentationDateExist = presentationDateEST.startDateEST.isValid()
  let presentationDate

  if (isPresentationDateExist) {
    const userTimezoneInfo = convertOffsetToTimezone[userTimezoneOffset]
    const { startDate, endDate } = convertPresentationDateUserTZ(
      presentationDateEST,
      userTimezoneInfo.timezone
    )
    presentationDate = formatPresentationDate(
      startDate,
      endDate,
      userTimezoneInfo.abbr
    )
  } else {
    presentationDate = 'To be determined'
  }

  return (
    <>
      <section className='details-container'>
        <h1 id='heading'>Project Presentation</h1>
        <Stack spacing={'8px'} className='details-content'>
          <div className='detail'>
            <CalendarTodayOutlinedIcon aria-label='Calendar Icon' />
            <p>{presentationDate}</p>
          </div>
          <div className='detail'>
            <AccessTimeOutlinedIcon aria-label='Clock Icon' />
            <p>15 min presentation</p>
          </div>
          <div className='detail'>
            <VideocamOutlinedIcon aria-label='Camera Icon' />
            <p>Meeting details will be provided upon confirmation</p>
          </div>
        </Stack>
        <p className='details-brief'>
          Present your team’s work to professional Product Managers, UX
          Designers, and Software Engineers.
        </p>
      </section>

      <section className='faq-container'>
        <h2>Why present your project?</h2>
        <ul>
          <li>
            Hone your presentation skills in front of the Bootcampr product
            team.
          </li>
          <li>
            Get feedback from people with experience launching a new product.
          </li>
          <li>Identify room for improvements.</li>
          <li>
            Use the feedback you receive to present your work in interviews with
            confidence!
          </li>
        </ul>
      </section>
      <section className='faq-container'>
        <h2>Who is presenting your project?</h2>
        <ul>
          <li>At least one person must participate to present team’s work.</li>
          <li>
            Participation by all team members is not required but encouraged.
          </li>
        </ul>
      </section>
    </>
  )
}
