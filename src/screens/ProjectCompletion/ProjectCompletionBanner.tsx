import { useNavigate } from 'react-router-dom'
import { handleJoinNewTeam } from 'utils/helpers/paymentHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectIsRecurringUnpaidUser,
  selectUserId,
} from 'utils/redux/slices/userSlice'
import bannerImg from '../../assets/Images/banner-img.png'
import { PrimaryButton } from 'components/Buttons'
import './ProjectCompletionBanner.scss'

export const ProjectCompletionBanner = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectUserId)
  const isRecurringUnpaidUser = useAppSelector(selectIsRecurringUnpaidUser)

  const handleCompleteOnboarding = () => navigate('/onboarding')
  const handleJoinNewTeamBtn = () =>
    handleJoinNewTeam(dispatch, navigate, userId)

  return (
    <div className='project-completion-banner'>
      <img src={bannerImg} />
      <div className='content'>
        <h2>Congrats on completing your project!</h2>
        <p>Join a new cross-functional team to gain more experience.</p>
      </div>
      <PrimaryButton
        label={
          isRecurringUnpaidUser ? 'Complete Onboarding' : 'Join a new team'
        }
        onClick={
          isRecurringUnpaidUser
            ? handleCompleteOnboarding
            : handleJoinNewTeamBtn
        }
        style={{ marginRight: '32px' }}
      />
    </div>
  )
}
