import { Availability } from 'components/Availability/Availability'
import { CopyTimesModal } from 'components/Availability/utils/components/CopyTimesModal'
import { HoverMessage } from 'components/Availability/utils/components/HoverMessage'
import './Availability.scss'

export const AvailabilityDemoScreen: React.FC = () => {
  return (
    <div className='availability-features-demo'>
      <Availability />
      <CopyTimesModal />
      <HoverMessage text='New time period for [Day]' />
    </div>
  )
}
