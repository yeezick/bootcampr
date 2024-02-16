import './EmailSentConfirmation.scss'
import { useParams } from 'react-router-dom'
import { resendNewEmailLink } from 'utils/api'
import { useAppDispatch } from 'utils/redux/hooks'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import emailSentImage from '../../../../assets/Images/email-sent-confirmation-image.png'
import { useSelector } from 'react-redux'
import { selectUserUnverifiedEmail } from 'utils/redux/slices/userSlice'

export const EmailSentConfirmation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id: newUserId } = useParams()
  const email = useSelector(selectUserUnverifiedEmail)

  //TODO: replace this with a modal to complete update email flow (BC-753)
  const handleResendEmailClick = async () => {
    try {
      const res: any = await resendNewEmailLink(newUserId)

      let toastSeverity: string = null

      if (res.status === 200) {
        toastSeverity = 'success'
      } else {
        toastSeverity = 'error'
      }
      dispatch(
        createSnackBar({
          isOpen: true,
          message: res.data.friendlyMessage,
          duration: 5000,
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
        We sent a confirmation email to <span>{email}</span>.
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
