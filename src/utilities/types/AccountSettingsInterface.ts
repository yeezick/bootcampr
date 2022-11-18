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

export interface FormErrorsProps {
  VALIDATION_HELPERS: {
    fetchAPI: () => Promise<any> | { error: string; } |
    {
      error: {
        status: number;
        message: string;
      }
    };

    emailsMatch: (temp: any | EmailFormData) => boolean;
    passwordsMatch: (temp: any | PasswordFormData) => boolean
    validEmail: (temp: any | EmailFormData) => boolean
    emailFieldsFilledOut: (temp: any | EmailFormData) => boolean
    passwordFieldsFilledOut: (temp: any | PasswordFormData) => boolean
  }
  emailDropDownActive: boolean
  authFormData: EmailFormData | PasswordFormData
}

export interface AuthFormInputProps {
  field: string;
  setAuthFormData: React.Dispatch<React.SetStateAction<EmailFormData | PasswordFormData>>;
  authFormData: EmailFormData | PasswordFormData;
  type: string;
}