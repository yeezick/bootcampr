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

//commented icons are still needing to be sourced
export type MappedIcons =
  // | 'attach'
  | 'account'
  | 'back'
  | 'camera'
  // | 'cameraAdd'
  | 'calendar'
  | 'chat'
  | 'chatBubble' //called comment in design
  | 'check'
  | 'checkbox'
  | 'checkboxChecked'
  | 'checkboxIndeterminate'
  | 'checkCircle'
  | 'clock'
  | 'close'
  | 'closeChip'
  // | 'copy'
  | 'crop'
  | 'dash'
  // | 'delete'
  | 'description'
  | 'dropdownDown'
  | 'dropdownUp'
  | 'edit'
  | 'email'
  | 'error'
  // | 'eyeShow'
  // | 'eyeHide'
  | 'forward'
  // | 'github'
  // | 'google'
  | 'group'
  | 'help'
  | 'info'
  | 'leave'
  | 'leftArrow'
  | 'likeEmpty'
  | 'likeFilled'
  | 'link'
  // | 'linkedIn'
  | 'localOffer' //called status in design
  | 'lock' //called password in design
  | 'menuDots'
  | 'message'
  // | 'newMessage'
  | 'notifications'
  | 'page'
  | 'person'
  | 'plus'
  | 'portfolio'
  | 'radioButton'
  | 'radioButtonFilled'
  | 'rightArrow'
  | 'search'
  // | 'send'
  | 'tasks' //called checkList in design
  | 'title'
  // | 'upload'
  // | 'userRemoval'
  // | 'videoCamera'
  | 'warning'
export interface PaginatorButtonInterface extends ButtonProps {
  buttonType: 'secondary' | 'primary'
  colorScheme?: 'secondary' | 'primary'
  handler?: any
  text: string
}
