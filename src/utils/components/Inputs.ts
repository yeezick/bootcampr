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
