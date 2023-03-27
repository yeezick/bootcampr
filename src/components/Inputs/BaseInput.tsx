import { InputProps } from 'interfaces/components/Input'
import 'screens/Auth/SignUp/SignUp.scss'

export const BaseInput = ({
  autoComplete,
  helperText,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  required,
  type,
  value,
}: InputProps) => {
  const inputLabelProps = { helperText, label, name }
  return (
    <div className='form-input'>
      {label && <InputLabel {...inputLabelProps} />}
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
    </div>
  )
}

const InputLabel = ({ helperText, label, name }) => (
  <div className='input-label'>
    <label htmlFor={name}>{label}</label>
    {helperText && <span className='input-helper'>{helperText}</span>}
  </div>
)
