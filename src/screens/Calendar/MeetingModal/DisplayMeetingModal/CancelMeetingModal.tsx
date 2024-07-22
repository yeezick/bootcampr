import { CancelMeetingButtons } from './CancelMeetingButtons'
import {
  Box,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material'
import { useAppSelector } from 'utils/redux/hooks'
import { selectDisplayedEvent } from 'utils/redux/slices/calendarSlice'
import { useState } from 'react'

export const CancelMeetingModal = ({
  openModal,
  handleCloseModal,
  handleDelete,
  isLoading,
}) => {
  const displayedEvent = useAppSelector(selectDisplayedEvent)
  const [recurDelInd, setRecurDelInd] = useState('')
  const { recurringEventId } = displayedEvent

  const handleChange = e => {
    setRecurDelInd(e.target.value)
  }

  const handleDeleteClick = () => {
    handleDelete(recurDelInd)
  }

  return (
    <div>
      {recurringEventId ? (
        <div>
          <Modal
            open={openModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <h2>Cancel recurring meeting</h2>
              <p>
                All invitees will receive an email notification the meeting is
                canceled.
              </p>

              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  name='radio-buttons-group'
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value='instance'
                    control={<Radio />}
                    label='This meeting'
                  />
                  <FormControlLabel
                    value='series'
                    control={<Radio />}
                    label='All meetings in this series'
                  />
                </RadioGroup>
              </FormControl>
              <CancelMeetingButtons
                handleCloseModal={handleCloseModal}
                handleDelete={handleDeleteClick}
                isLoading={isLoading}
              />
            </Box>
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            open={openModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <h2>Cancel the meeting?</h2>
              <p>
                All invitees will receive an email notification the meeting is
                canceled.
              </p>
              <CancelMeetingButtons
                handleCloseModal={handleCloseModal}
                handleDelete={handleDeleteClick}
                isLoading={isLoading}
              />
            </Box>
          </Modal>
        </div>
      )}
    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxWidth: '300px',
  padding: '25px',
  paddingTop: '20px',
  borderRadius: '5px',
}
