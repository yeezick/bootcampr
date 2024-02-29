import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { PaginatorButtonInterface } from 'interfaces/components'

export const PaginatorButton = ({
  buttonType,
  handler,
  text,
  disabled,
}: PaginatorButtonInterface) => {
  const sharedProps = { disabled, handler, text }

  if (buttonType === 'secondary') {
    return <SecondaryButton startIcon='leftArrow' {...sharedProps} />
  } else if (buttonType === 'primary') {
    return <PrimaryButton endIcon='rightArrow' {...sharedProps} />
  }
}

export const paginatorIconProps = {
  sx: {
    '&.MuiSvgIcon-root': {
      fontSize: 24,
    },
  },
}
