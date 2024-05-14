import { Availability } from 'components/Availability/Availability'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  getUserTimezone,
  selectAuthUser,
  selectUserAvailability,
} from 'utils/redux/slices/userSlice'
import './EditAvailability.scss'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
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
    try {
      await saveAvailability(authUser._id, userAvailability, userTimezoneInUTC)
      dispatch(successSnackbar('Your availability has been updated!'))
    } catch (error) {
      dispatch(errorSnackbar('Something went wrong please try again'))
    }
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
