import { Paginator } from 'components/Paginator/Paginator'
import { SetUpProfile } from './SetUpProfile'
import { Role } from './Role'
import './Onboarding.scss'
import { SetupAvailability } from './SetupAvailability'
import { useEffect } from 'react'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { isSandboxId } from 'utils/helpers/taskHelpers'
import { selectProjectId } from 'utils/redux/slices/projectSlice'

export const Onboarding = () => {
  const authUser = useAppSelector(selectAuthUser)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const pageId = queryParams.get('pageId')
  const currentProjectId = useAppSelector(selectProjectId)

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
      navigate(`/project/${currentProjectId}`)
    } else if (pageId) {
      navigate(`/onboarding?pageId=${pageId}`)
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
      title: 'Profile',
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
