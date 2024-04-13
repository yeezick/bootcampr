import { Paginator } from 'components/Paginator/Paginator'
import { SetUpProfile } from './SetUpProfile'
import { Role } from './Role'
import './Onboarding.scss'
import { SetupAvailability } from './SetupAvailability'
import { useEffect } from 'react'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { WhatsNext } from './WhatsNext'
import { isSandboxId } from 'utils/helpers/taskHelpers'

export const Onboarding = () => {
  const authUser = useAppSelector(selectAuthUser)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const pageId = queryParams.get('pageId')

  useEffect(() => {
    const {
      onboarded,
      projects: { activeProject },
      payment: { experience },
    } = authUser

    if (
      isSandboxId(activeProject) !== true &&
      experience === 'active' &&
      onboarded
    ) {
      navigate(`/project/${activeProject}`)
    } else if (pageId) {
      navigate(`/onboarding/${authUser._id}?pageId=${pageId}`)
    }
  }, [])

  const orderedPages = [
    {
      component: Role,
      title: 'Role',
    },
    {
      component: SetupAvailability,
      title: 'Availability',
    },
    {
      component: SetUpProfile,
      title: 'Set up profile',
    },
    {
      component: null,
      title: 'Payment',
    },
  ]

  return (
    <div className='onboarding'>
      <div className='onboarding-page-container'>
        <Paginator
          exitRoute='/'
          orderedPages={orderedPages}
          manualNavigationAllowed={false}
        />
      </div>
    </div>
  )
}
