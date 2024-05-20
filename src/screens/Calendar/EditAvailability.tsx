import { Availability } from 'components/Availability/Availability'
import {
  disableForwardButton,
  saveAvailability,
} from 'components/Availability/utils/helpers'
import { PrimaryButton } from 'components/Buttons'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  getUserTimezone,
  selectAuthUser,
  selectUserAvailability,
} from 'utils/redux/slices/userSlice'
import './EditAvailability.scss'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { AvailabilityInterface } from 'interfaces'
import { useEffect, useState } from 'react'

export const EditAvailability = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const userTimezoneInUTC = useAppSelector(getUserTimezone)
  const userAvailability = useAppSelector<AvailabilityInterface>(
    selectUserAvailability
  )
  const [isDisabled, setIsDisabled] = useState(true)

  const handleSaveAvailability = async () => {
    try {
      await saveAvailability(authUser._id, userAvailability, userTimezoneInUTC)
      dispatch(successSnackbar('Your availability has been updated!'))
    } catch (error) {
      dispatch(errorSnackbar('Something went wrong please try again'))
    }
  }

  useEffect(() => {
    const disabled = disableForwardButton(userAvailability)
    setIsDisabled(disabled)
  }, [userAvailability])

  return (
    <div className='edit-availability-container'>
      <Availability context='users-profile' />
      <div className='edit-availability-btn-group'>
        <PrimaryButton
          handler={handleSaveAvailability}
          text='Save'
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}
