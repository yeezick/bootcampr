import validator from 'validator'

export const isEmptyString = str => {
  if (typeof str === 'string') {
    return validator.isEmpty(str, {
      ignore_whitespace: true,
    })
  } else return true
}
