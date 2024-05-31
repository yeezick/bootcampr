import { generateDayJs } from 'utils/helpers'
import { dayJSformattedTZdata } from 'utils/data/timeZoneConstants'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

function convertToUTC(time, timezoneOffset) {
  const formatedTime = dayjs(time).format('YYYY-MM-DDTHH:mm:ss')
  return dayjs.tz(formatedTime, timezoneOffset).utc().format()
}

function getUTCOffset(time, timezoneIdentifier) {
  return dayjs.tz(time, timezoneIdentifier).format('Z')
}

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

    console.log(
      'Availability for ',
      currMember.firstName,
      timeSlotStartInUTC,
      timeSlotEndInUTC
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
