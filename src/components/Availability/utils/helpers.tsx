import { timeOptions } from '../utils/data'

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
export const consolidateAvailability = availability => {
  for (let i = 1; i < availability.length; i++) {
    const timeA = availability[i][0]
    const timeB = availability[i - 1][1]
    if (timeOptions.indexOf(timeA) <= timeOptions.indexOf(timeB)) {
      availability[i - 1] = [availability[i - 1][0], availability[i][1]]
      availability.splice(i, 1)
    }
  }
  return availability
}

/**
 * SINGLE TIME SELECT INPUT HANDLER
 *
 * Takes either a start or end time of a time slot and updates availability
 * state to match new time input
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

export const handleCheck = (e, day, days, setDays) => {
  const available = !days[e.target.name].available
  const newAvailability =
    days[e.target.name].availability.length > 0
      ? days[e.target.name].availability
      : [['9:00 AM', '5:00 PM']]

  setDays({
    ...days,
    [day]: {
      available,
      availability: newAvailability,
    },
  })
}

export const getNextTimeslot = currentTime => {
  const index = timeOptions.indexOf(currentTime)
  return [timeOptions[index + 1], timeOptions[index + 2]]
}

export const deleteTimeSlot = (day, days, setDays, idx) => {
  let newAvailability
  if (days[day].availability.length === 1) {
    newAvailability = {
      available: false,
      availability: [['9:00 AM', '5:00 PM']],
    }
  } else {
    newAvailability = {
      available: true,
      availability: [...days[day].availability],
    }
    newAvailability.availability.splice(idx, 1)
  }

  setDays({
    ...days,
    [day]: {
      ...newAvailability,
    },
  })
}

export const addTimeSlot = (day, days, setDays, idx) => {
  const nextTimeslot = getNextTimeslot(days[day].availability[idx][1])
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

export const renderCopyTimesModal = (
  day,
  idx,
  displayModal,
  toggleDisplayModal
) => {
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
  daysToPasteTo.forEach(day => {
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
