import { useEffect, useState } from 'react'

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

export const MeetingAvailability = ({ availabilityText }) => {
  return (
    <div className='availability-text'>
      <p>{availabilityText}</p>
    </div>
  )
}
