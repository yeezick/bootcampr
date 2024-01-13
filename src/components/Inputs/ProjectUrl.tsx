import { FormControl } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  selectProjectUrl,
  updateProjectUrl,
} from 'utils/redux/slices/projectCompletionSlice'

export const ProjectUrl = ({ setIsDisabled }) => {
  const dispatch = useDispatch()
  const projectUrl = useSelector(selectProjectUrl)

  const handleUrlChange = e => {
    const inputValue = e.target.value.trim()
    dispatch(updateProjectUrl(inputValue))
  }

  useEffect(() => {
    isUrl(projectUrl) ? setIsDisabled(false) : setIsDisabled(true)
  }, [projectUrl])

  const isUrl = string => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '(www\\.)?' +
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}$',
      'i'
    )
    return urlPattern.test(string)
  }

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
        value={projectUrl}
      />
    </FormControl>
  )
}
