import AuthSettingsFormDropdown from '../components/AuthSettingsFormDropdown'
import { DropDownSettings } from 'utilities/types/AccountSettingsInterface'

// Prop Declarations
const emailSettingsProps = {
  type: ['password', 'newEmail', 'confirmNewEmail'],
  fields: ['Password', 'New Email', 'Confirm New Email'],
}
const passwordSettingsProps = {
  type: ['password', 'newPassword', 'confirmNewPassword'],
  fields: ['Current Password', 'New Password', 'Confirm New Password'],
}

// Initialization
export const initialDropdownState: DropDownSettings = {
  password: false,
  email: false,
}

export const initialPasswordFormData = {
  password: '',
  newPassword: '',
  confirmNewPassword: '',
}

export const initialEmailFormData = {
  password: '',
  newEmail: '',
  confirmNewEmail: '',
}

// Constants
export const settings = [
  {
    title: 'Email',
    val: 'email',
    Component: AuthSettingsFormDropdown,
    props: { ...emailSettingsProps },
  },
  {
    title: 'Password',
    val: 'password',
    Component: AuthSettingsFormDropdown,
    props: { ...passwordSettingsProps },
  },
]
