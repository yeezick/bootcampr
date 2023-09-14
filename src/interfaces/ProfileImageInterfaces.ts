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

export interface ImageEditorModalProps {
  open: boolean
  onClose: () => void
  uploadedImage?: string
  onSaveClick?: (image: string) => void
}

export interface ImageEditorHeaderProps {
  handleClose: () => void
}

export interface ImageEditorContentProps {
  uploadedImage: string
  crop: Point
  zoom: number
  setCrop: (crop: Point) => void
  setCropArea: (cropArea: Area) => void
  setZoom: (zoom: number) => void
}

export interface ImageEditorControlsProps {
  fileInputRef: React.RefObject<HTMLInputElement>
  handleUpload: (dataURL: string) => void
  zoom: number
  setZoom: (zoom: number) => void
  handleSave: () => void
}

export interface ProfilePreviewImageProps {
  open: boolean
  onClose: () => void
  uploadedImage?: string
}

export interface FileInputProps {
  onFileChange: (dataUrl: string) => void
  fileInputRef: RefObject<HTMLInputElement>
}
