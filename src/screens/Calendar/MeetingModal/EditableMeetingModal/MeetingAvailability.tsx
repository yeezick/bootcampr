import { useEffect, useState } from 'react'
import { generateDayJs } from 'utils/helpers'

/* Considers all possible cases for user's availability
 * Most of these are partial availability & strictly set the foundation for
 * that logic if we were to pursue it
 * + means later than
 * - means eariler than
 * Difference in time
 * Time point A => Time point B
 * 4:30 PM => 10:30 PM
 * 4:30 is -360 minutes from 10:30 PM
 */

export const MeetingAvailability = ({ currMember, dateFields }) => {
  const [isAvailable, setIsAvailable] = useState('unavailable')

  useEffect(() => {
    const determineUserAvailability = (
      currMember,
      dateFields,
      setIsAvailable
    ) => {
      const [weekday, eventDate] = generateDayJs(dateFields.start)
        .format('ddd-M/D/YYYY')
        .split('-')
      const weekDay = weekday.toUpperCase()
      const { availability } = currMember
      const dayAvailability = availability[weekDay].availability
      for (let i = 0; i < dayAvailability.length; i++) {
        const [timeSlotStart, timeSlotEnd] = dayAvailability[i]
        const isLastSlot = i === dayAvailability.length - 1
        const timeSlotStartDayJs = generateDayJs(
          `${eventDate} ${timeSlotStart}`
        )
        const timeSlotEndDayJs = generateDayJs(`${eventDate} ${timeSlotEnd}`)
        const startDifference = timeSlotStartDayJs.diff(
          dateFields.start,
          'minute'
        )
        const endDifference = timeSlotEndDayJs.diff(dateFields.end, 'minute')
        const differenceFromSlotStartToEventEnd = timeSlotStartDayJs.diff(
          dateFields.end,
          'minute'
        )
        const differenceFromSlotEndToEventStart = timeSlotEndDayJs.diff(
          dateFields.start,
          'minute'
        )

        const startSlotGreaterThanEventEnd =
          differenceFromSlotStartToEventEnd >= 0
        const endSlotEarlierThanEventStart =
          differenceFromSlotEndToEventStart <= 0
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

    determineUserAvailability(currMember, dateFields, setIsAvailable)
  }, [dateFields.start, dateFields.end])

  let availabilityText = ''
  if (isAvailable === 'available') {
    availabilityText = 'Available'
  } else if (isAvailable === 'partial') {
    availabilityText = 'Partially available'
  } else {
    availabilityText = 'Unavailable'
  }
  return (
    <div className='availability-text'>
      <p>{availabilityText}</p>
    </div>
  )
}
