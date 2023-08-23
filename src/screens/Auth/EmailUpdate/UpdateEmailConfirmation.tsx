import { useLocation, useNavigate } from 'react-router-dom'
import { updateEmailAddress } from '../Settings/Email'
import './UpdateEmailConfirmation.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { useSelector } from 'react-redux'
import { selectAuthUser, selectUserEmail } from 'utils/redux/slices/userSlice'
import { getEncodedEmail } from '../SignIn/SignIn'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const UpdateEmailConfirmation = () => {
  const navigate = useNavigate()
  const authUser = useAppSelector(selectAuthUser)
  const currentUserEmail = useSelector(selectUserEmail)
  const pathInfo = useLocation()
  const dispatch = useDispatch()

  const { newEmail } = getEncodedEmail(pathInfo)

  const handleResend = async () => {
    const response = await updateEmailAddress(
      currentUserEmail,
      newEmail,
      authUser,
      navigate
    )
    console.log(response.data)
    console.log(response)
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
        <h1>Email address updated!</h1>
        <h2>We sent you a confirmation email.</h2>
        <p>
          Verify your updated email address to log in. If you don't see it after
          a few minutes, please check your junk or spam folder.
        </p>
        <p>The link provided in the email will expire in 30 minutes.</p>
        {/* TODO: Add functionality to this button */}
        <p className='resend' onClick={handleResend}>
          Re-send email
        </p>
      </div>
    </div>
  )
}
