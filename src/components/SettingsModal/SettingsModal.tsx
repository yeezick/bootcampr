import './SettingsModal.scss'
import { Button, CircularProgress, Modal } from '@mui/material'
import { ButtonStyle } from 'utils/data/authSettingsConstants'
import { SettingsModalProps } from 'interfaces/AccountSettingsInterface'
import { useEffect, useState } from 'react'

export const SettingsModal = ({
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
  confirmButtonStyle = ButtonStyle.Orange,
  handlingRequest = false,
}: SettingsModalProps) => {
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
      <Modal className='settings-modal main' open={isOpen}>
        <div
          className='settings-modal container'
          style={{ width: customWidth }}
        >
          <div className='settings-modal heading'>{heading}</div>
          <div className='settings-modal body'>
            <div className='body1'>{body}</div>
            <div className='body2'>{body2}</div>
            <div className='body3'>{body3}</div>
          </div>
          {inputType && (
            <div className='input-container'>
              <input
                className={`settings-modal ${inputClassname}`}
                type={inputType}
                value={inputValue}
                onChange={inputOnChange}
                placeholder={inputPlaceholder}
              />
              {isError && (
                <div className='settings-modal error-message'>
                  {inputErrorMessage}
                </div>
              )}
            </div>
          )}
          <div className='settings-modal buttons'>
            {cancelButtonLabel && (
              <Button
                className='cancel'
                variant='text'
                type='submit'
                onClick={handleCancel}
              >
                {cancelButtonLabel}
              </Button>
            )}
            {confirmButtonLabel && (
              <Button
                className='confirm'
                variant='contained'
                type='submit'
                style={{
                  background: confirmButtonStyle.background,
                  color: confirmButtonStyle.color,
                }}
                onClick={handleConfirm}
                disabled={confirmButtonDisabled}
              >
                {confirmButtonLabel}
                {handlingRequest && <CircularProgress />}
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
