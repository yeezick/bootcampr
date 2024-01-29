import { ReactElement } from 'react'
import { ButtonProps, SvgIconTypeMap } from '@mui/material'
import {
  DefaultComponentProps,
  OverridableComponent,
} from '@mui/material/OverridableComponent'

export interface CommonButton extends ButtonProps {
  endIcon?: MappedIcons
  handler?: any
  startIcon?: MappedIcons
  startIconProps?: IconProps
  endIconProps?: IconProps
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

export type IconProps = DefaultComponentProps<SvgIconTypeMap>

export type MappedIcons =
  | 'account'
  | 'calendar'
  | 'chatBubble'
  | 'close'
  | 'description'
  | 'email'
  | 'group'
  | 'leftArrow'
  | 'link'
  | 'localOffer'
  | 'lock'
  | 'person'
  | 'plus'
  | 'rightArrow'
  | 'tasks'
  | 'title'

export interface PaginatorButtonInterface extends ButtonProps {
  buttonType: 'secondary' | 'primary'
  handler?: any
  text: string
}
