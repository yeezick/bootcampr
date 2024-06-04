import { CommonButtonProps } from 'interfaces/components'
import { createButton } from '../ButtonHelpers'

//This feels a little out of place here as it's only used in one place. What's nice about the factory function is that this can just be copy/pasted right into CreateTicketTab.tsx. I'll save that for the implementation sweep though.
export const CreateTaskButton = (props: CommonButtonProps) =>
  createButton({
    ...props,
    colorScheme: 'create-task',
    startIcon: 'plus',
    variant: 'contained',
    style: { justifyContent: 'start' },
  })
