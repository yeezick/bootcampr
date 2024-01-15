import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  selectParticipation,
  updateParticipation,
} from 'utils/redux/slices/projectCompletionSlice'

export const ParticipationRadio = ({ labelText, setIsDisabled }) => {
  const dispatch = useDispatch()
  const participation = useSelector(selectParticipation)

  const handleChange = e => {
    const participating = e.target.value
    dispatch(updateParticipation(participating))
    setIsDisabled(false)
  }

  return (
    <FormControl>
      <label htmlFor='participationRadio'>
        <h2>{labelText}</h2>
      </label>
      <RadioGroup
        id='participationRadio'
        value={participation}
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
