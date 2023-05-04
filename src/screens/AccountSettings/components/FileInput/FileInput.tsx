import { ChangeEvent } from 'react'
import { FileInputProps } from 'utilities/types/ProfileImageInterfaces'
import loadImage from 'blueimp-load-image'
import './FileInput.scss'

/**
 * FileInput component to handle file input change, load the image file, and update the uploadedImage state.
 * @param {Object} props - Properties passed to the component.
 * @param {Function} onFileChange - Function to call when the file input changes.
 * @param {RefObject} fileInputRef - Ref object for the file input element.
 * @returns {JSX.Element} - FileInput component.
 */
const FileInput: React.FC<FileInputProps> = ({
  onFileChange,
  fileInputRef,
}) => {
  /**
   * Handles file input change, loads the image file, and updates the uploadedImage state.
   * @param {ChangeEvent} e - The change event from the file input element.
   */ const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0]

      loadImage(
        file,
        canvas => {
          if ((canvas as any).type === 'error') {
            console.error('Error loading image:', canvas)
          } else {
            const dataUrl = (canvas as HTMLCanvasElement).toDataURL()
            onFileChange(dataUrl)
          }
        },
        {
          orientation: true,
          canvas: true,
        }
      )
    }
  }

  return (
    <input
      id='file-input'
      type='file'
      accept='image/*'
      onChange={handleFileChange}
      ref={fileInputRef}
    />
  )
}

export default FileInput
