import { SignUpInterface } from 'interfaces/UserInterface'
export interface PasswordErrors {
  length?: string
  uppercase?: string
  lowercase?: string
  number?: string
}

export interface PasswordInputProps {
  formValues: SignUpInterface
  password: string
  passwordErrors: object
  setPasswordErrors: React.Dispatch<React.SetStateAction<PasswordErrors>>
  setFormValues: React.Dispatch<React.SetStateAction<SignUpInterface>>
}
