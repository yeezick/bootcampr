// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiRepeat } from 'react-icons/fi'

export const ProjectCompPagThree = ({
  backgroundColor,
  handlePageNavigation,
}) => {
  const navigate = useNavigate()

  const handleCancel = () => {
    // updateUserForm({ ...authUser })
    navigate(`/`)
  }

  return (
    <div
      className='projectcompletion__pag-confirmation'
      style={{ backgroundColor }}
    >
      <form className='projectcompletion__confirmation-form'>
        <div>
          <h1>Great! You’re almost done!</h1>
          <p>
            Make sure to double check the information and submit your project!
          </p>
          <h3>Project URL</h3>
          <p>www.awesomeproject.com</p>
          <p>Edit</p>
          <h3>Presentation</h3>
          <p>Edit</p>
          <p>Participating</p>
          <h3>Participating Members</h3>
          <p>Edit</p>
          <p>Lisa Grimm</p>
          <p>Jean Dickens</p>
          <p>Victor Castigla</p>
          <p>John Doe</p>
        </div>
        <div className='projectcompletion__btns'>
          <button
            className='projectcompletion__back-btn'
            onClick={handleCancel}
          >
            <FiRepeat className='projectcompletion__back-icon' /> Back
          </button>
          <button
            className='projectcompletion__next-btn'
            onClick={() => handlePageNavigation('next')}
          >
            Next <FiRepeat className='projectcompletion__forward-icon' />
          </button>
        </div>
      </form>
    </div>
  )
}
