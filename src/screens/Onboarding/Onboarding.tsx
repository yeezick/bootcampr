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

export const Onboarding = () => {
  const authUser = useAppSelector(selectAuthUser)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const pageId = queryParams.get('pageId')

  useEffect(() => {
    const hasSetAvailability = checkIfSetAvailability()
    const hasSetProfileInfo = checkIfSetProfileInfo()

    if (authUser.role && hasSetAvailability && hasSetProfileInfo) {
      navigate(`/project/${authUser.project}`)
    } else if (authUser.role && hasSetAvailability) {
      navigate(`/onboarding/${authUser._id}?pageId=setUpProfile`)
    } else if (authUser.role) {
      navigate(`/onboarding/${authUser._id}?pageId=availability`)
    }
  }, [])

  const checkIfSetAvailability = () => {
    let hasSet = false
    const { availability } = authUser

    Object.keys(availability).forEach(day => {
      if (availability[day].available) {
        hasSet = true
      }
    })

    return hasSet
  }

  const checkIfSetProfileInfo = () => {
    const { firstName, lastName, bio, links } = authUser

    return firstName && lastName && bio && links && links.linkedinUrl
  }

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
