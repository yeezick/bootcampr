import { useNavigate } from 'react-router-dom'
import { handleJoinNewTeam } from 'utils/helpers/paymentHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUserId, selectUserPayment } from 'utils/redux/slices/userSlice'
import bannerImg from '../../assets/Images/banner-img.png'
import { PrimaryButton } from 'components/Buttons'
import './ProjectCompletionBanner.scss'

export const ProjectComplationBanner = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectUserId)
  const { experience, paid } = useAppSelector(selectUserPayment)
  const waitlistedUnpaidUser = experience === 'waitlist' && !paid

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
        label={waitlistedUnpaidUser ? 'Complete Onboarding' : 'Join a new team'}
        onClick={
          waitlistedUnpaidUser ? handleCompleteOnboarding : handleJoinNewTeamBtn
        }
        style={{ marginRight: '32px' }}
      />
    </div>
  )
}
