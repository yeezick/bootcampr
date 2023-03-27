export interface InputProps {
  autoComplete?: string
  helperText?: string
  inputRef: React.MutableRefObject<any>
  label: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  required?: boolean
  type: string
  value: string
}

export type InputWidget = Omit<InputProps, 'type'>
