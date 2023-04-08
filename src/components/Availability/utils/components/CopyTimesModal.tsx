import { Checkbox } from '@mui/material'
import './CopyTimesModal.scss'

export const CopyTimesModal = () => {
  return (
    <div className='copy-times-modal'>
      <p>Copy available times to:</p>
      <CopyTimesOption day='EVERY DAY' />
      <CopyTimesOption day='SUNDAY' />
      <CopyTimesOption day='MONDAY' />
      <CopyTimesOption day='TUESDAY' />
      <CopyTimesOption day='WEDNESDAY' />
      <CopyTimesOption day='THURSDAY' />
      <CopyTimesOption day='FRIDAY' />
      <CopyTimesOption day='SATURDAY' />
    </div>
  )
}

const CopyTimesOption = ({ day }) => {
  // disable / change color of text too
  return (
    <div className='copy-times-option'>
      <Checkbox
        disabled={day === 'WEDNESDAY'}
        name={day}
        // onChange={e => handleCheck(e)}
        sx={{ color: '#022888', '&.Mui-checked': { color: '#022888' } }}
      />
      <h2>{day}</h2>
    </div>
  )
}
