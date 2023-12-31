import './EmailSentConfirmation.scss'
import { useParams } from 'react-router-dom'
import { resendNewEmailLink } from 'utils/api'
import { useAppDispatch } from 'utils/redux/hooks'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const EmailSentConfirmation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id: newUserId } = useParams()

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
        We sent you a confirmation email.
      </p>
      <div className='message-content text'>
        <p>
          Confirm your email address to log in. If you don’t see it after a few
          minutes, please check your junk or spam folder.
        </p>
      </div>
      <button className='resend-link' onClick={handleResendEmailClick}>
        Re-send email
      </button>
    </div>
  )
}
