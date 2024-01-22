import { ReactElement } from 'react'
import {
  ButtonBaseProps,
  ButtonProps,
  ButtonTypeMap,
  ExtendButtonBase,
  SvgIconTypeMap,
} from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface CommonButton extends ButtonProps {
  endIcon?: string
  handler: any
  paginatorBtn?: boolean
  startIcon?: string
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
