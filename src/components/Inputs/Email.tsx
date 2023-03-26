import { BaseInput } from './BaseInput'
import { InputProps } from 'interfaces/components/Input'

// Same as text input but subject to change & be specific to email
type EmailInputInterface = Omit<InputProps, 'type'>

export const Email = (props: EmailInputInterface) => {
  const { label, name } = props
  const baseInputProps = {
    ...props,
    type: 'email',
  }

  return (
    <div className='form-input'>
      <label htmlFor={name}>{label}</label>
      <BaseInput {...baseInputProps} />
    </div>
  )
}
