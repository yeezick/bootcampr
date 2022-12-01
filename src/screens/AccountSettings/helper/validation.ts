import { EmailFormData, PasswordFormData } from "../../../utilities/types/AccountSettingsInterface"
import { updateUsersEmail, updateUsersPassword } from '../../../utilities/api/users'

const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // only allows ab@.

export const VALIDATION_HELPERS = {
  fetchAPI: async (emailDropDownActive: boolean, authFormData: EmailFormData | PasswordFormData, id: string | undefined) => emailDropDownActive ? await updateUsersEmail(authFormData, id) : await updateUsersPassword(authFormData, id),
  emailsMatch: (temp: any | EmailFormData) => temp.newEmail === temp.confirmNewEmail,
  passwordsMatch: (temp: any | PasswordFormData) => temp.newPassword === temp.confirmNewPassword,
  validEmail: (temp: any | EmailFormData) => temp.newEmail.match(VALID_EMAIL_REGEX),
  emailFieldsFilledOut: (temp: any | EmailFormData) => temp.newEmail !== "" && temp.confirmNewEmail !== "",
  passwordFieldsFilledOut: (temp: any | PasswordFormData) => temp.newPassword !== "" && temp.confirmNewPassword !== ""
}

// Validate Email
export const validateEmailDropdown = (formDataCopy: EmailFormData | PasswordFormData, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { emailsMatch, validEmail } = VALIDATION_HELPERS

  if (validEmail(formDataCopy) && emailsMatch(formDataCopy)) setDisableButton(false)
  else setDisableButton(true)
}

// Validate Password
export const validatePasswordDropdown = (temp: PasswordFormData, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { passwordsMatch } = VALIDATION_HELPERS
  const fieldsNotFilledOut = temp.newPassword === "" || temp.password === ""

  if (!passwordsMatch(temp) || fieldsNotFilledOut) setDisableButton(true)
  else setDisableButton(false)
}