import { useLocation, useNavigate } from 'react-router-dom'
import { updateEmailAddress } from '../Settings/Email'
import './UpdateEmailConfirmation.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { useSelector } from 'react-redux'
import { selectAuthUser, selectUserEmail } from 'utils/redux/slices/userSlice'
import { getEncodedEmail } from '../SignIn/SignIn'

export const UpdateEmailConfirmation = () => {
  const navigate = useNavigate()
  const authUser = useAppSelector(selectAuthUser)
  const currentUserEmail = useSelector(selectUserEmail)
  const pathInfo = useLocation()

  const { newEmail } = getEncodedEmail(pathInfo)

  return (
    <div className='update-email-confirmation'>
      <div className='content'>
        <h1>Email address updated!</h1>
        <h2>We sent you a confirmation email.</h2>
        <p>
          Verify your updated email address to log in. If you don't see it after
          a few minutes, please check your junk or spam folder.
        </p>
        <p>The link provided in the email will expire in 30 minutes.</p>
        {/* TODO: Add functionality to this button */}
        <p
          className='resend'
          onClick={() =>
            updateEmailAddress(currentUserEmail, newEmail, authUser, navigate)
          }
        >
          Re-send email
        </p>
      </div>
    </div>
  )
}
