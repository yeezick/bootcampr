export const weekdaysMap = {
  SUN: 'Sunday',
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
}

export enum Timezones {
  ET = 'Eastern Time (ET)',
  CT = 'Central Time (CT)',
  MT = 'Mountain Time (MT)',
  PT = 'Pacific Time (PT)',
  AT = 'Alaskan Time (AKT)',
  HST = 'Hawaii-Aleutian Time (HT)',
}

export const defaultAvailabilityForm = {
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
  '12:30 AM': 'no',
  '1:00 AM': 'no',
  '1:30 AM': 'no',
  '2:00 AM': 'no',
  '2:30 AM': 'no',
  '3:00 AM': 'no',
  '3:30 AM': 'no',
  '4:00 AM': 'no',
  '4:30 AM': 'no',
  '5:00 AM': 'no',
  '5:30 AM': 'no',
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

export const userFriendlyTimes = [
  '12:00 AM',
  '12:30 AM',
  '1:00 AM',
  '1:30 AM',
  '2:00 AM',
  '2:30 AM',
  '3:00 AM',
  '3:30 AM',
  '4:00 AM',
  '4:30 AM',
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM',
]
