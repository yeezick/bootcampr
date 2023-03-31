export interface InputProps {
  autoComplete?: string
  customInputProps?: any
  helperText?: string
  inputRef?: React.MutableRefObject<any>
  label: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  pattern?: string
  placeholder?: string
  required?: boolean
  type: string
  validationMessages?: ValidationMessage[]
  value: string
}

export type ValidationMessage = {
  isError: boolean
  text: string
}

export type InputWidget = Omit<InputProps, 'type'>
