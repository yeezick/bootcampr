import { generateDayJs } from 'utils/helpers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

function convertToUTC(time, timezoneOffset) {
  return dayjs.tz(time, timezoneOffset).utc().format()
}

function convertAvailabilityToUTC(time, timezone) {
  return dayjs.tz(time, timezone).utc().format()
}

export const determineUserAvailability = (
  currMember,
  dateFields,
  setIsAvailable
) => {
  const eventTimezone = dateFields.eventTimezone
  const userTimezone = currMember.timezone
  const start = dayjs(dateFields.start).format('YYYY-MM-DDTHH:mm:ss')
  const end = dayjs(dateFields.end).format('YYYY-MM-DDTHH:mm:ss')
  console.log(eventTimezone)
  const startInUTC = convertToUTC(start, eventTimezone)
  const endInUTC = convertToUTC(end, eventTimezone)

  console.log('Event Times in UTC:', { startInUTC, endInUTC })

  const [weekday, eventDate] = generateDayJs(startInUTC)
    .format('ddd-M/D/YYYY')
    .split('-')
  const weekDay = weekday.toUpperCase()

  console.log('Weekday:', weekDay)

  const { availability } = currMember
  const dayAvailability = availability[weekDay].availability

  for (let i = 0; i < dayAvailability.length; i++) {
    const [timeSlotStart, timeSlotEnd] = dayAvailability[i]
    // console.log('Time slot start:', timeSlotStart)
    // const timeSlotStartInUTC = convertAvailabilityToUTC(`${eventDate} ${timeSlotStart}`, userTimezone)
    //console.log('Time slot end:', timeSlotEnd)
    //onst timeSlotEndInUTC = convertAvailabilityToUTC(`${eventDate} ${timeSlotEnd}`, userTimezone)

    const estStart = dayjs(`${eventDate} ${timeSlotStart}`).format(
      'YYYY-MM-DDTHH:mm:ss'
    )
    const estEnd = dayjs(`${eventDate} ${timeSlotEnd}`).format(
      'YYYY-MM-DDTHH:mm:ss'
    )
    const timeSlotStartInUTC = convertAvailabilityToUTC(estStart, userTimezone)
    const timeSlotEndInUTC = convertAvailabilityToUTC(estEnd, userTimezone)
    //const estEnd = dayjs.tz(timeSlotEnd, 'h:mm A', timezone).format();

    console.log(currMember.firstName, 'Time Slot in UTC:', {
      timeSlotStartInUTC,
      timeSlotEndInUTC,
    })

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
