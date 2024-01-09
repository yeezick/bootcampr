import { RiGoogleLine } from 'react-icons/ri'
import { useAppSelector } from 'utils/redux/hooks'
import { selectHangoutLink } from 'utils/redux/slices/calendarSlice'

export const DisplayMeetingLink = () => {
  const hangoutLink = useAppSelector(selectHangoutLink)
  return (
    hangoutLink && (
      <>
        <RiGoogleLine className='google-meet-icon' size={23} />
        <a
          className='meeting-link'
          href={hangoutLink}
          target='_blank'
          rel='noreferrer'
        >
          Google Meet Link
        </a>
      </>
    )
  )
}
