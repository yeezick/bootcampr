import { FormControl } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateDeployedUrl } from 'utils/redux/slices/projectSlice'

export const ProjectUrl = ({ setIsDisabled, userID, currentUrl }) => {
  const dispatch = useDispatch()

  const handleUrlChange = e => {
    const inputValue = e.target.value.trim()
    dispatch(
      updateDeployedUrl({
        [userID]: inputValue,
      })
    )
  }

  useEffect(() => {
    isUrl(currentUrl) ? setIsDisabled(false) : setIsDisabled(true)
  }, [currentUrl])

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
        value={currentUrl}
      />
    </FormControl>
  )
}
