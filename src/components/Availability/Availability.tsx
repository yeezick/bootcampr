// Move all of this logic to a components folder for Availability
// and write this a just a screen to render for demo-ing
enum Weekdays {
  sunday = 'SUN',
  monday = 'MON',
}
console.log(Weekdays.sunday)

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
  // STATE:
  // - each day:
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
      {/* //checkbox // DAY // Unavailable OR... */}
      <TimeSlotInput />
      {/* // Add Timeslot Icon // Copy Availability Icon */}
    </div>
  )
}

const TimeSlotInput = () => {
  return (
    <div>
      {/* // Start time input // - // End time input // Delete Icon */}
      <SingleHourDropdownInput /> - <SingleHourDropdownInput />
    </div>
  )
}

const SingleHourDropdownInput = () => {
  return <div>{/* // input // dropdown */}</div>
}
