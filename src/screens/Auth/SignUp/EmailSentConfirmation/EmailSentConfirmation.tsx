import './EmailSentConfirmation.scss'
import { useParams } from 'react-router-dom'
import { getOneUser, resendNewEmailLink } from 'utils/api'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import emailSentImage from '../../../../assets/Images/email-sent-confirmation-image.png'
import { SnackBarSeverity } from 'interfaces/SnackBarToast'
import { selectUserEmail } from 'utils/redux/slices/userSlice'
import { useEffect, useState } from 'react'

export const EmailSentConfirmation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id: newUserId } = useParams()
  const [userEmail, setUserEmail] = useState(useAppSelector(selectUserEmail))

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const { email } = await getOneUser(newUserId)
        setUserEmail(email)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (!userEmail) {
      fetchUserEmail()
    }
  }, [newUserId, userEmail])

  //TODO: replace this with a modal to complete update email flow (BC-753)
  const handleResendEmailClick = async () => {
    try {
      const res: any = await resendNewEmailLink(newUserId)

      let toastSeverity: SnackBarSeverity = null

      if (res.status === 200) {
        toastSeverity = 'success'
      } else {
        toastSeverity = 'error'
      }
      dispatch(
        createSnackBar({
          message: res.data.friendlyMessage,
          severity: toastSeverity,
        })
      )
    } catch (error) {
      console.error('Error resending new email verification link.', error)
    }
  }

  return (
    <div className='email-confirmation-container'>
      <p className='message-content header'>
        Congrats! You've taken the first step.
      </p>
      <p className='message-content subheader'>
        We sent a confirmation email to <span>{userEmail}</span>.
      </p>
      <div className='message-content text'>
        <p>It may be in your junk or spam folder.</p>
      </div>
      <div className='message-content confirm'>
        <p>Confirm your email address to log in.</p>
      </div>
      <div className='message-content update-email'>
        <button onClick={handleResendEmailClick}>
          Update your email address
        </button>
        <span>if it's incorrect.</span>
      </div>
      <div className='img-container'>
        <img
          src={emailSentImage}
          alt='A person jumps in the air in celebration'
        />
      </div>
    </div>
  )
}
