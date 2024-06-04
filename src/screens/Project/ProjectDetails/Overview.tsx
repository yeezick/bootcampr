import './Overview.scss'
import { AccordionItem } from '../../../components/Accordion/AccordionItem'
import { projectBriefContent } from 'utils/data/projectBriefConstants'
import {
  isPaidActiveExperience,
  isPaidWaitlistExperience,
} from 'utils/helpers/taskHelpers'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserPayment } from 'utils/redux/slices/userSlice'

export const Overview = () => {
  const payment = useAppSelector(selectUserPayment)
  const { experience } = payment
  const accordionData = [...projectBriefContent]
  if (isPaidWaitlistExperience(payment) || isPaidActiveExperience(payment)) {
    accordionData.push({
      title: 'Product Requirements Document',
      content: (
        <p>
          You'll find a&nbsp;
          <a
            href='https://www.canva.com/design/DAF-mnFXzbQ/JTugn84rGvGkHqiAVaSx2g/view?utm_content=DAF-mnFXzbQ&utm_campaign=designshare&utm_medium=link&utm_source=editor'
            target='_blank'
            className='products-req-doc'
          >
            detailed product requirements document here.
          </a>
        </p>
      ),
    })
  } else {
    accordionData.push({
      title: 'Product Requirements Document',
      content: (
        <p>
          You'll find a detailed product requirements document here when you
          join a team.
        </p>
      ),
    })
  }

  return (
    <div className='overview'>
      {accordionData.map(item => (
        <AccordionItem
          key={item.title}
          title={item.title}
          details={item.content}
        />
      ))}
    </div>
  )
}
