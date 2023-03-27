import { BaseInput } from './BaseInput'
import { InputWidget } from 'interfaces/components/Input'

// Same as text input but subject to change & be specific to email

export const Email = (props: InputWidget) => {
  const baseInputProps = {
    ...props,
    type: 'email',
  }

  return (
    <div>
      <BaseInput {...baseInputProps} />
    </div>
  )
}
