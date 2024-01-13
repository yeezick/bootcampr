import {
  FormControl,
  FormControlLabel,
  FormLabel,
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
      <FormLabel id='participation'>
        <h2>{labelText}</h2>
      </FormLabel>
      <RadioGroup
        aria-labelledby='participation'
        name='participation-radio-buttons-group'
        value={participation}
        onChange={handleChange}
      >
        <FormControlLabel
          value='true'
          control={<Radio />}
          label='My team will participate'
        />
        <FormControlLabel
          value='false'
          control={<Radio />}
          label='My team will not participate'
        />
        <p className='helper-text'>
          *Please let us know by xx/xx if you plan to participate.
        </p>
      </RadioGroup>
    </FormControl>
  )
}
