import { IconBtnProps } from 'interfaces/components'
import { createIconButton } from '../ButtonHelpers'

/**
 * @param {React.ReactNode} [icon] - The icon to be rendered.
 * @see {@link 'src/utils/components/Icons.tsx'} for full list of available icons
 * @param {boolean} [filled] - Whether the button background is filled.
* @param {('small' | 'medium' | 'large' )} [iconSize] - The size of the icon; small, medium, or large.

 * @param {function} [onClick] - Function to be called when the button is clicked.
 * @param {object} [style] - Custom styles to be applied to the button.
 * @param {boolean} [disabled] - Whether the button is disabled.
 * @param {string} [href] - Cause the button to render as a link and direct to the given destination.
 */
export const IconBtn = (props: IconBtnProps) => createIconButton(props)
