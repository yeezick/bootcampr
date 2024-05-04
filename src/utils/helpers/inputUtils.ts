import validator from 'validator'

export const isEmptyString = str =>
  validator.isEmpty(str, {
    ignore_whitespace: true,
  })
