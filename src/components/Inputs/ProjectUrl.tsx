import { FormControl } from '@mui/material'
import { useEffect } from 'react'

export const ProjectUrl = ({ setIsDisabled, projectUrl, setProjectUrl }) => {
  const handleUrlChange = e => {
    const inputValue = e.target.value.trim()
    setProjectUrl(inputValue)
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
