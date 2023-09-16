import { Paginator } from 'components/Paginator/Paginator'
import { SetUpProfile } from './SetUpProfile'
import { Role } from './Role'
import { WhatsNext } from './WhatsNext'
import { Availability } from 'components/Availability/Availability'
import './Onboarding.scss'
import { useState } from 'react'
import { defaultAvailability } from 'utils/data/userConstants'

export const Onboarding = () => {
  const [days, setDays] = useState(defaultAvailability)

  const orderedPages = [
    {
      component: Role,
      title: 'Role',
    },
    {
      component: Availability,
      props: { days, setDays },
      title: 'Availability',
    },
    {
      component: SetUpProfile,
      title: 'Set up profile',
    },
    {
      component: WhatsNext,
      title: "What's next",
    },
  ]
  return (
    <div className='onboarding'>
      <div className='onboarding-page-container'>
        <Paginator exitRoute='/' orderedPages={orderedPages} />
      </div>
    </div>
  )
}
