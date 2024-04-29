import { Availability } from 'components/Availability/Availability'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  getUserTimezone,
  selectAuthUser,
  selectUserAvailability,
} from 'utils/redux/slices/userSlice'
import './EditAvailability.scss'
import { AvailabilityInterface } from 'interfaces'
import { PrimaryButton } from 'components/Buttons'

export const EditAvailability = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const userTimezoneInUTC = useAppSelector(getUserTimezone)
  const userAvailability = useAppSelector<AvailabilityInterface>(
    selectUserAvailability
  )

  const handleSaveAvailability = async () => {
    await saveAvailability(
      dispatch,
      authUser._id,
      userAvailability,
      userTimezoneInUTC
    )
  }

  return (
    <div className='edit-availability-container'>
      <Availability />
      <div className='edit-availability-btn-group'>
        //TODO match this styling
        <PrimaryButton onClick={handleSaveAvailability} label='Save' />
      </div>
    </div>
  )
}
