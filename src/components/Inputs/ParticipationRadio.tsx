import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material'
import {
  selectCompletedInfo,
  updatePresenting,
} from 'utils/redux/slices/projectSlice'
import { ParticipationRadioProps } from 'interfaces/components'
import './ParticipationRadio.scss'

export const ParticipationRadio = ({
  labelText,
  setIsDisabled,
  helperText,
}: ParticipationRadioProps) => {
  const dispatch = useDispatch()
  const completedInfo = useSelector(selectCompletedInfo)
  const presenting = completedInfo.presenting

  const handleChange = e => {
    const participating = e.target.value === 'true'
    dispatch(updatePresenting(participating))
  }

  useEffect(() => {
    presenting !== null ? setIsDisabled(false) : setIsDisabled(true)
  }, [presenting, setIsDisabled])

  return (
    <FormControl className='participation-radio-container'>
      <label htmlFor='participationRadio'>
        <h2>{labelText}</h2>
      </label>
      <RadioGroup
        id='participationRadio'
        value={presenting}
        onChange={handleChange}
      >
        <FormControlLabel
          className='participation-radio'
          value={true}
          control={<Radio />}
          label='My team will participate'
        />
        <FormControlLabel
          className='participation-radio'
          value={false}
          control={<Radio />}
          label='My team will not participate'
        />
        {helperText && (
          <FormHelperText className='helper-text'>
            *Please let us know by {helperText} if you plan to participate.
          </FormHelperText>
        )}
      </RadioGroup>
    </FormControl>
  )
}
