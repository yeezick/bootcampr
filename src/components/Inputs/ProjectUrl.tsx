import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  selectProjectUrl,
  setIsDisabledFalse,
  setIsDisabledTrue,
  updateProjectUrl,
} from 'utils/redux/slices/projectCompletionSlice'

export const ProjectUrl = ({ labelText }) => {
  const dispatch = useDispatch()
  const projectUrl = useSelector(selectProjectUrl)

  const handleUrlChange = e => {
    const inputValue = e.target.value.trim()
    dispatch(updateProjectUrl(inputValue))
    isUrl(inputValue)
      ? dispatch(setIsDisabledFalse())
      : dispatch(setIsDisabledTrue())
  }

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
    <>
      <label htmlFor='projectUrl'>
        <p>{labelText}</p>
      </label>
      <input
        id='projectUrl'
        onChange={handleUrlChange}
        type='text'
        value={projectUrl}
      />
    </>
  )
}
