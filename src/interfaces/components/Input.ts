export interface InputProps {
  autoComplete?: string
  inputRef: React.MutableRefObject<any>
  label: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  passwordProps?: VisiblePasswordProps
  placeholder?: string
  required?: boolean
  type: string
  value: string
}

export interface VisiblePasswordProps {
  setInputType: React.Dispatch<React.SetStateAction<string>>
  inputType: string
}
