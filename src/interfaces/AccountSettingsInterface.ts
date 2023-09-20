export interface UpdateCredentialsFeedbackMessageProps {
  updateStatus: string
}

export interface FormDataCopy {
  newEmail?: string
  confirmNewEmail?: string
  newPassword?: string
  confirmNewPassword?: string
}
export interface ToggleDropdown {
  setting: string
  tempModes: DropDownSettings
  dropdownModes: DropDownSettings
  setDropdownModes: React.Dispatch<React.SetStateAction<DropDownSettings>>
}

export interface DropdownToggleButtonProps extends ToggleDropdown {
  active: boolean
}
export interface AuthSettingsFormDropdownProps {
  fields: string[]
  type: string[]
}

export interface DropDownSettings {
  password: boolean
  email: boolean
}

export interface EmailFormData {
  password: string
  newEmail: string
  confirmNewEmail: string
}

export interface PasswordFormData {
  password?: string
  currentPassword?: string
  confirmPassword?: string
  newPassword: string
  confirmNewPassword: string
}

export interface FormErrorsProps {
  emailDropDownActive: boolean
  authFormData: EmailFormData | PasswordFormData
}

export interface AuthFormInputProps {
  field: string
  setAuthFormData: React.Dispatch<
    React.SetStateAction<EmailFormData | PasswordFormData>
  >
  authFormData: EmailFormData | PasswordFormData
  type: string
}

export interface AlertBanners {
  status: boolean
  text?: string
  icon?: JSX.Element
  type?: string
}
