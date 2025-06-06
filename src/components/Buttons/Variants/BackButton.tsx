import { CommonButtonProps } from 'interfaces/components'
import { createButton } from '../ButtonHelpers'

/**
 * This button accepts all Mui Button props as well as some custom props.
 *
 * Custom props to modify the function/appearance:
 * @param {string} [label] - The text to display on the button.
 * @param {function} [onClick] - Function to be called when the button is clicked.
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
export const BackButton = (props: CommonButtonProps) =>
  createButton({ ...props, variant: 'outlined', startIcon: 'leftArrow' })
