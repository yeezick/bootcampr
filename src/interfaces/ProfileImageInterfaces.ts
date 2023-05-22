import { RefObject } from 'react'
import { Area, Point } from 'react-easy-crop/types'

export interface AvatarProps {
  imageUrl?: string | null
  clickable?: boolean | undefined
}

export interface ImageEditorModalProps {
  open: boolean
  onClose: () => void
  uploadedImage?: string | null
  setUploadedImage?: (uploadedImage: string | null) => void
  onSaveClick?: (image: string) => void
}

export interface ImageEditorHeaderProps {
  handleClose: () => void
}

export interface ImageEditorContentProps {
  uploadedImage: string | null
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
  uploadedImage?: string | null
  setUploadedImage?: React.Dispatch<React.SetStateAction<string | null>>
  onSaveClick?: (image: string) => void
  onDelete?: () => void
}

export interface FileInputProps {
  onFileChange: (dataUrl: string) => void
  fileInputRef: RefObject<HTMLInputElement>
}

export interface AvatarState {
  imageUrl: string | null
}
