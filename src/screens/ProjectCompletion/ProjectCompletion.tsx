import { Paginator } from 'components/Paginator/Paginator'
import { UrlPage } from './UrlPage'
import { PresentationPage } from './PresentationPage'
import { ConfirmationPage } from './ConfirmationPage'
import { WhatsNextPage } from './WhatsNextPage'
import './ProjectCompletion.scss'

export const ProjectCompletion = () => {
  const orderedPages = [
    {
      component: UrlPage,
      title: 'URL',
    },
    {
      component: PresentationPage,
      title: 'Presentation',
    },
    {
      component: ConfirmationPage,
      title: 'Confirmation',
    },
    {
      component: WhatsNextPage,
      title: "What's next",
    },
  ]

  return (
    <div className='project-completion'>
      <div className='page-container'>
        <Paginator
          exitRoute='/'
          orderedPages={orderedPages}
          manualNavigationAllowed={false}
        />
      </div>
    </div>
  )
}
