import { ReactElement } from 'react'
import { ButtonProps, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface CommonButton extends ButtonProps {
  endIcon?: MappedIcons
  handler: any
  paginatorBtn?: boolean
  startIcon?: MappedIcons
  text: string
}

export interface ConditionalButtonProps extends ButtonProps {
  endIcon?: ReactElement
  startIcon?: ReactElement
}

export interface IconMap {
  [key: string]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}

export type MappedIcons =
  | 'account'
  | 'calendar'
  | 'chatBubble'
  | 'close'
  | 'description'
  | 'email'
  | 'group'
  | 'localOffer'
  | 'link'
  | 'lock'
  | 'person'
  | 'plus'
  | 'tasks'
  | 'title'
