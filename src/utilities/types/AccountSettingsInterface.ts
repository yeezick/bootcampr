export interface UpdateCredentialsFeedbackMessageProps {
  updateStatus: string;
}

export interface ToggleDropdown {
  setting: string;
  tempModes: DropDownSettings;
  dropdownModes: DropDownSettings;
  setDropdownModes: React.Dispatch<React.SetStateAction<DropDownSettings>>
}

export interface DropdownToggleButtonProps extends ToggleDropdown {
  active: boolean;
}
export interface AuthSettingsFormDropdownProps {
  fields: string[];
  type: string[];
}

export interface DropDownSettings {
  password: boolean;
  email: boolean;
}

export interface EmailFormData {
  password: string;
  newEmail: string;
  confirmNewEmail: string;
}

export interface PasswordFormData {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface FormErrorsProps {
  emailDropDownActive: boolean
  authFormData: EmailFormData | PasswordFormData
}

export interface AuthFormInputProps {
  field: string;
  setAuthFormData: React.Dispatch<React.SetStateAction<EmailFormData | PasswordFormData>>;
  authFormData: EmailFormData | PasswordFormData;
  type: string;
}