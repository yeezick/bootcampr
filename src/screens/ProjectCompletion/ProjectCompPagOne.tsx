import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { editProject } from 'utils/api'
import { FiRepeat, FiArrowRight } from 'react-icons/fi'

export const ProjectCompPagOne = ({ handlePageNavigation }) => {
  const authUser = useSelector(selectAuthUser)
  const [inputChange, setInputChange] = useState('')
  const navigate = useNavigate()
  const projectID = authUser.project

  const handleSubmit = async e => {
    e.preventDefault()
    if (isUrl(inputChange)) {
      const updatedProject = {
        completedInfo: [
          {
            url: inputChange,
          },
        ],
      }

      try {
        const response = await editProject(projectID, updatedProject)
        if (response) {
          handlePageNavigation('next')
        }
      } catch (error) {
        console.error(error)
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
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
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
