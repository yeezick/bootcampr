import { FormControl } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { isUrl } from 'utils/components/Inputs'
import {
  selectCompletedInfo,
  updateDeployedUrl,
} from 'utils/redux/slices/projectSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'

export const ProjectUrl = ({ setIsDisabled }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(selectAuthUser)
  const userID = authUser._id
  const completedInfo = useSelector(selectCompletedInfo)
  const deployedUrl =
    Object.keys(completedInfo?.deployedUrl || {}).length > 0
      ? completedInfo?.deployedUrl[userID] || ''
      : ''

  const handleUrlChange = e => {
    const inputValue = e.target.value.trim()
    dispatch(
      updateDeployedUrl({
        [userID]: inputValue,
      })
    )
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
