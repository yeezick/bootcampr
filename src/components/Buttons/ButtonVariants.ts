import { CommonButtonProps } from 'interfaces/components'
import { createButton } from './Buttons'

export const PrimaryButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'contained' })

export const SecondaryButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'outlined' })

export const TextButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'text' })
