import { PasswordErrors } from 'interfaces/components'
import { useEffect, useState } from 'react'

export const passwordInputLabel = (
  passwordInputName: string,
  signUpInput: string,
  changePasswordInput: string,
  resetPasswordInput: string
) => {
  switch (passwordInputName) {
    case 'sign-up':
      return signUpInput
    case 'settings-pwd-reset':
      return changePasswordInput
    case 'email-pwd-reset':
      return resetPasswordInput
    default:
      return ''
  }
}

export const useFormValidation = (
  formValues,
  requiredField,
  toggleIsDisabled
) => {
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})

  useEffect(() => {
    const validateForm = () => {
      const { confirmPassword, password } = formValues
      const emptyForm = () => {
        if (requiredField === '') {
          return false
        } else {
          return true
        }
      }
      const passwordHasErrors = Object.values(passwordErrors).some(error =>
        ['neutral', 'criteria-not-met'].includes(error)
      )

      const passwordsMatch = () => {
        if (confirmPassword === '' || password === '' || passwordHasErrors) {
          return false
        } else if (confirmPassword !== password) {
          return false
        }
        return true
      }

      if (emptyForm() && passwordsMatch()) {
        return toggleIsDisabled(false)
      } else {
        return toggleIsDisabled(true)
      }
    }
    validateForm()
  }, [formValues, passwordErrors, requiredField, toggleIsDisabled])
}
