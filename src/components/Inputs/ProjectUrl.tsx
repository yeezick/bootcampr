import { FormControl } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { isUrl } from 'utils/components/Inputs'
import {
  selectCompletedInfo,
  updateDeployedUrl,
} from 'utils/redux/slices/projectSlice'

export const ProjectUrl = ({ setIsDisabled }) => {
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
    <FormControl className='url-input'>
      <label htmlFor='projectUrl'>
        <p>Project Url</p>
      </label>
      <input
        id='projectUrl'
        onBlur={handleUrlChange}
        onChange={handleUrlChange}
        type='text'
        value={deployedUrl}
      />
    </FormControl>
  )
}
