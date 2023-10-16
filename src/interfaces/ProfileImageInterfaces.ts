import React, { RefObject } from 'react'
import { Area, Point } from 'react-easy-crop/types'

export interface AvatarProps {
  clickable?: boolean | undefined
  openModal?: (() => void) | undefined
  setAnchorEl?: React.Dispatch<React.SetStateAction<boolean>>
  hasIcon?: boolean
  iconButtonClassName?: string
  addPhotoIconClassName?: string
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
