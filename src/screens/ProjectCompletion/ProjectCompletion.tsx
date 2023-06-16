import { Paginator } from 'components/Paginator/Paginator'
import { ProjectCompPagOne } from './ProjectCompPagOne'
import { ProjectCompPagTwo } from './ProjectCompPagTwo'
import { ProjectCompPagThree } from './ProjectCompPagThree'
import { ProjectCompPagFour } from './ProjectCompPagFour'
import './ProjectCompletion.scss'

export const ProjectCompletion = () => {
  const orderedPages = [
    {
      component: ProjectCompPagOne,
      title: 'URL',
    },
    {
      component: ProjectCompPagTwo,
      title: 'Presentation',
      props: { backgroundColor: 'yellow' },
    },
    {
      component: ProjectCompPagThree,
      title: 'Confirmation',
      props: { backgroundColor: 'green' },
    },
    {
      component: ProjectCompPagFour,
      title: "What's next",
      props: { backgroundColor: 'purple' },
    },
  ]

  return (
    <div className='projectcompletion'>
      <div className='projectcompletion__empty-header'></div>
      <div className='projectcompletion__pag-container'>
        <Paginator
          exitRoute='/'
          orderedPages={orderedPages}
          pageTitle='Paginator Example'
        />
      </div>
    </div>
  )
}
