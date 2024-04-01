import { useState, useEffect } from 'react'
import { Availability } from 'components/Availability/Availability'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getUserTimezone, selectAuthUser } from 'utils/redux/slices/userSlice'
import { AvailabilityInterface } from 'interfaces'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { Timezones } from 'components/Availability/utils/data'
import { guessUserTimezone } from 'utils/helpers/availabilityHelpers'
import {
  utcToBootcamprTimezoneMap,
  bootcamprTimezoneToUTCMap,
} from 'utils/data/timeZoneConstants'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import './SetupAvailability.scss'

dayjs.extend(localizedFormat)

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
    const userTZinUTC = bootcamprTimezoneToUTCMap[uxUserTimezone]
    await saveAvailability(dispatch, authUser._id, days, userTZinUTC)
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
    const disabled = disableForwardButton()
    setIsDisabled(disabled)
  }, [days])

  const disableForwardButton = (): boolean => {
    const selectedDays = new Set()

    for (const day of Object.keys(days)) {
      const { availability, available } = days[day]
      let totalAvailableHours = 0

      if (available && availability.length > 0) {
        for (const slot of availability) {
          if (slot[0] && slot[1]) {
            const startTime = dayjs(slot[0], 'LT')
            const endTime = dayjs(slot[1], 'LT')
            const timeDifference = endTime.diff(startTime, 'hour')

            if (timeDifference >= 1) {
              totalAvailableHours += 1
            } else {
              totalAvailableHours += 0.5
            }
          }
        }

        if (totalAvailableHours >= 1) {
          selectedDays.add(day)
        }
      }
    }
    return selectedDays.size < 3
  }

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
            disabled={isDisabled}
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
