import { useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectPresentationDate,
} from 'utils/redux/slices/projectSlice'
import './PresentationInfoBanner.scss'
import { getUserTimezone } from 'utils/redux/slices/userSlice'
import { convertOffsetToTimezone } from 'utils/data/timeZoneConstants'
import {
  convertPresentationDateUserTZ,
  getLastCallForPresentation,
} from 'utils/helpers'

export const PresentationInfoBanner = () => {
  const projectSubmissionInfo = useAppSelector(selectCompletedInfo)
  const { presenting, deployedUrl } = projectSubmissionInfo
  const userTimezoneOffset = useAppSelector(getUserTimezone)
  const presentationDate = useAppSelector(selectPresentationDate)
  const userTimezoneInfo = convertOffsetToTimezone[userTimezoneOffset]
  const { startDate } = convertPresentationDateUserTZ(
    presentationDate,
    userTimezoneInfo?.timezone
  )
  const presentationDateLastCall = getLastCallForPresentation(
    startDate,
    userTimezoneInfo?.abbr
  )

  return (
    <div className='presentation-info-banner'>
      <p>
        (i) Your team will{presenting ? ' ' : ' not '}be presenting. You can
        update participation status
        {} until {presentationDateLastCall}.
      </p>
      <p>
        Your submitted project URL is:{' '}
        <span className='deployed-url'>{deployedUrl}</span>. You can update your
        project URL {}.
      </p>
    </div>
  )
}
