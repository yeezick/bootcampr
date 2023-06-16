import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProject } from 'utils/api'
import { FiRepeat, FiArrowRight } from 'react-icons/fi'

export const ProjectCompPagOne = ({ handlePageNavigation }) => {
  const [inputChange, setInputChange] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const createdProject = {
      projectOwner: '',
      title: 'inputChange',
    }
    await createProject(createdProject)
  }

  const handleInputChange = e => {
    setInputChange(e.target.value)
  }

  const handleCancel = () => {
    // updateUserForm({ ...authUser })
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
      <form className='projectcompletion__form' onSubmit={handleSubmit}>
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
          <button
            className={nextButtonStyle}
            onClick={() => handlePageNavigation('next')}
          >
            Next <NextIcon className='projectcompletion__icon' />
          </button>
        </div>
      </form>
    </div>
  )
}
