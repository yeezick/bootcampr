import { InputProps } from 'interfaces/components/Input'
import 'screens/Auth/SignUp/SignUp.scss'

export const BaseInput = (props: InputProps) => {
  const { autoComplete, helperText, label, name, pattern, placeholder } = props
  const inputLabelProps = { helperText, label, name }
  const baseInputProps = {
    ...props,
    autoComplete: autoComplete ? autoComplete : 'off',
    placeholder: placeholder ? placeholder : '',
    pattern: pattern ? pattern : '',
  }

  return (
    <div className='form-input'>
      {label && <InputLabel {...inputLabelProps} />}
      <input {...baseInputProps} />
    </div>
  )
}

const InputLabel = ({ helperText, label, name }) => (
  <div className='input-label'>
    <label htmlFor={name}>{label}</label>
    {helperText && <span className='input-helper'>{helperText}</span>}
  </div>
)
