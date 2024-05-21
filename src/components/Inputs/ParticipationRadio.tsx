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

interface ParticipationRadioProps {
  labelText?: string
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
  helperText?: string
}

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
          sx={participationRadioStyles}
          value={true}
          control={<Radio />}
          label='My team will participate'
        />
        <FormControlLabel
          sx={participationRadioStyles}
          value={false}
          control={<Radio />}
          label='My team will not participate'
        />
        {helperText && (
          <FormHelperText sx={{ margin: '-5px 0px 0px 30px' }}>
            *Please let us know by {helperText} if you plan to participate.
          </FormHelperText>
        )}
      </RadioGroup>
    </FormControl>
  )
}

const participationRadioStyles = {
  '.MuiRadio-root': {
    color: 'black',
    paddingLeft: '15px',
  },
  '.Mui-checked': {
    color: '#0d47a1',
  },
  '.MuiSvgIcon-root': {
    fontSize: '16px',
  },
}
