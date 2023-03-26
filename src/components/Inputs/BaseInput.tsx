import { InputProps } from 'interfaces/components/Input'

export const BaseInput = ({
  autoComplete,
  inputRef,
  name,
  onChange,
  placeholder,
  required,
  type,
  value,
}: InputProps) => (
  <input
    autoComplete={autoComplete ? autoComplete : 'off'}
    id={name}
    name={name}
    onChange={onChange}
    placeholder={placeholder ? placeholder : ''}
    ref={inputRef}
    required={required}
    type={type}
    value={value}
  />
)
