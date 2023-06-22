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
    },
    {
      component: ProjectCompPagThree,
      title: 'Confirmation',
    },
    {
      component: ProjectCompPagFour,
      title: "What's next",
    },
  ]

  return (
    <div className='projectcompletion'>
      <div className='projectcompletion__empty-header'></div>
      <div className='projectcompletion__pag-container'>
        <Paginator exitRoute='/' orderedPages={orderedPages} />
      </div>
    </div>
  )
}
