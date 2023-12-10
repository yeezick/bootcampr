import { TimelineList } from 'components/Timeline/TimelineList'
import './ProjectTimeline.scss'

export const ProjectTimeline = () => {
  return (
    <div className='project_timeline'>
      <div className='ptl_text_cont'>
        <div className='ptl_header_cont'>
          <h1> Project Timeline </h1>
        </div>
        <div className='ptl_flow_cont'>
          <TimelineList />
        </div>
      </div>
    </div>
  )
}
