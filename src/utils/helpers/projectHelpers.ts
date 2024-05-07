/**
 * @param presentationDate dayjs object
 * @param userTimezone string e.g. 'America/New_York'
 */
export const convertPresentationDateUserTZ = (
  presentationDate,
  userTimezone
) => {
  const { startDateEST, endDateEST } = presentationDate
  const startDateUserTZ = startDateEST.tz(userTimezone)
  const endDateUserTZ = endDateEST.tz(userTimezone)

  return { startDate: startDateUserTZ, endDate: endDateUserTZ }
}

/**
 * @param start dayjs object
 * @param end dayjs object
 * @param zoneAbbr string e.g ET, PT, MT
 */
export const formatPresentationDate = (start, end, zoneAbbr) => {
  const startTime = start.format('h:mma')
  const endTime = end.format('h:mma')
  const presentationDate = start.format('MMMM D, YYYY')

  return `${presentationDate} | ${startTime} - ${endTime} ${zoneAbbr}`
}

/**
 * @param presentationStartDate dayjs object
 * @param zone string
 */
export const getLastCallForPresentation = (presentationStartDate, zone) => {
  const presentationTime = presentationStartDate
    .subtract(48, 'hour')
    .format('MMMM D, YYYY h:mma')
  return `${presentationTime} ${zone}`
}
