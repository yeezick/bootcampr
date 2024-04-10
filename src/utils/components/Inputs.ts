/* Password Utils */
export const handlePasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormValues,
  passwordValidationsObj
) => {
  const { setPasswordValidations, passwordValidations } = passwordValidationsObj
  const { name, value } = e.target
  passwordValidator(value, setPasswordValidations, passwordValidations)
  setFormValues(currValues => {
    return { ...currValues, [name]: value }
  })
}

const passwordValidator = (
  inputStr: string,
  setPasswordValidations,
  passwordValidations
) => {
  const { lowercase, number, uppercase } = passwordValidations
  let missingLowercase = true
  let missingNumber = true
  let missingUppercase = true

  for (const char of inputStr) {
    if (number.regex.test(char)) missingNumber = true
    if (lowercase.regex.test(char)) missingLowercase = true
    if (uppercase.regex.test(char)) missingUppercase = true
  }

  setPasswordValidations({
    lowercase: {
      ...lowercase,
      isError: missingLowercase,
    },
    minChars: inputStr.length >= 8 ? true : false,
    number: {
      ...number,
      isError: missingNumber,
    },
    uppercase: {
      ...uppercase,
      isError: missingUppercase,
    },
  })
}

export const isUrl = string => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  )
  return urlPattern.test(string)
}

export const isLinkedInUrl = string => {
  if (string.length > 0) {
    const urlPattern = new RegExp(
      '(http(s?)://)?(www.)?linkedin.([a-z])+/(in/)([A-Za-z0-9]+)+/?'
    )

    return urlPattern.test(string)
  } else {
    return true
  }
}
