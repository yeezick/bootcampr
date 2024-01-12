import { useSelector } from 'react-redux'
import { selectCompletedInfo } from 'utils/redux/slices/projectSlice'
import { getGroupClassName, getRowBreak } from 'utils/functions/paginatorLogic'
import { FiRepeat } from 'react-icons/fi'
import { useState } from 'react'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'

export const ConfirmationPage = ({ handlePageNavigation }) => {
  const completedInfo = useSelector(selectCompletedInfo)
  const latestMemberIndex = completedInfo.participatingMembers.length - 1
  const latestMember = completedInfo.participatingMembers[latestMemberIndex]
  const latestDecision =
    latestMember?.decision === 'Participate'
      ? 'Participate'
      : 'Not Participating'
  const shouldDisplayMember = latestMember?.decision === 'Participate'
  const participatingMembers = completedInfo.participatingMembers.filter(
    member => member.decision === 'Participate'
  )
  const deployedUrls = completedInfo.deployedUrl
  const latestUrlEntryIndex = Object.keys(deployedUrls).length - 1
  const latestUrl = deployedUrls[Object.keys(deployedUrls)[latestUrlEntryIndex]]

  const [inputChange, setInputChange] = useState(latestUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [selectedRadio, setSelectedRadio] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    handlePageNavigation('next')
  }

  const handleGoToSelectedPage = id => {
    return () => {
      handlePageNavigation('specific', id)
    }
  }

  const handleRadioChange = e => {
    setSelectedRadio(e.target.value)
    setIsDisabled(false)
  }

  const handleCancel = () => {
    handlePageNavigation('previous')
  }

  const handleInputChange = e => {
    setInputChange(e.target.value)
    setIsDisabled(!isUrl(inputChange))
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

  return (
    <div
      className='project-completion-confirmation-page'
      aria-labelledby='formHeader'
    >
      <form onSubmit={handleSubmit}>
        <section className='title'>
          <h1 id='formHeader'>Great! You’re almost done!</h1>
          <p>
            Make sure to double check the information and submit your project!
          </p>
        </section>

        <section className='url-container'>
          <label htmlFor='projectUrl'>
            <p>Project URL</p>
          </label>
          <input
            id='projectUrl'
            onChange={handleInputChange}
            type='text'
            value={inputChange}
          />
        </section>

        <section className='participation-container'>
          <h2>Presentation</h2>
          <div className='radio-btn-container'>
            <div className='radio-btn'>
              <input
                type='radio'
                id='participate'
                value='option1'
                checked={latestDecision === 'Participate'}
                onChange={handleRadioChange}
              />
              <label htmlFor='Participate'>
                <p>My team will participate</p>
              </label>
            </div>
            <div className='radio-btn'>
              <input
                type='radio'
                id='dontParticipate'
                value='option2'
                checked={latestDecision === 'Not Participating'}
                onChange={handleRadioChange}
              />
              <label htmlFor='Not Participating'>
                <p>My team will not participate</p>
              </label>
            </div>
          </div>
          <p className='helper-text'>
            *Please let us know by xx/xx if you plan to participate.
          </p>
        </section>

        {/* <div className='projectcompletion__confir-info'>
          <div className='projectcompletion__confir-url'>
            <div className='projectcompletion__confir-header'>
              <h3>Project URL</h3>
              <p onClick={handleGoToSelectedPage('url')}>Edit</p>
            </div>
            <p>{latestUrl || 'No URL entered'}</p>
          </div>
          <div className='projectcompletion__confir-time'>
            <div className='projectcompletion__confir-header'>
              <h3>Presentation</h3>
              <p onClick={handleGoToSelectedPage('presentation')}>Edit</p>
            </div>
            <p>{latestDecision}</p>
          </div>
          {shouldDisplayMember && (
            <div className='projectcompletion__confir-part'>
              <div className='projectcompletion__confir-header'>
                <h3>Participating Members</h3>
                <p onClick={handleGoToSelectedPage('presentation')}>Edit</p>
              </div>
              <div className='projectcompletion__confir-members'>
                {participatingMembers.map((member, index) => (
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
        </div> */}
        <Stack className='btn-container'>
          <SecondaryButton
            handler={handleCancel}
            text='Presentation'
            paginatorBtn
          />
          <PrimaryButton
            aria-disabled={isDisabled || isLoading}
            isDisabled={isDisabled || isLoading}
            text='Submit'
            type='submit'
          />
        </Stack>
      </form>
    </div>
  )
}
