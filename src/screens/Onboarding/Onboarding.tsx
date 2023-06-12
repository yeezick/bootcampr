import { Paginator } from 'components/Paginator/Paginator'
import { One } from 'components/Paginator/Examples/One'
import { Two } from 'components/Paginator/Examples/Two'
import { Three } from 'components/Paginator/Examples/Three'
import './Onboarding.scss'
import { OnboardingIncomplete } from './OnboardingIncomplete'
import { OnboardingLastScreen } from './OnboardingLastScreen'
import { OneKPlusRounded } from '@mui/icons-material'

export const Onboarding = () => {
  // Todo: replace with proper components for onboarding
  const orderedPages = [
    {
      component: OnboardingIncomplete,
      title: 'Role',
      props: { backgroundColor: 'red' },
    },
    {
      component: Two,
      title: 'Two',
      props: { backgroundColor: 'yellow' },
    },
    {
      component: Three,
      title: 'Three Word Title',
      props: { backgroundColor: 'green' },
    },
    {
      component: OnboardingLastScreen,
      title: "What's Next",
      props: { backgroundColor: 'green' },
    },
  ]
  return (
    <div>
      <Paginator
        exitRoute='/'
        orderedPages={orderedPages}
        pageTitle='Onboarding'
      />
    </div>
  )
}
