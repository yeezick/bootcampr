import './EmailSentConfirmation.scss'
import { useParams } from 'react-router-dom'
import { getOneUser } from 'utils/api'
import { useAppSelector } from 'utils/redux/hooks'
import accountCreated from '../../../../assets/Images/accountCreated.png'
import { selectUserEmail } from 'utils/redux/slices/userSlice'
import { useEffect, useState } from 'react'
import { UpdateEmailAddressLink } from './UpdateEmailAddressLink'

export const EmailSentConfirmation: React.FC = () => {
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
        <UpdateEmailAddressLink />
        <span>if it's incorrect.</span>
      </div>
      <div className='img-container'>
        <img
          src={accountCreated}
          alt='A person jumps in the air in celebration'
        />
      </div>
    </div>
  )
}
