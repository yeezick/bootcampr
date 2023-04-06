enum Weekdays {
  sunday = 'SUN',
  monday = 'MON',
}

const weekdays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export const Availability: React.FC = (): JSX.Element => {
  return (
    <div className='availability-container'>
      <TimeZoneInput />
      {weekdays.map(day => (
        <DayAvailabilityInputBanner />
      ))}
    </div>
  )
}

const TimeZoneInput = () => {
  return <div></div>
}

const DayAvailabilityInputBanner = () => {
  return (
    <div>
      //checkbox // DAY // Unavailable OR...
      <TimeSlotInput />
      // Add Timeslot Icon // Copy Availability Icon
    </div>
  )
}

const TimeSlotInput = () => {
  return <div>// Start time input // - // End time input // Delete Icon</div>
}

const SingleHourDropdownInput = () => {
  return <div>// input // dropdown</div>
}
