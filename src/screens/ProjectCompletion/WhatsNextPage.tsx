import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCompletedInfo } from 'utils/redux/slices/projectSlice'

export const WhatsNextPage = () => {
  const completedInfo = useSelector(selectCompletedInfo)
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(`/`)
  }

  const handleSurvey = e => {
    e.preventDefault()
    alert('TBD Google Survey Path')
  }

  const latestMemberIndex = completedInfo.participatingMembers.length - 1
  const latestMember = completedInfo.participatingMembers[latestMemberIndex]
  const shouldDisplayTime = latestMember?.decision === 'Participate'

  return (
    <div className='projectcompletion__pag-whats-next'>
      <form className='projectcompletion__what-form' onClick={handleSubmit}>
        <div className='projectcompletion__what-contents'>
          <div className='projectcompletion__what-title'>
            <h1>Woohoo! You did it!</h1>
          </div>
          {shouldDisplayTime ? (
            <div className='projectcompletion__what-info'>
              <h2>What's Next</h2>
              <p>
                It was a pleasure having you and your teammate tryout our soft
                launch Bootcampr product! We’ll be releasing our official
                product soon with more prompts for you to try. So, we are hoping
                we get to see you again in the future!
              </p>
            </div>
          ) : (
            <div className='projectcompletion__what-info'>
              <h2>What's Next</h2>
              <p>
                We’ll send all participating members a meeting link for the
                presentation day. Your team can present in any way or format, so
                be creative!
              </p>
            </div>
          )}
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
            onClick={handleSurvey}
          >
            Answer Survey
          </button>
          <button className='projectcompletion__wht-back-btn'>
            Go back to Project Page
          </button>
        </div>
      </form>
    </div>
  )
}
