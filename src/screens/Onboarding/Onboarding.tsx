import { Paginator } from 'components/Paginator/Paginator'
import { OnboardingSetUpProfile } from './OnboardingSetUpProfile'
import './Onboarding.scss'
import { OnboardingIncomplete } from './OnboardingIncomplete'
import { OnboardingLastScreen } from './OnboardingLastScreen'
import { Two } from './Two'

export const Onboarding = () => {
  const orderedPages = [
    {
      component: OnboardingIncomplete,
      title: 'Role',
    },
    {
      component: Two,
      title: 'Two',
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
