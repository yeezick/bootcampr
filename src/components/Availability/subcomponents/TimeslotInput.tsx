import { AddRounded, ContentCopyOutlined } from '@mui/icons-material'
import { FaRegTrashAlt } from 'react-icons/fa'
import { SelectTimeInput } from './SelectTimeInput'
import { useState, useEffect } from 'react'
import './CopyTimesModal.scss'
import {
  consolidateAvailability,
  deleteTimeSlot,
  addTimeSlot,
  renderCopyTimesModal,
  copyTimes,
} from '../utils/helpers'
import { weekdaysMap } from '../utils/data'
import { BCToolTip } from 'components/ToolTip/ToolTip'
import { CopyTimesModal } from './CopyTimesModal'
import { useAppSelector } from 'utils/redux/hooks'

export const TimeSlotInput = ({ day, days, setDays }) => {
  const [disableAdd, toggleDisableAdd] = useState(false)
  const [displayModal, toggleDisplayModal] = useState({
    0: false,
  })

  const getDisplay = idx => {
    return displayModal[idx]
  }

  useEffect(() => {}, [days])

  const handleRenderModal = (e, idx) => {
    renderCopyTimesModal(idx, displayModal, toggleDisplayModal)
  }

  return (
    <div className='timeslots-container'>
      {days[day].availability.map((slot, idx) => (
        <div key={`${slot}-${idx}`} className='timeslot-input'>
          <div className='left-banner'>
            <SelectTimeInput
              isStart={true}
              idx={idx}
              slot={slot}
              day={day}
              days={days}
              setDays={setDays}
              toggleDisableAdd={toggleDisableAdd}
            />
            <h4>--</h4>
            <SelectTimeInput
              isStart={false}
              day={day}
              idx={idx}
              slot={slot}
              days={days}
              setDays={setDays}
              toggleDisableAdd={toggleDisableAdd}
            />
            <div className='clickable-icon'>
              <FaRegTrashAlt
                className='react-icon'
                onClick={() => deleteTimeSlot(day, days, setDays, idx)}
              />
            </div>
          </div>
          <div className='right-banner'>
            {days[day].availability.length - 1 === idx && (
              <BCToolTip
                text={
                  disableAdd
                    ? `Cannot add new time block past 11:00 PM`
                    : `New time block for ${weekdaysMap[day]}`
                }
                child={
                  <div className='clickable-icon'>
                    <AddRounded
                      onClick={() =>
                        addTimeSlot(
                          day,
                          days,
                          setDays,
                          idx,
                          disableAdd,
                          toggleDisableAdd
                        )
                      }
                      className={`icon ${disableAdd ? 'disabled' : ''}`}
                    />
                  </div>
                }
              />
            )}
            <div>
              {getDisplay(idx) && (
                <CopyTimesModal
                  days={days}
                  day={day}
                  idx={idx}
                  copyTimes={copyTimes}
                  setDays={setDays}
                  handleRenderModal={handleRenderModal}
                />
              )}
              <BCToolTip
                text='Copy available time to other days'
                child={
                  <div className='clickable-icon'>
                    <ContentCopyOutlined
                      onClick={e => handleRenderModal(e, idx)}
                      className='icon'
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
