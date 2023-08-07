import { useSelector } from 'react-redux'
import { selectCompletedInfo } from 'utils/redux/slices/projectSlice'
import { getGroupClassName, getRowBreak } from 'utils/functions/paginatorLogic'
import { FiRepeat } from 'react-icons/fi'

export const ConfirmationPage = ({ handlePageNavigation }) => {
  const completedInfo = useSelector(selectCompletedInfo)

  const handleSubmit = e => {
    e.preventDefault()
    handlePageNavigation('next')
  }

  const handleGoToSelectedPage = id => {
    return () => {
      handlePageNavigation('specific', id)
    }
  }

  const handleCancel = () => {
    handlePageNavigation('previous')
  }

  const latestMemberIndex = completedInfo.participatingMembers.length - 1
  const latestMember = completedInfo.participatingMembers[latestMemberIndex]
  const shouldDisplayTime = latestMember?.decision === 'Participate'
  const latestUrl = completedInfo.deployedUrl[latestMemberIndex]?.url

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
                <p onClick={handleGoToSelectedPage('url')}>Edit</p>
              </div>
              <p>{latestUrl}</p>
            </div>
            <div className='projectcompletion__confir-time'>
              <div className='projectcompletion__confir-header'>
                <h3>Presentation</h3>
                <p onClick={handleGoToSelectedPage('presentation')}>Edit</p>
              </div>
              <p>{latestMember?.decision}</p>
            </div>
            {shouldDisplayTime && (
              <div className='projectcompletion__confir-part'>
                <div className='projectcompletion__confir-header'>
                  <h3>Participating Members</h3>
                  <p onClick={handleGoToSelectedPage('presentation')}>Edit</p>
                </div>
                <div className='projectcompletion__confir-members'>
                  {completedInfo.participatingMembers.map((member, index) => (
                    <div key={member.user._id}>
                      <div className={getGroupClassName(index)}>
                        <p>{`${member.user.firstName} ${member.user.lastName}`}</p>
                      </div>
                      {getRowBreak(index) && (
                        <div className='projectcompletion__confir-mem-row-break' />
                      )}
                    </div>
                  ))}
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
