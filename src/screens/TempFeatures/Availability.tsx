import { Availability } from 'components/Availability/Availability'
import { CopyTimesModal } from 'components/Availability/utils/components/CopyTimesModal'

export const AvailabilityDemoScreen: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}
    >
      <Availability />
      <CopyTimesModal />
    </div>
  )
}
