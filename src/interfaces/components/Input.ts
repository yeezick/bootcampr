import { PasswordFormData } from 'interfaces/AccountSettingsInterface'
import { SignUpInterface } from 'interfaces/UserInterface'
export interface PasswordErrors {
  length?: string
  uppercase?: string
  lowercase?: string
  number?: string
}

export interface PasswordInputProps {
  disableErrorState?: () => void
  formValues: SignUpInterface | PasswordFormData
  inputError?: boolean
  password: string
  passwordErrors: object
  passwordInputName?: string
  setPasswordErrors: React.Dispatch<React.SetStateAction<PasswordErrors>>
  setFormValues:
    | React.Dispatch<React.SetStateAction<SignUpInterface>>
    | React.Dispatch<React.SetStateAction<PasswordFormData>>
}

export interface ProjectUrlProps {
  labelText?: string
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ParticipationRadioProps {
  labelText?: string
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
  helperText?: string
}
