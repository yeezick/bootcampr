import React, { RefObject } from 'react'
import { Area, Point } from 'react-easy-crop/types'
import { UserInterface } from './UserInterface'

export interface AvatarProps {
  clickable?: boolean | undefined
  openModal?: (() => void) | undefined
  setAnchorEl?: React.Dispatch<React.SetStateAction<boolean>>
  hasIcon?: boolean
  iconButtonClassName?: string
  addPhotoIconId?: string
  size?: 'tiny' | 'small' | 'medium'
  userId?: string
}

export interface TeamAvatarProps {
  size?: 'tiny' | 'x-small' | 'small' | 'medium' | 'large'
  userId: string
}

export interface ProfilePreviewImageProps {
  onOpen: boolean
  onClose: () => void
}

export interface ImageEditorModalProps {
  onOpen: boolean
  onClose: () => void
}

export interface ImageEditorHeaderProps {
  handleClose: () => void
}

export interface ImageEditorContentProps {
  profilePicture: string
  crop: Point
  zoom: number
  setCrop: (crop: Point) => void
  setCropArea: (cropArea: Area) => void
  setZoom: (zoom: number) => void
}

export interface FileInputProps {
  onFileChange: (dataUrl: string) => void
  fileInputRef: RefObject<HTMLInputElement>
}
