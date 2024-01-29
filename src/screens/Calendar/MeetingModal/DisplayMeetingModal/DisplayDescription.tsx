import { useAppSelector } from 'utils/redux/hooks'
import { selectDisplayedEvent } from 'utils/redux/slices/calendarSlice'
import { DescriptionOutlined } from '@mui/icons-material'

export const DisplayDescription = () => {
  const { description } = useAppSelector(selectDisplayedEvent)
  return (
    description && (
      <>
        <DescriptionOutlined className='description-icon centered-icon' />
        <p className='description'>{description}</p>
      </>
    )
  )
}
