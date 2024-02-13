import { ReactElement } from 'react'
import { ButtonProps, SvgIconTypeMap } from '@mui/material'
import {
  DefaultComponentProps,
  OverridableComponent,
} from '@mui/material/OverridableComponent'

export interface CommonButtonProps extends ButtonProps {
  colorScheme?: 'primary' | 'secondary' | 'create-task'
  endIcon?: MappedIcons
  handler?: any
  paginatorBtn?: boolean
  startIcon?: MappedIcons
  text?: string
}

export interface IconBtnProps extends ButtonProps {
  filled?: boolean
  handler?: any
  icon: MappedIcons
  iconSize: 'large' | 'small'
}

export interface ConditionalButtonProps extends ButtonProps {
  endIcon?: ReactElement
  startIcon?: ReactElement
}

export interface IconMap {
  [key: string]:
    | OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
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
  colorScheme?: 'secondary' | 'primary'
  handler?: any
  text: string
}
