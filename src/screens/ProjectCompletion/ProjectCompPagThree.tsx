import { FiRepeat } from 'react-icons/fi'

export const ProjectCompPagThree = ({ handlePageNavigation }) => {
  const handleCancel = () => {
    handlePageNavigation('previous')
  }

  return (
    <div className='projectcompletion__pag-confirmation'>
      <form className='projectcompletion__confirmation-form'>
        <div className='projectcompletion__confir-contents'>
          <div className='projectcompletion__confir-title'>
            <h1>Great! You’re almost done!</h1>
            <p>
              Make sure to double check the information and submit your project!
            </p>
          </div>
          <div className='projectcompletion__confir-info'>
            <div className='projectcompletion__confir-url'>
              <div className='projectcompletion__confir-header'>
                <h3>Project URL</h3>
                <p>Edit</p>
              </div>
              <p>www.awesomeproject.com</p>
            </div>
            <div className='projectcompletion__confir-time'>
              <div className='projectcompletion__confir-header'>
                <h3>Presentation</h3>
                <p>Edit</p>
              </div>
              <p>Participating</p>
            </div>
            <div className='projectcompletion__confir-part'>
              <div className='projectcompletion__confir-header'>
                <h3>Participating Members</h3>
                <p>Edit</p>
              </div>
              <div className='projectcompletion__confir-members'>
                <div className='projectcompletion__confir-mem-group1'>
                  <p>Lisa Grimm</p>
                  <p>Victor Castigla</p>
                </div>
                <div className='projectcompletion__confir-mem-group2'>
                  <p>Jean Dickens</p>
                  <p>John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='projectcompletion__btns'>
          <button
            className='projectcompletion__back-btn'
            onClick={handleCancel}
          >
            <FiRepeat className='projectcompletion__back-icon' /> Back
          </button>
          <button
            className='projectcompletion__confir-next-btn'
            onClick={() => handlePageNavigation('next')}
          >
            Submit <FiRepeat className='projectcompletion__forward-icon' />
          </button>
        </div>
      </form>
    </div>
  )
}
