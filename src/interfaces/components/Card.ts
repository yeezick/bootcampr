import { SxProps } from '@mui/material'
import { ReactNode } from 'react'

export interface CardInterface {
  style?: SxProps
  onClick?: () => void
  children: ReactNode
  isSelected?: boolean
}
