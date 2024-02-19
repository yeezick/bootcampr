import './UpdateEmailConfirmation.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateEmailAddress } from '../Settings/Email'
import { useAppSelector } from 'utils/redux/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthUser, selectUserEmail } from 'utils/redux/slices/userSlice'
import { getEncodedEmail } from '../SignIn/SignIn'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const UpdateEmailConfirmation = () => {
  const navigate = useNavigate()
  const pathInfo = useLocation()
  const dispatch = useDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const currentUserEmail = useSelector(selectUserEmail)

  const { newEmail } = getEncodedEmail(pathInfo)

  const handleResend = async () => {
    const response = await updateEmailAddress(
      currentUserEmail,
      newEmail,
      authUser,
      navigate
    )

    const severity = response.status >= 400 ? 'error' : 'success'

    dispatch(
      createSnackBar({
        isOpen: true,
        message: response.data.friendlyMessage,
        duration: 5000,
        vertical: 'top',
        horizontal: 'center',
        snackbarStyle: '',
        severity,
      })
    )
  }

  return (
    <div className='update-email-confirmation'>
      <div className='content'>
        <h1>You've updated your email address!</h1>
        <h2>We sent you a confirmation email.</h2>
        <p>
          Confirm your updated email address to log in. If you don't see it
          <br />
          after a few minutes, please check your junk or spam folder.
        </p>
        <p>The link provided in the email will expire in 30 minutes.</p>
        <p className='resend' onClick={handleResend}>
          Re-send email
        </p>
      </div>
    </div>
  )
}
