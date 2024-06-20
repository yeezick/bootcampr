import { useState, useEffect } from 'react'
import { Availability } from 'components/Availability/Availability'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  getUserTimezone,
  selectAuthUser,
  selectIsRecurringUnpaidUser,
  selectUserAvailability,
} from 'utils/redux/slices/userSlice'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { disableForwardButton } from 'components/Availability/utils/helpers'
import './SetupAvailability.scss'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { BackButton, ForwardButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

interface SetupAvailabilityProps {
  handlePageNavigation: (navType: 'previous' | 'next' | 'specific') => void
}

export const SetupAvailability: React.FC<SetupAvailabilityProps> = ({
  handlePageNavigation,
}) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const storedUserTZinUTC = useAppSelector(getUserTimezone)
  const days = useAppSelector(selectUserAvailability)
  const isRecurringUnpaidUser = useAppSelector(selectIsRecurringUnpaidUser)
  const [isDisabled, setIsDisabled] = useState(true)
  const buttonLabel = isRecurringUnpaidUser
    ? 'Review profile'
    : 'Set up profile'
  const storeAvailability = async () => {
    try {
      const avail = await saveAvailability(
        authUser._id,
        days,
        storedUserTZinUTC
      )
    } catch (error) {
      dispatch(errorSnackbar('Availability failed to save. Please try again.'))
    }
  }

  const handleNavigationButtons = async (direction: 'previous' | 'next') => {
    await storeAvailability()
    handlePageNavigation(direction)
  }
  const handlePrevious = () => handleNavigationButtons('previous')
  const handleNext = () => handleNavigationButtons('next')

  useEffect(() => {
    const disabled = disableForwardButton(days)
    setIsDisabled(disabled)
  }, [days])

  return (
    <div className='setup-avail-page'>
      <div className='setup-avail-header'>
        <h2>When are you available for meetings?</h2>
        <p>We will match project teams according to availability to meet.</p>
        <p>You can edit this later in the project portal calendar page.</p>
        <i>
          <strong>
            *You must have 3 days per week with at least 1 hour per day of
            availability to meet.
          </strong>
        </i>
      </div>
      <Availability context='onboarding' />
      <ButtonContainer style={{ marginTop: '32px' }} gap={32}>
        <BackButton onClick={handlePrevious} label='Role' />
        <ForwardButton
          disabled={isDisabled}
          onClick={handleNext}
          label={buttonLabel}
        />
      </ButtonContainer>
    </div>
  )
}
