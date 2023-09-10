import { Paginator } from 'components/Paginator/Paginator'
import { OnboardingSetUpProfile } from './OnboardingSetUpProfile'
import './Onboarding.scss'
import { OnboardingIncomplete } from './OnboardingIncomplete'
import { OnboardingLastScreen } from './OnboardingLastScreen'
import { Availability } from 'components/Availability/Availability'

export const Onboarding = () => {
  const orderedPages = [
    {
      component: OnboardingIncomplete,
      title: 'Role',
    },
    {
      component: Availability,
      title: 'Add your availability',
      props: { backgroundColor: 'yellow' },
    },
    {
      component: OnboardingSetUpProfile,
      title: 'Set up profile',
    },
    {
      component: OnboardingLastScreen,
      title: "What's next",
    },
  ]
  return (
    <div className='onboarding'>
      <div className='onboarding-pag-container'>
        <Paginator exitRoute='/' orderedPages={orderedPages} />
      </div>
    </div>
  )
}
