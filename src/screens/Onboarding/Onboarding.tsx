import { Paginator } from 'components/Paginator/Paginator'
import { One } from 'components/Paginator/Examples/One'
import { Two } from 'components/Paginator/Examples/Two'
import { Three } from 'components/Paginator/Examples/Three'
import { OnboardingSetUpProfile } from './OnboardingSetUpProfile'
import './Onboarding.scss'

export const Onboarding = () => {
  const orderedPages = [
    {
      component: One,
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
      component: Three,
      title: "What's next",
    },
  ]
  return (
    <div>
      <Paginator exitRoute='/' orderedPages={orderedPages} />
    </div>
  )
}
