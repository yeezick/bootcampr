import { FormControl } from '@mui/material'
import { ProjectUrlProps } from 'interfaces/components'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { isUrl } from 'utils/components/Inputs'
import {
  selectCompletedInfo,
  updateDeployedUrl,
} from 'utils/redux/slices/projectSlice'
import './ProjectUrl.scss'

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
    <FormControl className='project-url-container'>
      <label htmlFor='projectUrl'>
        <p className='label-text'>{labelText}</p>
      </label>
      <input
        className='url-input'
        id='projectUrl'
        onBlur={handleUrlChange}
        onChange={handleUrlChange}
        type='text'
        value={deployedUrl}
      />
    </FormControl>
  )
}
