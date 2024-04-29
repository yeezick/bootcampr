import { useState, useEffect } from 'react'
import { Availability } from 'components/Availability/Availability'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  getUserTimezone,
  selectAuthUser,
  selectUserAvailability,
} from 'utils/redux/slices/userSlice'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { disableForwardButton } from 'components/Availability/utils/helpers'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import './SetupAvailability.scss'

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

  const [isDisabled, setIsDisabled] = useState(true)

  const storeAvailability = async () => {
    await saveAvailability(dispatch, authUser._id, days, storedUserTZinUTC)
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
      <Availability />
      <div className='setup-avail-buttons-wrapper'>
        <div className='setup-avail-buttons'>
          <PaginatorButton
            buttonType='secondary'
            handler={handlePrevious}
            text='Role'
          />
          <PaginatorButton
            buttonType='primary'
            disabled={isDisabled}
            handler={handleNext}
            text='Set up profile'
          />
        </div>
      </div>
    </div>
  )
}
