import { useNavigate } from 'react-router-dom'

export const ProjectCompPagFour = ({ handlePageNavigation }) => {
  const navigate = useNavigate()

  const handleCancel = () => {
    // updateUserForm({ ...authUser })
    navigate(`/`)
  }

  return (
    <div className='projectcompletion__pag-whats-next'>
      <form className='projectcompletion__what-form'>
        <div className='projectcompletion__what-contents'>
          <div className='projectcompletion__what-title'>
            <h1>Woohoo! You did it!</h1>
          </div>
          <div className='projectcompletion__what-info'>
            <h2>What's Next</h2>
            <p>
              It was a pleasure having you and your teammate tryout our soft
              launch Bootcampr product! We’ll be releasing our official product
              soon with more prompts for you to try. So, we are hoping we get to
              see you again in the future!
            </p>
          </div>
          <div className='projectcompletion__what-info'>
            <h2>In the Meantime...</h2>
            <p>
              It would be great if you could answer a short survey and let us
              know how you felt about the overall experience at Bootcampr. We’ll
              be sending the same survey to other members as well.
              <br />
              <br />
              Upon completion, we’ll send you a certificate of completion via
              Email so you could show it off on LinkedIn!
            </p>
          </div>
        </div>
        <div className='projectcompletion__what-btns'>
          <button
            className='projectcompletion__wht-ans-btn'
            onClick={handleCancel}
          >
            Answer Survey
          </button>
          <button
            className='projectcompletion__wht-back-btn'
            onClick={() => handlePageNavigation('next')}
          >
            Go back to Project Page
          </button>
        </div>
      </form>
    </div>
  )
}
