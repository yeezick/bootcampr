import { useState, useEffect } from 'react'
import { editProject } from 'utils/api'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectProject,
  updateDeployedUrl,
} from 'utils/redux/slices/projectSlice'
import { FiRepeat, FiArrowRight } from 'react-icons/fi'

export const UrlPage = ({ handlePageNavigation }) => {
  const authUser = useSelector(selectAuthUser)
  const project = useSelector(selectProject)
  const [inputChange, setInputChange] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const projectID = project._id

  useEffect(() => {
    setIsLoading(false)
  }, [])

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = async e => {
    e.preventDefault()
    if (isUrl(inputChange)) {
      const isDuplicate = Object.entries(
        project.completedInfo?.deployedUrl || {}
      ).some(([userId, url]: [string, string]) => {
        return userId === authUser._id && url === inputChange
      })

      if (isDuplicate) {
        alert('URL already exists in the list.')
        return
      }

      const updatedProject = {
        completedInfo: {
          ...project.completedInfo,
          deployedUrl: {
            ...project.completedInfo?.deployedUrl,
            [authUser._id]: inputChange,
          },
        },
      }

      try {
        setIsLoading(true)
        const response = await editProject(projectID, updatedProject)

        if (response) {
          dispatch(updateDeployedUrl(updatedProject.completedInfo.deployedUrl))
          handlePageNavigation('next')
          setIsLoading(false)
        }
      } catch (error) {
        console.error('An error occurred while saving the URL.', error)
        setIsLoading(false)
      }
    } else {
      alert('Please enter a valid URL')
    }
  }

  const handleInputChange = e => {
    setInputChange(e.target.value)
  }

  const handleCancel = () => {
    setInputChange('')
    navigate(`/`)
  }

  const isUrl = string => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '(www\\.)' +
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}$',
      'i'
    )
    return urlPattern.test(string)
  }

  const nextButtonStyle = isUrl(inputChange)
    ? 'projectcompletion__next-btn-ready'
    : 'projectcompletion__next-btn'

  const NextIcon = isUrl(inputChange) ? FiArrowRight : FiRepeat

  return (
    <div className='projectcompletion__pag-url'>
      <form className='projectcompletion__form-url' onSubmit={handleSubmit}>
        <h1>Congrats on deploying your project!</h1>
        <p>
          Let’s begin by attaching link to your project site. Make sure all the
          requirements are met before you submit your work.
        </p>
        <label className='projectcompletion__label' htmlFor=''>
          <p>Project URL</p>
          <input
            className='projectcompletion__input'
            type='text'
            value={inputChange}
            onChange={handleInputChange}
          />
        </label>
        <div className='projectcompletion__btns'>
          <button
            className='projectcompletion__cancel-btn'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type='submit' className={nextButtonStyle}>
            Next <NextIcon className='projectcompletion__forward-icon' />
          </button>
        </div>
      </form>
    </div>
  )
}