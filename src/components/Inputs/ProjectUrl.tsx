import { FormControl } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { isUrl } from 'utils/components/Inputs'
import {
  selectCompletedInfo,
  updateDeployedUrl,
} from 'utils/redux/slices/projectSlice'

interface ProjectUrlProps {
  labelText?: string
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProjectUrl = ({ setIsDisabled, labelText }: ProjectUrlProps) => {
  const dispatch = useDispatch()
  const completedInfo = useSelector(selectCompletedInfo)
  const deployedUrl =
    Object.keys(completedInfo?.deployedUrl || {}).length > 0
      ? completedInfo?.deployedUrl || ''
      : ''

  const handleUrlChange = e => {
    const inputValue = e.target.value.trim()
    dispatch(updateDeployedUrl(inputValue))
  }

  useEffect(() => {
    isUrl(deployedUrl) ? setIsDisabled(false) : setIsDisabled(true)
  }, [deployedUrl, setIsDisabled])

  return (
    <FormControl>
      <label htmlFor='projectUrl'>
        <p style={styles.labelText}>{labelText}</p>
      </label>
      <style>{`
			.url-input:focus-visible {
				border: none; 
				outline: 2px solid #0d47a1 !important; 
				outline-offset: -1px;
				}`}</style>
      <input
        className='url-input'
        style={{ ...styles.input, boxSizing: 'border-box' }}
        id='projectUrl'
        onBlur={handleUrlChange}
        onChange={handleUrlChange}
        type='text'
        value={deployedUrl}
      />
    </FormControl>
  )
}

const styles = {
  labelText: {
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0',
  },
  input: {
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    height: '40px',
    lineHeight: '24px',
    marginTop: '16px',
    outline: '1px solid #212121',
    padding: '8px 16px',
    width: '328px',
  },
}
