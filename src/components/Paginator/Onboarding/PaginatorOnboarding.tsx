import { Paginator } from 'components/Paginator/Paginator'
import { OnboardingIncomplete } from 'components/Paginator/Onboarding/OnboardingIncomplete'
import { OnboardingLastScreen } from 'components/Paginator/Onboarding/OnboardingLastScreen'

export const PaginatorOnboarding = () => {
  const orderedPages = [
    {
      component: OnboardingIncomplete,
      title: 'Role',
    },
    {
      component: OnboardingLastScreen,
      title: "What's Next",
    },
  ]
  return (
    <div>
      <Paginator exitRoute='/' orderedPages={orderedPages} pageTitle='' />
    </div>
  )
}
