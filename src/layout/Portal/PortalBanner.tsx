import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectBanner } from 'utils/redux/slices/userInterfaceSlice'
import {
  selectIsRecurringUnpaidUser,
  selectIsRecurringUser,
  selectUserId,
  selectUserPayment,
} from 'utils/redux/slices/userSlice'
import { PrimaryButton } from 'components/Buttons'
import { handleJoinDiscord, handleJoinTeam } from 'utils/helpers/paymentHelpers'
import { fetchIcon } from 'utils/components/Icons'
import { isSandboxId } from 'utils/helpers/taskHelpers'
import bannerImg from '../../assets/Images/banner-img.png'
import bannerImgLg from '../../assets/Images/banner-img-lg.png'

export const PortalBanner = () => {
  const { active, type } = useAppSelector(selectBanner)
  const { paid } = useAppSelector(selectUserPayment)
  const isRecurringUnpaidUser = useAppSelector(selectIsRecurringUnpaidUser)
  const isRecurringUser = useAppSelector(selectIsRecurringUser)
  const bannerRef = useRef(null)

  const setBannerHeight = () => {
    if (bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight
      document.documentElement.style.setProperty(
        '--banner-height',
        `${bannerHeight}px`
      )
    }
  }

  useEffect(() => {
    setBannerHeight()
  }, [type])

  if (!active) return null
  if (isRecurringUnpaidUser || isRecurringUser) return null
  return (
    <div ref={bannerRef} className='banner'>
      {type === 'waitlist' && paid && <WaitlistBanner />}
      {(type === 'sandbox' || !paid) && <SandboxBanner />}
    </div>
  )
}

const SandboxBanner = () => {
  const userId = useAppSelector(selectUserId)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { paid } = useAppSelector(selectUserPayment)
  const { type } = useAppSelector(selectBanner)

  const handleJoinTeamBtn = () => handleJoinTeam(dispatch, navigate, userId)

  const startedOnboarding = !paid && type === 'waitlist'

  return (
    <>
      <img src={bannerImg} />
      <div className='content'>
        <h2>Collabify Sandbox</h2>
        <p>
          Feel free to explore the platform and try the features. Join an agile
          team when you're ready!
        </p>
      </div>
      <PrimaryButton
        label={startedOnboarding ? 'Complete onboarding' : 'Join a team'}
        onClick={handleJoinTeamBtn}
        style={{ marginRight: '32px' }}
      />
    </>
  )
}

const WaitlistBanner = () => {
  const { paid } = useAppSelector(selectUserPayment)
  const navigate = useNavigate()
  const handleCompleteOnboarding = () => navigate('/onboarding')
  return (
    <>
      <img className='waitlist-img' src={bannerImgLg} />
      <div className='content'>
        <h2>We're working to match you to a team.</h2>
        <p>
          We'll send an email when you're matched to a team with the date and
          time of your kickoff meeting.
        </p>
        <p>
          We love feedback. Please take&ensp;
          <span>
            <a
              href='https://forms.gle/vfdAQpNMv2tZBwBB6'
              target='_blank'
              rel='noreferrer'
            >
              this short survey
            </a>
          </span>
          &ensp;so we can improve.
        </p>
        <WaitlistPageInfo />
      </div>
      <PrimaryButton
        label={paid ? 'Join The Collabify community' : 'Complete onboarding'}
        onClick={paid ? handleJoinDiscord : handleCompleteOnboarding}
        style={{ marginRight: '32px' }}
      />
    </>
  )
}

const WaitlistPageInfo = () => {
  const [infoText, setInfoText] = useState('')
  const { pathname } = useLocation()
  const currentPath = pathname.split('/').pop()

  useEffect(() => {
    switch (currentPath) {
      case 'team':
        setInfoText(
          'You will see dummy team members on the Team Members page until you are matched to a team.'
        )
        break
      case 'calendar':
        setInfoText(
          'Meetings and team availability are examples. You can edit your availability.'
        )
        break
      case 'tasks':
        setInfoText(
          'You can practice creating user stories. They will not save beyond this session.'
        )
        break
      default:
        return
    }
  }, [pathname])

  if (isSandboxId(currentPath)) {
    return (
      <p>
        You can review the Product Details to prepare for the kickoff meeting.
      </p>
    )
  }

  return (
    <div className='infotext'>
      {fetchIcon('info')}
      <p>{infoText}</p>
    </div>
  )
}
