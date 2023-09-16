import { Paginator } from 'components/Paginator/Paginator'
import { SetUpProfile } from './SetUpProfile'
import { Role } from './Role'
import { WhatsNext } from './WhatsNext'
import './Onboarding.scss'
import { SetupAvailability } from './SetupAvailability'

export const Onboarding = () => {
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
