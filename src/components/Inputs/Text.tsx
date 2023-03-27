import { BaseInput } from './BaseInput'
import { InputWidget } from 'interfaces/components/Input'

// Not the same widget as textarea
// Create new file for text area & remove this comment when needed

export const Text = (props: InputWidget) => {
  const baseInputProps = {
    ...props,
    type: 'text',
  }

  return (
    <div>
      <BaseInput {...baseInputProps} />
    </div>
  )
}
