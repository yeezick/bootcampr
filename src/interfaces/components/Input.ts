import { SignUpInterface } from 'interfaces/UserInterface'
export interface ErrorInterface {
  length?: string
  uppercase?: string
  lowercase?: string
  number?: string
}

export interface PasswordInputProps {
  formValues: SignUpInterface
  password: string
  setFormValues: React.Dispatch<React.SetStateAction<SignUpInterface>>
}
