export interface AccountSettingsProps {

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

export interface AuthFormInputProps {
  field: string;
  setAuthFormData: React.Dispatch<React.SetStateAction<EmailFormData | PasswordFormData>>;
  authFormData: EmailFormData | PasswordFormData;
  type: string;
}