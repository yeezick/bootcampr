export const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export enum Timezones {
  ET = 'Eastern Time - US & Canada',
  CT = 'Central Time - US & Canada',
  MT = 'Mountain Time - US & Canada',
  PT = 'Pacific Time - US & Canada',
}

export const defaultAvailability = {
  ['SUN']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['MON']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['TUE']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['WED']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['THU']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['FRI']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
  ['SAT']: {
    available: false,
    availability: [['9:00 AM', '5:00 PM']],
  },
}

export const defaultSingleDayAvailability = {
  '6:00 AM': 'no',
  '6:30 AM': 'no',
  '7:00 AM': 'no',
  '7:30 AM': 'no',
  '8:00 AM': 'no',
  '8:30 AM': 'no',
  '9:00 AM': 'no',
  '9:30 AM': 'no',
  '10:00 AM': 'no',
  '10:30 AM': 'no',
  '11:00 AM': 'no',
  '11:30 AM': 'no',
  '12:00 PM': 'no',
  '12:30 PM': 'no',
  '1:00 PM': 'no',
  '1:30 PM': 'no',
  '2:00 PM': 'no',
  '2:30 PM': 'no',
  '3:00 PM': 'no',
  '3:30 PM': 'no',
  '4:00 PM': 'no',
  '4:30 PM': 'no',
  '5:00 PM': 'no',
  '5:30 PM': 'no',
  '6:00 PM': 'no',
  '6:30 PM': 'no',
  '7:00 PM': 'no',
  '7:30 PM': 'no',
  '8:00 PM': 'no',
  '8:30 PM': 'no',
  '9:00 PM': 'no',
  '9:30 PM': 'no',
  '10:00 PM': 'no',
  '10:30 PM': 'no',
  '11:00 PM': 'no',
  '11:30 PM': 'no',
}

export const timeOptions = Object.keys(defaultSingleDayAvailability)
