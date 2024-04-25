import './CommonModal.scss'
import { Modal } from '@mui/material'
import { ButtonStyle } from 'utils/data/authSettingsConstants'
import { CommonModalProps } from 'interfaces/AccountSettingsInterface'
import { useEffect, useState } from 'react'
import { PrimaryButton, TextButton } from 'components/Buttons'

export const CommonModal = ({
  isOpen,
  handleCancel,
  handleConfirm,
  heading,
  body,
  body2,
  body3,
  inputType,
  inputValue,
  inputOnChange,
  inputPlaceholder,
  isError = false,
  inputErrorMessage = '',
  cancelButtonLabel,
  confirmButtonLabel,
  confirmButtonDisabled,
  customWidth = 403,
}: CommonModalProps) => {
  const [inputClassname, setInputClassname] = useState('input')

  useEffect(() => {
    if (isError) {
      setInputClassname('input-error')
    } else {
      setInputClassname('input')
    }
  }, [isError])

  return (
    <>
      <Modal className='common-modal main' open={isOpen}>
        <div className='common-modal container' style={{ width: customWidth }}>
          <div className='common-modal contents'>
            <div className='common-modal heading'>{heading}</div>
            <div className='common-modal body'>
              <div className='body1'>{body}</div>
              <div className='body2'>{body2}</div>
              <div className='body3'>{body3}</div>
            </div>
            {inputType && (
              <div className='input-container'>
                <input
                  className={`common-modal ${inputClassname}`}
                  type={inputType}
                  value={inputValue}
                  onChange={inputOnChange}
                  placeholder={inputPlaceholder}
                />
                {isError && (
                  <div className='common-modal error-message'>
                    {inputErrorMessage}
                  </div>
                )}
              </div>
            )}
            <div className='common-modal buttons'>
              {cancelButtonLabel && (
                <TextButton
                  type='submit'
                  onClick={handleCancel}
                  label={cancelButtonLabel}
                />
              )}
              {confirmButtonLabel && (
                <PrimaryButton
                  type='submit'
                  onClick={handleConfirm}
                  disabled={confirmButtonDisabled}
                  label={confirmButtonLabel}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
