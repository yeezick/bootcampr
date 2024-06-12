import { generateDayJs, convertToUTC } from 'utils/helpers'
import { dayJSformattedTZdata } from 'utils/data/timeZoneConstants'

export const determineUserAvailability = (
  currMember,
  dateFields,
  setIsAvailable
) => {
  const eventTimezone = dateFields.eventTimezone
  const userTimezone = currMember.timezone

  const eventUTC = dayJSformattedTZdata[eventTimezone].utc

  const startInUTC = convertToUTC(dateFields.start, eventUTC)
  const endInUTC = convertToUTC(dateFields.end, eventUTC)

  const [weekday, eventDate] = generateDayJs(startInUTC)
    .format('ddd-M/D/YYYY')
    .split('-')
  const weekDay = weekday.toUpperCase()

  const { availability } = currMember
  const dayAvailability = availability[weekDay].availability

  for (let i = 0; i < dayAvailability.length; i++) {
    const [timeSlotStart, timeSlotEnd] = dayAvailability[i]

    const timeSlotStartInUTC = convertToUTC(
      `${eventDate} ${timeSlotStart}`,
      userTimezone
    )
    const timeSlotEndInUTC = convertToUTC(
      `${eventDate} ${timeSlotEnd}`,
      userTimezone
    )

    const isLastSlot = i === dayAvailability.length - 1
    const timeSlotStartDayJs = generateDayJs(timeSlotStartInUTC)
    const timeSlotEndDayJs = generateDayJs(timeSlotEndInUTC)
    const startDifference = timeSlotStartDayJs.diff(startInUTC, 'minute')
    const endDifference = timeSlotEndDayJs.diff(endInUTC, 'minute')
    const differenceFromSlotStartToEventEnd = timeSlotStartDayJs.diff(
      endInUTC,
      'minute'
    )
    const differenceFromSlotEndToEventStart = timeSlotEndDayJs.diff(
      startInUTC,
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
