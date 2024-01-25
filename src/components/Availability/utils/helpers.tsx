import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { timeOptions } from '../utils/data'
import { updateAvailability } from 'utils/api'

// TODO: handle case where time slot B end time is earlier than timeslot A end time
// Consider if using Math.min / Math.max could help consolidate better
/**
 * CONSOLIDATE AVAILABILITY
 *
 * Takes in an array of available time slots for a single day
 * and consolidates the availability to account for any overlapping time slots
 * and combining them into one inclusive timeslot
 *
 * @param availability (Array)
 * @returns new consolidate availability (array)
 */

const convertTimeSlotToLogicalArray = (startTime: string, endTime: string) => {
  const startIndex: number = timeOptions.indexOf(startTime)
  const endIndex: number = timeOptions.indexOf(endTime)

  let logicalArray = []

  for (let i = startIndex; i < endIndex; i++) {
    logicalArray.push(i)
  }
  return logicalArray
}

const createFullAvailability = (
  userFriendlyFullDayAvailability
): Array<number> => {
  let fullLogical = []

  userFriendlyFullDayAvailability.forEach((array, idx) => {
    const logicalArray = convertTimeSlotToLogicalArray(array[0], array[1])
    fullLogical = [...fullLogical, ...logicalArray]
  })

  const sortedFullLogical = sortArray(fullLogical)
  const reducedFullLogical = removeDuplicates(sortedFullLogical)

  return reducedFullLogical
}

const sortArray = array => {
  array.sort(function (a, b) {
    return a - b
  })
  return array
}

const removeDuplicates = array => {
  return array.filter((value, index) => array.indexOf(value) === index)
}

export const consolidateAvailability = availability => {
  let consolidatedAvail = [...availability]

  let reducedFullLogical = createFullAvailability(consolidatedAvail)
  let userFriendlyConsolidated =
    convertLogicalToUserFriendly(reducedFullLogical)

  return userFriendlyConsolidated
}

const convertLogicalToUserFriendly = logical => {
  let userFriendly = [timeOptions[logical[0]]]

  for (let i = 1; i < logical.length; i++) {
    if (logical[i] - logical[i - 1] === 1) {
      if (i === logical.length - 1) {
        userFriendly.push(timeOptions[logical[i] + 1])
      }
    } else {
      const indexBefore = logical[i - 1]

      userFriendly.push(timeOptions[indexBefore + 1])
      userFriendly.push(timeOptions[logical[i]])

      if (i === logical.length - 1) {
        userFriendly.push(timeOptions[logical[i] + 1])
      }
    }
  }
  const convertedUserFriendly = []

  for (let i = 0; i < userFriendly.length; i += 2) {
    convertedUserFriendly.push([userFriendly[i], userFriendly[i + 1]])
  }
  return convertedUserFriendly
}

/**
 * SINGLE TIME SELECT INPUT HANDLER
 *
 * Takes either a start or end time of a time slot and updates availability
 * state to match new time input
 *
 * @param e event object - contains day, frame, index and input value
 * @param days availability state
 * @param setDays availability state setter
 */
export const handleTimeChange = (e, days, setDays) => {
  const context = e.target.name.split('-')
  const day = context[0]
  const frame = Number(context[1])
  const index = context[2]

  const newTime = [...days[day].availability[frame]]
  newTime[index] = e.target.value

  let newAvailability = [...days[day].availability]
  newAvailability[frame] = newTime
  newAvailability = consolidateAvailability(newAvailability)

  setDays({
    ...days,
    [day]: {
      available: days[day].available,
      availability: newAvailability,
    },
  })
}

/**
 * HANDLE AVAILBILITY CHECK BOX (SINGLE DAY)
 *
 * Handles when a single day check box is checked or unchecked
 * unchecked => checked - add and display default availability, or user availability if it exists
 * checked => unchecked - hide time slot, render 'Unavailable' and maintain user availability state under hood
 *
 * @param day selected day
 * @param days availability state
 * @param setDays availability state setter
 */
export const handleCheck = (day, days, setDays) => {
  const available = !days[day].available
  const newAvailability =
    days[day].availability.length > 0
      ? days[day].availability
      : [['9:00 AM', '5:00 PM']]

  setDays({
    ...days,
    [day]: {
      available,
      availability: newAvailability,
    },
  })
}

/**
 * GET NEXT TIMESLOT
 *
 * Gets whatever next time slot is
 * eg. if current time is 6:00 PM, next time slot would be 6:30 PM
 * Used especially for Add time slot function to determine starting time for new slot
 * safety if index = null / undefined -> return default 9-5 timeslot
 *
 * @param currentTime string, time option ('9:00 AM', '12:30 PM', '7:00 PM')
 * @returns
 */
export const getNextTimeslot = currentTime => {
  const index = timeOptions.indexOf(currentTime)
  return index
    ? [timeOptions[index + 1], timeOptions[index + 2]]
    : ['9:00 PM', '5:00 PM']
}

/**
 * Save Availability
 * @param dispatch The callback returned from `useAppDispatch`
 * @param userId Auth user ID
 * @param {AvailabilityInterface} days State object representing the user's availability object
 */
export const saveAvailability = async (
  dispatch,
  userId,
  days,
  userTimezone
) => {
  const updated = await updateAvailability(userId, days, userTimezone)
  if (updated.status) {
    dispatch(
      createSnackBar({
        isOpen: true,
        message: 'Your availability has been updated!',
        duration: 3000,
        severity: 'success',
      })
    )
  } else {
    dispatch(
      createSnackBar({
        isOpen: true,
        message: 'Something went wrong please try again',
        duration: 3000,
        severity: 'error',
      })
    )
  }
}

/**
 * DELETE TIME SLOT
 *
 * Handler to delete a timeslot from user availability state
 * Sets display to Unavailable if single remaining timeslot is deleted
 *
 * @param day
 * @param days
 * @param setDays
 * @param idx
 */
export const deleteTimeSlot = (day, days, setDays, idx) => {
  let newAvailability

  newAvailability = {
    available: days[day].availability.length > 1 ? true : false,
    availability: [...days[day].availability],
  }
  newAvailability.availability.splice(idx, 1)

  setDays({
    ...days,
    [day]: {
      ...newAvailability,
    },
  })
}

/**
 * ADD TIME SLOT
 *
 * Add a new availability time slot, which starts 30 minutes after previous slot end time
 * and whose default end time is 30 minutes after start time
 *
 * @param day
 * @param days
 * @param setDays
 * @param idx
 */
export const addTimeSlot = (day, days, setDays, idx) => {
  let nextTimeslot
  const currentTimeslot = days[day].availability[idx][1]
  if (currentTimeslot === '11:30 PM') {
    nextTimeslot = ['12:00 AM', '12:30 AM']
  } else if (currentTimeslot === '12:00 AM') {
    nextTimeslot = ['12:30 AM', '1:00 AM']
  } else {
    nextTimeslot = getNextTimeslot(currentTimeslot)
  }
  const newAvailability = [...days[day].availability]

  newAvailability.push(nextTimeslot)

  setDays({
    ...days,
    [day]: {
      available: days[day].available,
      availability: newAvailability,
    },
  })
}

/**
 * RENDER COPY TIMES MODAL
 *
 * Toggles the copy times modal display display state to render or not
 *
 * @param idx - idx of which display modal (by day + timeslot)
 * @param displayModal
 * @param toggleDisplayModal
 */
export const renderCopyTimesModal = (idx, displayModal, toggleDisplayModal) => {
  const newState = displayModal
  newState[idx] = !displayModal[idx]

  toggleDisplayModal({
    ...displayModal,
    ...newState,
  })
}

export const copyTimes = (checked, day, days, idx, setDays) => {
  const daysToPasteTo = Object.keys(checked).filter(
    day => day != 'EVRY' && checked[day]
  )
  const copiedTimeslot = [days[day].availability[idx]]
  const newAvail = {}
  daysToPasteTo?.forEach(day => {
    newAvail[day] = {
      available: true,
      availability: days[day].availability.concat(copiedTimeslot),
    }
  })
  setDays({
    ...days,
    ...newAvail,
  })
}
