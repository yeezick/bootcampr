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

export const ParticipationRadio = ({ labelText, setIsDisabled }) => {
  const dispatch = useDispatch()
  const completedInfo = useSelector(selectCompletedInfo)
  const presenting = completedInfo.presenting

  const handleChange = e => {
    const participating = e.target.value
    dispatch(updatePresenting(participating))
    setIsDisabled(false)
  }

  useEffect(() => {
    presenting ? setIsDisabled(false) : setIsDisabled(true)
  }, [presenting, setIsDisabled])

  return (
    <FormControl>
      <label htmlFor='participationRadio'>
        <h2>{labelText}</h2>
      </label>
      <RadioGroup
        id='participationRadio'
        value={presenting}
        onChange={handleChange}
      >
        <FormControlLabel
          value='true'
          control={<Radio className='participation-radio' />}
          label='My team will participate'
        />
        <FormControlLabel
          value='false'
          control={<Radio className='participation-radio' />}
          label='My team will not participate'
        />
        <FormHelperText className='participation-helper-text'>
          {/* //TODO: refactor date to dynamic value */}
          *Please let us know by xx/xx if you plan to participate.
        </FormHelperText>
      </RadioGroup>
    </FormControl>
  )
}
