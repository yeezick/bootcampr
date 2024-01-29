import { Button } from '@mui/material'
import { CommonButton, ConditionalButtonProps } from 'interfaces/components'
import { fetchIcon } from 'utils/components/Icons'
// import { ButtonProps } from 'interfaces/components'
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

export const SecondaryButton = ({
  children,
  className,
  handler,
  startIcon,
  endIcon,
  text,
  ...MuiProps
}: CommonButton) => {
  const conditionalProps: ConditionalButtonProps = { ...MuiProps }
  if (startIcon) conditionalProps.startIcon = fetchIcon(startIcon)
  if (endIcon) conditionalProps.endIcon = fetchIcon(endIcon)
  if (MuiProps.sx) conditionalProps.sx = MuiProps.sx
  conditionalProps.sx = {
    ...secondaryButtonSx,
    ...conditionalProps.sx,
    textTransform: 'none', // textTransform can't be added to secondaryButtonSx or it throws a type error?
  }

  return (
    <Button
      className={className}
      onClick={handler}
      sx={{
        backgroundColor: '#ffffff',
        borderColor: '#5C6BC0',
        color: '#1A237E',
        marginRight: '8px',
        textTransform: 'none',
        minWidth: '150px',
        '&:hover': {
          backgroundColor: '#ffffff',
          color: '#1A237E',
        },
      }}
      variant='outlined'
    >
      {/* {paginatorBtn && <KeyboardBackspaceIcon sx={{ marginRight: '8px' }} />} */}
      {text}
      {children}
    </Button>
  )
}

const secondaryButtonSx = {
  borderColor: '#5C6BC0',
  color: '#1A237E',
  height: '40px',
  marginRight: '8px',
}

//     <Button onClick={handler} variant='outlined' {...conditionalProps}>
// </Button>
