import { blankDayJs, generateDayJs } from './calendarHelpers'
import {
  statusInactive,
  statusRecurringUnpaid,
  statusRecurringWaitlist,
  statusSandboxOrWaitlist,
} from './userHelpers'

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

/**
 * @param presentationStartDate dayjs object
 */
export const formatLastCallDate = presentationStartDate => {
  const presentationTime = presentationStartDate
    .subtract(48, 'hour')
    .format('MM/DD/YYYY')
  return `${presentationTime}`
}

/**
 * @param url string
 */
export const getFullUrl = url => {
  if (!/^https?:\/\//i.test(url)) {
    return 'http://' + url
  }
  return url
}

export const determineProjectIdByStatus = authUser => {
  let projectId
  if (statusSandboxOrWaitlist(authUser.payment, authUser.projects)) {
    projectId = 'sandbox'
  } else if (statusRecurringWaitlist(authUser.payment, authUser.projects)) {
    projectId = 'waitlist'
  } else if (
    statusInactive(authUser.payment, authUser.projects) ||
    statusRecurringUnpaid(authUser.payment)
  ) {
    const allprojects = authUser.projects?.projects
    projectId = authUser.projects?.projects[allprojects.length - 1]
  } else {
    projectId = authUser.projects.activeProject
  }
  return projectId
}

export const getProjectHeaderTitle = (pathname, projetcsList) => {
  const [domain, paramId] = pathname.split('/').filter(Boolean)
  const project = projetcsList.find(
    projectInfo => projectInfo.projectId === paramId
  )
  const userHasMultipleProject = projetcsList.length > 1

  return userHasMultipleProject && project
    ? `${project.label}: Product Details`
    : 'Product Details'
}
