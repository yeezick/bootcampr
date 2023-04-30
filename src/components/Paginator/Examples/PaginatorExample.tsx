import { Paginator } from 'components/Paginator/Paginator'
import { One } from 'components/Paginator/Examples/One'
import { Two } from 'components/Paginator/Examples/Two'
import { Three } from 'components/Paginator/Examples/Three'

export const PaginatorExample = () => {
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
        pageTitle='Paginator Example'
      />
    </div>
  )
}
