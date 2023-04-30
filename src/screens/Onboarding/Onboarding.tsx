import { Paginator } from 'components/Paginator/Paginator'
import { One } from '../../components/Paginator/One'
import { Two } from '../../components/Paginator/Two'
import { Three } from '../../components/Paginator/Three'

export const Onboarding = () => {
  const orderedPages = [
    {
      component: <One backgroundColor={'red'} />,
      title: 'One',
    },
    {
      component: <Two backgroundColor={'green'} />,
      title: 'Two',
    },
    {
      component: <Three backgroundColor={'blue'} />,
      title: 'Three Word Title',
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
