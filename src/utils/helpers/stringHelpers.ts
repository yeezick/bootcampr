export const concatenatedString = (statusString: string) =>
  statusString.replace(/\s+/g, '')

export const splitCamelCaseToWords = (statusString: string) =>
  statusString?.split(/(?=[A-Z])/).join(' ')
