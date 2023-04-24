import { timeOptions } from '../utils/data'

export const subOptions = (startTime, isStart, idx) => {
  const index = idx === 0 ? 0 : timeOptions.indexOf(startTime)
  return isStart ? timeOptions.slice(index) : timeOptions.slice(index + 1)
}
