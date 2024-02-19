import { TimelineList } from 'components/Timeline/TimelineList'
import './ProjectTimeline.scss'

export const ProjectTimeline = () => {
  return (
    <div className='project-timeline'>
      <div className='ptl-text-cont'>
        <div className='ptl-header-cont'>
          <h1> Project Timeline </h1>
        </div>
        <div className='ptl-flow-cont'>
          <TimelineList />
        </div>
      </div>
    </div>
  )
}
