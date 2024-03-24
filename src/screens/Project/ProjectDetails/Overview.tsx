import './Overview.scss'
import { AccordionItem } from './AccordionItem'
import { projectBriefContent } from 'utils/data/projectBriefConstants'

export const Overview = () => {
  return (
    <div className='overview'>
      {projectBriefContent.map(item => (
        <AccordionItem title={item.title} details={item.content} />
      ))}
    </div>
  )
}
