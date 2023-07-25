import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import { getOneProject } from 'utils/api'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectCompletedInfo,
  updateProject,
} from 'utils/redux/slices/projectSlice'
import { FiRepeat } from 'react-icons/fi'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'

export const ProjectCompPagTwo = ({ handlePageNavigation }) => {
  const authUser = useSelector(selectAuthUser)
  const completedInfo = useSelector(selectCompletedInfo)
  const dispatch: AppDispatch = useDispatch()
  const [checked, setChecked] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState('')
  const projectId = authUser.project

  const handleSubmit = async e => {
    e.preventDefault()

    if (isValidForm()) {
      try {
        const project = await getOneProject(projectId)
        console.log('Project after fetch: ', project)

        const member = {
          user: {
            _id: authUser._id,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            role: authUser.role,
          },
          decision:
            selectedRadio === 'option1' ? 'Participate' : "Don't participate",
        }

        let updatedMembers = project.completedInfo.participatingMembers || []

        console.log(
          'Project after ensuring completedInfo and participatingMembers are defined: ',
          project
        )

        // If the user selected "Don't participate", remove them from the participatingMembers array.
        if (selectedRadio === 'option2') {
          // Check if the user is already a participating member.
          const isParticipant = updatedMembers.some(
            pm => pm.userId === authUser._id
          )

          // If the user is a participating member, remove them from the array.
          if (isParticipant) {
            updatedMembers = updatedMembers.filter(
              pm => pm.userId !== authUser._id
            )
          }
        }
        // If the user selected "Participate", add them to the participatingMembers array.
        else if (selectedRadio === 'option1') {
          // Check if the user is already a participating member.
          const isParticipant = updatedMembers.some(
            pm => pm.userId === authUser._id
          )

          // If the user is not a participating member, add them to the array.
          if (!isParticipant) {
            console.log(
              'About to push member, participatingMembers: ',
              updatedMembers
            )
            updatedMembers.push(member)
          }
        }

        const updateProjectData = {
          completedInfo: {
            ...completedInfo,
            participatingMembers: updatedMembers,
          },
        }

        console.log(
          'About to call dispatch with both URL and Members: ',
          projectId,
          updateProjectData
        )
        dispatch(updateProject(updateProjectData))

        handlePageNavigation('next')
      } catch (error) {
        console.error(error)
      }
    } else {
      alert(
        `Please select "Participate" and "Select All Members" or select "Don't participate" before submitting.`
      )
    }
  }

  // const handleCheckBox = e => {
  //   setChecked(e.target.checked)
  // }

  const handleRadioChange = e => {
    setSelectedRadio(e.target.value)
  }

  const handleCancel = () => {
    setChecked(false)
    setSelectedRadio('')
    handlePageNavigation('previous')
  }

  const isValidForm = () => {
    return selectedRadio === 'option1' || selectedRadio === 'option2'
  }

  const getButtonClassName = () => {
    if (!selectedRadio && !checked) return 'projectcompletion__next-btn'
    return isValidForm()
      ? 'projectcompletion__next-btn-ready'
      : 'projectcompletion__next-btn'
  }

  return (
    <div className='projectcompletion__pag-presentation'>
      <form
        className='projectcompletion__presentation-form'
        onSubmit={handleSubmit}
      >
        <div className='projectcompletion__pre-contents'>
          <div className='projectcompletion__pre-details'>
            <h1>Project Presentation</h1>
            <div className='projectcompletion__pre-icons-containter'>
              <div className='projectcompletion__pre-icon-content'>
                <CalendarMonthOutlinedIcon className='projectcompletion__pre-icon' />
                <p>Sep 1, 2023 | 12:00pm - 2:00pm PST</p>
              </div>
              <div className='projectcompletion__pre-icon-content'>
                <AccessTimeOutlinedIcon className='projectcompletion__pre-icon' />
                <p>15 min presentation</p>
              </div>
              <div className='projectcompletion__pre-icon-content'>
                <VideocamOutlinedIcon className='projectcompletion__pre-icon' />
                <p>Meeting detail will be provided upon confirmation</p>
              </div>
            </div>
            <div className='projectcompletion__pre-para-content'>
              <p>
                Now that your team has deployed the project, take this
                opportunity to present in front of designers and developers and
                get feedback on your work!
              </p>
            </div>
          </div>
          <div className='projectcompletion__pre-part-container'>
            <div className='projectcompletion__pre-part-title'>
              <h3>Let us know if you’d like to participate!</h3>
            </div>
            <div className='projectcompletion__pre-part-radios'>
              <label className='projectcompletion__pre-part-label1' htmlFor=''>
                <input
                  type='radio'
                  value='option1'
                  checked={selectedRadio === 'option1'}
                  onChange={handleRadioChange}
                />
                <p>Participate</p>
              </label>
              <label className='projectcompletion__pre-part-label2' htmlFor=''>
                <input
                  type='radio'
                  value='option2'
                  checked={selectedRadio === 'option2'}
                  onChange={handleRadioChange}
                />
                <div>
                  <p className='projectcompletion__pre-part-para1'>
                    Don't participate
                  </p>
                  <p className='projectcompletion__pre-part-para2'>
                    * your team can still decide to participate x day before Sep
                    1
                  </p>
                </div>
              </label>
            </div>
            {/* <div className='projectcompletion__pre-check-container'>
              <div className='projectcompletion__pre-check-title'>
                <h3>Who’s participating from your team?</h3>
              </div>
              <label className='projectcompletion__pre-check-label'>
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={handleCheckBox}
                />
                <p>Select All Members</p>
              </label>
            </div> */}
          </div>
        </div>
        <div className='projectcompletion__btns'>
          <button
            className='projectcompletion__back-btn'
            onClick={handleCancel}
          >
            <FiRepeat className='projectcompletion__back-icon' /> Back
          </button>
          <button type='submit' className={getButtonClassName()}>
            Next <FiRepeat className='projectcompletion__forward-icon' />
          </button>
        </div>
      </form>
    </div>
  )
}
