import { Availability } from 'components/Availability/Availability'
import {
  disableForwardButton,
  saveAvailability,
} from 'components/Availability/utils/helpers'
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
import { PrimaryButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

export const EditAvailability = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const userTimezoneInUTC = useAppSelector(getUserTimezone)
  const userAvailability = useAppSelector<AvailabilityInterface>(
    selectUserAvailability
  )

  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSaveAvailability = async () => {
    setIsLoading(true)
    try {
      await saveAvailability(authUser._id, userAvailability, userTimezoneInUTC)
      dispatch(successSnackbar('Your availability has been updated!'))
      setIsLoading(false)
    } catch (error) {
      dispatch(errorSnackbar('Something went wrong please try again'))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const disabled = disableForwardButton(userAvailability)
    setIsDisabled(disabled)
  }, [userAvailability])

  return (
    <div className='edit-availability-container'>
      <Availability context='users-profile' />
      <ButtonContainer style={{ marginTop: '32px' }}>
        <PrimaryButton
          onClick={handleSaveAvailability}
          label='Save'
          loading={isLoading}
          disabled={isDisabled}
        />
      </ButtonContainer>
    </div>
  )
}
