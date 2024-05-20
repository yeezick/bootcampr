import { Box } from '@mui/material'

/**
 * This is a container to apply justify and gap to groups of Buttons.
 *
 * @param {string} [gap] - The amount of space between buttons in pixels. Defaults to '8px'.
 * @param {string} [justify] - The value for justify-content. Defaults to 'end'.
 *
 */
export const ButtonContainer = ({
  children,
  justify = 'end',
  gap = 8,
  style = {},
}) => {
  return (
    <Box display='flex' justifyContent={justify} style={style} width={'100%'}>
      <Box display='flex' gap={`${gap}px`}>
        {children}
      </Box>
    </Box>
  )
}
