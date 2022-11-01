// Interfaces
export interface AccountSettingsProps {

}

export interface DropDownSettings {
  password: boolean;
  email: boolean;
}

// Constants
export const initialState: DropDownSettings = { password: false, email: false }

export const settings = [
  {
    title: "Email",
    val: 'email',
  },
  {
    title: "Password",
    val: 'password',
  },
  {
    title: "Username",
    val: 'username',
  }
]