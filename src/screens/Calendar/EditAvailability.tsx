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
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

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
      <ButtonContainer style={{ marginTop: '32px' }}>
        <PrimaryButton onClick={handleSaveAvailability} label='Save' />
      </ButtonContainer>
    </div>
  )
}
