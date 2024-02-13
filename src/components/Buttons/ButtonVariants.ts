import { CommonButtonProps, IconBtnProps } from 'interfaces/components'
import { createButton, createIconButton } from './Buttons'

/**
 * This button accepts all Mui Button props as well as some custom props.
 *
 * Custom props to modify the function/appearance:
 * @param {string} [text] - The text to display on the button.
 * @param {function} [handler] - Function to be called when the button is clicked.
 * @param {boolean} [paginatorBtn] - Render a right arrow at the end of the button.
 * @param {('primary' | 'secondary' | 'create-task')} [colorScheme] - The color scheme of the button (primary = orange, blue, and white; secondary = red and white; create-task = shades of blue). Defaults to primary.
 * @param {React.ReactNode} [endIcon] - Add an icon to the end of the button.
 * @param {React.ReactNode} [startIcon] - Add an icon to the start of the button.
 *
 * Useful Button props:
 * @param {object} [style] - Custom styles to be applied to the button.
 * @param {boolean} [fullWidth] - Whether the button should take up the full width of its container.
 * @param {boolean} [disabled] - Whether the button is disabled.
 * @param {string} [href] - Cause the button to render as a link and direct to the given destination.
 */
export const PrimaryButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'contained' })

/**
 * This button accepts all Mui Button props as well as some custom props.
 *
 * Custom props to modify the function/appearance:
 * @param {string} [text] - The text to display on the button.
 * @param {function} [handler] - Function to be called when the button is clicked.
 * @param {boolean} [paginatorBtn] - Render a left arrow at the start of the button.
 * @param {('primary' | 'secondary' | 'create-task')} [colorScheme] - The color scheme of the button (primary = orange, blue, and white; secondary = red and white; create-task = shades of blue). Defaults to primary.
 * @param {React.ReactNode} [endIcon] - Add an icon to the end of the button.
 * @param {React.ReactNode} [startIcon] - Add an icon to the start of the button.
 *
 * Useful Button props:
 * @param {object} [style] - Custom styles to be applied to the button.
 * @param {boolean} [fullWidth] - Whether the button should take up the full width of its container.
 * @param {boolean} [disabled] - Whether the button is disabled.
 * @param {string} [href] - Cause the button to render as a link and direct to the given destination.
 */
export const SecondaryButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'outlined' })

/**
 * This button accepts all Mui Button props as well as some custom props.
 *
 * Custom props to modify the function/appearance:
 * @param {string} [text] - The text to display on the button.
 * @param {function} [handler] - Function to be called when the button is clicked.
 * @param {('primary' | 'secondary' | 'create-task')} [colorScheme] - The color scheme of the button (primary = orange, blue, and white; secondary = red and white; create-task = shades of blue). Defaults to primary.
 * @param {React.ReactNode} [endIcon] - Add an icon to the end of the button.
 * @param {React.ReactNode} [startIcon] - Add an icon to the start of the button.
 *
 * Useful Button props:
 * @param {object} [style] - Custom styles to be applied to the button.
 * @param {boolean} [fullWidth] - Whether the button should take up the full width of its container.
 * @param {boolean} [disabled] - Whether the button is disabled.
 * @param {string} [href] - Cause the button to render as a link and direct to the given destination.
 */
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

/**
 * @param {React.ReactNode} [icon] - The icon to be rendered.
 * @param {boolean} [filled] - Whether the button background is filled.
* @param {('small' | 'large' )} [iconSize] - The size of the icon.

 * @param {function} [handler] - Function to be called when the button is clicked.
 * @param {object} [style] - Custom styles to be applied to the button.
 * @param {boolean} [disabled] - Whether the button is disabled.
 * @param {string} [href] - Cause the button to render as a link and direct to the given destination.
 */
export const IconBtn = (props: IconBtnProps) => createIconButton(props)
