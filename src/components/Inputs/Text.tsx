import { BaseInput } from './BaseInput'
import { InputProps } from 'interfaces/components/Input'

// Not the same widget as textarea
// Create new file for text area & remove this comment when needed
type TextInputInterface = Omit<InputProps, 'type'>

export const Text = (props: TextInputInterface) => {
  const { label, name } = props
  const baseInputProps = {
    ...props,
    type: 'text',
  }

  return (
    <div className='form-input'>
      <label htmlFor={name}>{label}</label>
      <BaseInput {...baseInputProps} />
    </div>
  )
}
