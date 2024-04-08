import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectBanner } from 'utils/redux/slices/userInterfaceSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { PrimaryButton } from 'components/Buttons'
import sandboxBanner from '../../assets/Images/sandbox-banner.png'
import { handleJoinTeam } from 'utils/helpers/paymentHelpers'

export const PortalBanner = () => {
  const { active, type } = useAppSelector(selectBanner)
  const userId = useAppSelector(selectUserId)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleJoinTeamBtn = () => handleJoinTeam(dispatch, navigate, userId)

  if (!active) return null

  if (true) {
    return (
      <div className='banner'>
        <img src={sandboxBanner} />
        <div className='text'>
          <h2>Bootcampr Sandbox</h2>
          <p>
            Feel free to explore the platform and try the features. Join an
            agile team when you're ready!
          </p>
        </div>
        <PrimaryButton
          className='cta-button'
          text='Join a team'
          handler={handleJoinTeamBtn}
        />
      </div>
    )
  }
}
