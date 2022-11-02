import AuthSettingsFormDropdown from '../forms/AuthSettingsFormDropdown/AuthSettingsFormDropdown'


// Prop Declarations
const emailSettingsProps = {
  type: ['password', 'newEmail', 'confirmNewEmail'],
  fields: ["Password", 'New Email', "Confirm New Email"]
}
const passwordSettingsProps = {
  type: ['password', 'newPassword', 'confirmNewPassword'],
  fields: ["Current Password", 'New Password', "Confirm New Password"]
}

// Interfaces
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

// Initialization
export const initialState: DropDownSettings = {
  password: false,
  email: false
}

export const initialPasswordFormData = {
  password: "",
  newPassword: "",
  confirmNewPassword: ""
}

export const initialEmailFormData = {
  password: "",
  newEmail: "",
  confirmNewEmail: ""
}

// Constants
export const settings = [
  {
    title: "Email",
    val: 'email',
    Component: AuthSettingsFormDropdown,
    props: { ...emailSettingsProps }
  },
  {
    title: "Password",
    val: 'password',
    Component: AuthSettingsFormDropdown,
    props: { ...passwordSettingsProps }
  }
]


