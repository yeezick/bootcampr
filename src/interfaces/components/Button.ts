import { ReactElement } from 'react'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface CommonButton {
  endIcon?: string
  handler: any
  paginatorBtn?: boolean
  startIcon?: string
  text: string
}

export interface ConditionalButtonProps {
  endIcon?: ReactElement
  startIcon?: ReactElement
}

export interface IconMap {
  [key: string]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}
