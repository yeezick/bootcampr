import { timeOptions } from '../utils/data'
import { updateAvailability } from 'utils/api'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

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
export const consolidateAvailability = (availability): string[][] => {
  let consolidatedAvail = [...availability]

  let reducedFullLogical = createFullAvailability(consolidatedAvail)
  let userFriendlyConsolidated =
    convertLogicalToUserFriendly(reducedFullLogical)

  return userFriendlyConsolidated
}

/**
 * Convert Logical Availabilty to User Friendly
 */
const convertLogicalToUserFriendly = (logical: number[]): string[][] => {
  let userFriendly = [timeOptions[logical[0]]]

  if (logical.length === 1) {
    const nextTime = timeOptions[logical[0] + 1]
    userFriendly.push(nextTime)

    return [userFriendly]
  }

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
 * Convert Time slot to Logical Availability
 */
const convertTimeSlotToLogical = (
  startTime: string,
  endTime: string
): Array<number> => {
  const startIndex: number = timeOptions.indexOf(startTime)
  const endIndex: number = timeOptions.indexOf(endTime)
  let logicalArray = []

  for (let i = startIndex; i < endIndex; i++) {
    logicalArray.push(i)
  }
  return logicalArray
}

/**
 * Create a holisitc logical availabilty array for full day
 */
const createFullAvailability = (
  userFriendlyFullDay: Array<string>
): Array<number> => {
  let fullLogical = []

  userFriendlyFullDay.forEach(array => {
    const logicalArray = convertTimeSlotToLogical(array[0], array[1])
    fullLogical = [...fullLogical, ...logicalArray]
  })

  const sortedFullLogical = sortArray(fullLogical)
  const reducedFullLogical = removeDuplicates(sortedFullLogical)

  return reducedFullLogical
}

/**
 * Sort a numeric array
 */
const sortArray = array => {
  array.sort(function (a, b) {
    return a - b
  })
  return array
}

/**
 * Remove duplicate values of an array
 */
const removeDuplicates = array => {
  return array.filter((value, index) => array.indexOf(value) === index)
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
export const handleTimeChange = (e, days, setDays, isStart) => {
  const context = e.target.name.split('-')
  const day = context[0]
  const frame = Number(context[1])
  const index = Number(context[2])

  const newTime = [...days[day].availability[frame]]
  newTime[index] = e.target.value

  const logicalStartTime = timeOptions.indexOf(newTime[0])
  const logicalEndTime = timeOptions.indexOf(newTime[1])

  if (
    (isStart && logicalStartTime > logicalEndTime) ||
    logicalStartTime === logicalEndTime
  ) {
    newTime[1] = timeOptions[logicalStartTime + 1]
  }
  newTime[index] = e.target.value

  const newAvailability = [...days[day].availability]
  newAvailability[frame] = newTime
  const consolidatedAndSortedAvailability =
    consolidateAvailability(newAvailability)

  setDays({
    ...days,
    [day]: {
      available: days[day].available,
      availability: consolidatedAndSortedAvailability,
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

  const consolidatedAndSortedAvailability =
    consolidateAvailability(newAvailability)

  setDays({
    ...days,
    [day]: {
      available,
      availability: consolidatedAndSortedAvailability,
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
export const saveAvailability = async (userId, days, userTimezone) => {
  try {
    const res = await updateAvailability(userId, days, userTimezone)
    return res.data
  } catch (error) {
    throw error
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
  const newAvailability = [...days[day].availability]
  newAvailability.splice(idx, 1)

  const available = newAvailability.length > 0

  setDays({
    ...days,
    [day]: {
      available,
      availability: newAvailability,
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
export const addTimeSlot = (
  day,
  days,
  setDays,
  idx,
  disableAdd,
  toggleDisableAdd
) => {
  if (!disableAdd) {
    const preveiousEndTimeIndex = timeOptions.indexOf(
      days[day].availability[idx][1]
    )
    const nextStartTime = timeOptions[preveiousEndTimeIndex + 1]
    const nextTimeSlot = [nextStartTime, timeOptions[preveiousEndTimeIndex + 2]]
    const newAvailability = [...days[day].availability, nextTimeSlot]

    if (['11:00 PM', '11:30 PM'].includes(nextTimeSlot[1])) {
      toggleDisableAdd(true)
    } else {
      toggleDisableAdd(false)
    }
    const consolidatedAndSortedAvailability =
      consolidateAvailability(newAvailability)

    setDays({
      ...days,
      [day]: {
        available: days[day].available,
        availability: consolidatedAndSortedAvailability,
      },
    })
  }
}

/**
 * DISABLE FORWARD BUTTON
 *
 * Checks the availability for each day to determine if the forward button should be disabled.
 * It calculates the total available hours for each day and checks if it meets the requirement.
 *
 * @param days The availability data for each day.
 * @returns A boolean indicating whether the forward button should be disabled.
 */
export const disableForwardButton = (days): boolean => {
  const selectedDays = new Set()

  for (const day of Object.keys(days)) {
    const { availability, available } = days[day]
    let totalAvailableHours = 0

    if (available && availability.length > 0) {
      for (const slot of availability) {
        const [startSlot, endSlot] = slot
        if (startSlot && endSlot) {
          const startTime = dayjs(startSlot, 'LT')
          const endTime = dayjs(endSlot, 'LT')
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
    checkedDay =>
      checkedDay != 'Everyday' &&
      checked[checkedDay] &&
      daysMap[checkedDay] != day
  )
  const copiedTimeslot = [days[day].availability[idx]]
  const newAvail = {}

  daysToPasteTo?.forEach(day => {
    const storageDay = daysMap[day]
    newAvail[storageDay] = {
      available: true,
      availability: consolidateAvailability(
        days[storageDay].availability.concat(copiedTimeslot)
      ),
    }
  })

  setDays({
    ...days,
    ...newAvail,
  })
}

const daysMap = {
  Sunday: 'SUN',
  Monday: 'MON',
  Tuesday: 'TUE',
  Wednesday: 'WED',
  Thursday: 'THU',
  Friday: 'FRI',
  Saturday: 'SAT',
}
