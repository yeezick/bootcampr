import { generateDayJs } from 'utils/helpers'

export const determineUserAvailability = (
  currMember,
  dateFields,
  setIsAvailable
) => {
  console.log(dateFields)
  const [weekday, eventDate] = generateDayJs(dateFields.start)
    .format('ddd-M/D/YYYY')
    .split('-')
  const weekDay = weekday.toUpperCase()
  const { availability } = currMember
  const dayAvailability = availability[weekDay].availability
  for (let i = 0; i < dayAvailability.length; i++) {
    const [timeSlotStart, timeSlotEnd] = dayAvailability[i]
    const isLastSlot = i === dayAvailability.length - 1
    const timeSlotStartDayJs = generateDayJs(`${eventDate} ${timeSlotStart}`)
    const timeSlotEndDayJs = generateDayJs(`${eventDate} ${timeSlotEnd}`)
    const startDifference = timeSlotStartDayJs.diff(dateFields.start, 'minute')
    const endDifference = timeSlotEndDayJs.diff(dateFields.end, 'minute')
    const differenceFromSlotStartToEventEnd = timeSlotStartDayJs.diff(
      dateFields.end,
      'minute'
    )
    const differenceFromSlotEndToEventStart = timeSlotEndDayJs.diff(
      dateFields.start,
      'minute'
    )

    const startSlotGreaterThanEventEnd = differenceFromSlotStartToEventEnd >= 0
    const endSlotEarlierThanEventStart = differenceFromSlotEndToEventStart <= 0
    const startEarlierEndDuring = startDifference <= 0 && endDifference < 0
    const startEarlierEndLater = startDifference <= 0 && endDifference >= 0
    const startDuringEndDuring = startDifference >= 0 && endDifference < 0
    const startDuringEndLater = startDifference >= 0 && endDifference >= 0

    if (startSlotGreaterThanEventEnd) {
      setIsAvailable('unavailable')
      break
    } else if (endSlotEarlierThanEventStart) {
      if (isLastSlot) {
        setIsAvailable('unavailable')
      } else {
        continue
      }
    } else if (startEarlierEndLater) {
      setIsAvailable('available')
      break
    } else if (
      startEarlierEndDuring ||
      startDuringEndDuring ||
      startDuringEndLater
    ) {
      // Partial availability
      setIsAvailable('unavailable')
      break
    }
  }
}
