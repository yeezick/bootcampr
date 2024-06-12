import { Checkbox, Popover, Paper } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import './CopyTimesModal.scss'
import { weekdaysMap } from '../utils/data'
import { PrimaryButton } from 'components/Buttons'

export const CopyTimesModal = ({
  days,
  day,
  idx,
  copyTimes,
  setDays,
  open,
  id,
  anchorEl,
  handleClosePopover,
}) => {
  const timeString = `${days[day].availability[idx][0]} - ${days[day].availability[idx][1]}`
  const [checked, setChecked] = useState({
    Everyday: false,
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  })
  const [isDisabled, setIsDisabled] = useState(true)

  const weekdayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const modalEl = useRef(null)

  const handleApply = e => {
    copyTimes(checked, day, days, idx, setDays)
    handleClosePopover()
  }

  useEffect(() => {
    const handler = e => {
      if (
        modalEl.current &&
        !modalEl.current.contains(e.target) &&
        anchorEl &&
        !anchorEl.contains(e.target)
      ) {
        handleClosePopover()
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [anchorEl, handleClosePopover])

  useEffect(() => {
    const {
      Everyday,
      Sunday,
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
    } = checked
    const validSelection =
      Everyday ||
      Sunday ||
      Monday ||
      Tuesday ||
      Wednesday ||
      Thursday ||
      Friday ||
      Saturday

    setIsDisabled(!validSelection)
  }, [checked])

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      disablePortal
      keepMounted
    >
      <div className='copy-times-modal' ref={modalEl}>
        <p className='copy-times-text'>
          Copy <strong>{timeString}</strong> to:
        </p>
        <CopyTimesOption
          day='Everyday'
          selectedDay={day}
          checked={checked}
          setChecked={setChecked}
          key='Everyday'
        />
        {weekdayNames.map(
          weekdayName =>
            weekdayName !== weekdaysMap[day] && (
              <CopyTimesOption
                day={weekdayName}
                selectedDay={day}
                checked={checked}
                setChecked={setChecked}
                key={weekdayName}
              />
            )
        )}
        <div className='apply-submit-button'>
          <PrimaryButton
            onClick={handleApply}
            label='Apply'
            disabled={isDisabled}
            sx={{ width: '100%' }}
          />
        </div>
      </div>
    </Popover>
  )
}

const CopyTimesOption = ({ day, selectedDay, checked, setChecked }) => {
  const handleChange = e => {
    if (day === 'Everyday') {
      const toggle = !checked.Everyday
      setChecked({
        ...{
          Everyday: toggle,
          Sunday: toggle,
          Monday: toggle,
          Tuesday: toggle,
          Wednesday: toggle,
          Thursday: toggle,
          Friday: toggle,
          Saturday: toggle,
          [selectedDay]: false,
        },
      })
    } else {
      let newEveryday = checked.Everyday
      if (checked[day]) {
        newEveryday = false
      }
      setChecked({
        ...checked,
        [day]: !checked[day],
        Everyday: newEveryday,
      })
    }
  }
  return (
    <div className='copy-times-option'>
      <Checkbox
        checked={checked[day]}
        onChange={handleChange}
        name={day}
        sx={{ color: 'black', '&.Mui-checked': { color: '#022888' } }}
      />
      <h2
        className='copy-times-option-days'
        style={{ color: 'black', width: 100, fontSize: '17px' }}
      >
        {day === 'Everyday' ? 'Every Day' : day}
      </h2>
    </div>
  )
}
