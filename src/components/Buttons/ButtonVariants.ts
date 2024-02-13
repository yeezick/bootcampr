import { CommonButtonProps } from 'interfaces/components'
import { createButton } from './Buttons'

export const PrimaryButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'contained' })

export const SecondaryButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'outlined' })

export const TextButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'text' })

//This feels a little out of place here as it's only used in one place. What's nice about the factory function is that this can just be copy/pasted right into CreateTicketTab.tsx. I'll save that for the implementation sweep though.
export const CreateTaskButton = (props: CommonButtonProps) =>
  createButton({
    ...props,
    colorScheme: 'create-task',
    startIcon: 'plus',
    text: 'Create task',
    variant: 'contained',
  })

export const IconBtn = (props: CommonButtonProps) => createButton(props)
