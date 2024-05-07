import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import weekday from 'dayjs/plugin/weekday'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs.extend(weekday)

export const formatTimestamp = timestamp => {
  return dayjs(timestamp).format('MM/DD/YYYY hh:mm A')
}

export const getDurationFromNow = startTimeTimestamp => {
  const now = dayjs()
  const startTime = dayjs(startTimeTimestamp)
  const timeDiff = now.diff(startTime)
  const diffDuration = dayjs.duration(timeDiff)
  const days = diffDuration.asDays()

  if (days < 1) {
    const hours = diffDuration.hours()
    if (hours >= 1) {
      return `${hours}hr`
    }
    const minutes = diffDuration.minutes()
    if (minutes >= 1) {
      return `${minutes}m`
    }
    const seconds = diffDuration.seconds()
    return `${seconds}s`
  } else if (days < 7) {
    // day format like Mon, Tue etc
    return startTime.format('ddd')
  } else {
    const weeks = Math.floor(days / 7)
    return `${weeks}w`
  }
}
