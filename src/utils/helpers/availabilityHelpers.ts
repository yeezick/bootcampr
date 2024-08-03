import * as dayjs from 'dayjs'
import {
  dayJSformattedTZdata,
  utcToCollabifyTimezoneMap,
} from 'utils/data/timeZoneConstants'

/**
 * Uses DayJS to guess curent user's local timezone
 *
 * DayJS has their own user friendly string version of timezone that they return. (e.g. America/Denver)
 * Since we store user timezones in UTC format (e.g. -7:00, -8:00, etc.) for easier compatibility + transform logic,
 * and also have our own unique UX defined user friendly timezone strings (Mountain Time (MT)),
 * we need to return the utc version to store on backend and user friendly version for frontend rendering
 *
 * @returns { utc, userFriendlyTZ }
 */
export const guessUserTimezone = () => {
  const userTZ = dayjs.tz.guess()

  if (
    userTZ &&
    dayJSformattedTZdata[userTZ] &&
    dayJSformattedTZdata[userTZ].utc
  ) {
    const utc = dayJSformattedTZdata[userTZ].utc
    const userFriendly = utcToCollabifyTimezoneMap[utc]

    return {
      utc,
      userFriendly,
    }
  } else {
    return undefined
  }
}
