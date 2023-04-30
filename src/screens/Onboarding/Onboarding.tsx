import { Paginator } from 'components/Paginator/Paginator'
import { One } from '../../components/Paginator/One'
import { Two } from '../../components/Paginator/Two'
import { Three } from '../../components/Paginator/Three'

export const Onboarding = () => {
  const orderedPages = [
    {
      component: One,
      title: 'One',
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
