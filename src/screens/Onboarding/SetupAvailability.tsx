import { useState, useEffect } from 'react'
import { Availability } from 'components/Availability/Availability'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getUserTimezone, selectAuthUser } from 'utils/redux/slices/userSlice'
import { AvailabilityInterface } from 'interfaces'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { disableForwardButton } from 'components/Availability/utils/helpers'
import { Timezones } from 'components/Availability/utils/data'
import { guessUserTimezone } from 'utils/helpers/availabilityHelpers'
import {
  utcToBootcamprTimezoneMap,
  bootcamprTimezoneToUTCMap,
} from 'utils/data/timeZoneConstants'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import './SetupAvailability.scss'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'

interface SetupAvailabilityProps {
  handlePageNavigation: (navType: 'previous' | 'next' | 'specific') => void
}

export const SetupAvailability: React.FC<SetupAvailabilityProps> = ({
  handlePageNavigation,
}) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const storedUserTZinUTC = useAppSelector(getUserTimezone)

  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)
  const [uxUserTimezone, setUxUserTimezone] = useState(Timezones.ET)
  const [isDisabled, setIsDisabled] = useState(true)

  const storeAvailability = async () => {
    try {
      const userTZinUTC = bootcamprTimezoneToUTCMap[uxUserTimezone]
      const avail = await saveAvailability(authUser._id, days, userTZinUTC)
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
    let userFriendlyTZ = Timezones.ET
    if (storedUserTZinUTC) {
      userFriendlyTZ = utcToBootcamprTimezoneMap[storedUserTZinUTC]
    } else {
      const userTZguess = guessUserTimezone()

      userFriendlyTZ = userFriendlyTZ
        ? userTZguess.userFriendlyTZ
        : Timezones.ET
    }
    setUxUserTimezone(userFriendlyTZ)
  }, [])

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
            *You must have 3 days per week with at least 1 hour of availability
            to meet. <br />
            The 1 hour can be 2 half-hour time slots.
          </strong>
        </i>
      </div>
      <Availability
        days={days}
        setDays={setDays}
        uxUserTimezone={uxUserTimezone}
        setUxUserTimezone={setUxUserTimezone}
      />
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
