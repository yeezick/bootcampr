import { Paginator } from 'components/Paginator/Paginator'
import { One } from 'components/Paginator/Examples/One'
import { Two } from 'components/Paginator/Examples/Two'
import { Three } from 'components/Paginator/Examples/Three'
import { Availability } from 'components/Availability/Availability'

export const Onboarding = () => {
  // Todo: replace with proper components for onboarding
  const orderedPages = [
    {
      component: One,
      title: 'One',
      props: { backgroundColor: 'red' },
    },
    {
      component: Availability,
      title: 'Add your availability',
      props: { backgroundColor: 'yellow' },
    },
    {
      component: Three,
      title: 'Three Word Title',
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
