import { useSelector } from 'react-redux'
import { selectCompletedInfo } from 'utils/redux/slices/projectSlice'
import { FiRepeat } from 'react-icons/fi'

export const ProjectCompPagThree = ({ handlePageNavigation }) => {
  const completedInfo = useSelector(selectCompletedInfo)

  const handleSubmit = e => {
    e.preventDefault()
    handlePageNavigation('next')
  }

  const handleCancel = () => {
    handlePageNavigation('previous')
  }

  const latestMemberIndex = completedInfo.participatingMembers.length - 1
  const latestMember = completedInfo.participatingMembers[latestMemberIndex]
  const shouldDisplayTime = latestMember?.decision === 'Participate'
  const latestUrl = completedInfo.deployedUrl[latestMemberIndex]?.url

  //TODO: Look into how to use the "specific" navigation to jump
  // to certain paginators components - ask Eric
  //TODO: Would the "specific" nav be attached to the Edit text?

  return (
    <div className='projectcompletion__pag-confirmation'>
      <form
        className='projectcompletion__confirmation-form'
        onSubmit={handleSubmit}
      >
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
              <p>{latestUrl}</p>
            </div>
            <div className='projectcompletion__confir-time'>
              <div className='projectcompletion__confir-header'>
                <h3>Presentation</h3>
                <p>Edit</p>
              </div>
              <p>{latestMember?.decision}</p>
            </div>
            {shouldDisplayTime && (
              <div className='projectcompletion__confir-part'>
                <div className='projectcompletion__confir-header'>
                  <h3>Participating Members</h3>
                  <p>Edit</p>
                </div>
                <div className='projectcompletion__confir-members'>
                  <div className='projectcompletion__confir-mem-group1'>
                    {completedInfo.participatingMembers.map(member => (
                      <div key={member.user._id}>
                        <p>{`${member.user.firstName} ${member.user.lastName}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='projectcompletion__btns'>
          <button
            className='projectcompletion__back-btn'
            onClick={handleCancel}
          >
            <FiRepeat className='projectcompletion__back-icon' /> Back
          </button>
          <button className='projectcompletion__confir-next-btn'>
            Submit <FiRepeat className='projectcompletion__forward-icon' />
          </button>
        </div>
      </form>
    </div>
  )
}
