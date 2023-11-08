import { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { checkIfAllMembersInvited, removeAuthUserFromList } from 'utils/helpers'
import './MeetingModal'
import dayjs from 'dayjs'

export const SelectAttendees = ({
  authUser,
  attendees,
  inviteAll,
  handleInviteAll,
  setAttendees,
  toggleInviteAll,
  dateFields,
  setDateFields,
  projectMembers,
}) => {
  const [allFilteredMembers, setAllFilteredMembers] = useState([])
  // let filteredMembers = removeAuthUserFromList(projectMembers, authUser)
  /** Context
   * Unselect inviteAll checkbox if user has unselected members
   */
  useEffect(() => {
    checkIfAllMembersInvited(
      attendees,
      projectMembers,
      inviteAll,
      toggleInviteAll
    )
  }, [attendees])

  useEffect(() => {
    // Parse the start time as UTC date
    const { start, end } = dateFields
    let formattedEndTime
    const add30Minutes = dayjs(start).utc().add(30, 'minute')
    if (start === end) {
      formattedEndTime = add30Minutes.format('ddd h:mm A')
    } else {
      const endDate = dayjs(end).utc()
      formattedEndTime = endDate.format('ddd h:mm A')
    }
    const startDate = dayjs(start).utc()
    const formattedStartTime = startDate.format('ddd h:mm A')
    const selectedDay = formattedStartTime.slice(0, 3).toUpperCase()
    const startTimeOne = formattedStartTime.slice(3)
    const endTime = formattedEndTime.slice(3)

    // ! the time is not matching with  the availability time that the user has
    const filteredMembers = []
    const getAllAMembersThatAreAvailable = () => {
      for (let i = 0; i < projectMembers.length; i++) {
        const currMemberAvailability = projectMembers[i].availability
        const availabilityTime =
          currMemberAvailability[selectedDay].availability
        if (projectMembers[i].email !== authUser.email) {
          let isAvailable = false
          for (let time of availabilityTime) {
            const [availabilityTimeStartTime, availabilityTimeEndTime] = time
            if (
              availabilityTimeStartTime === startTimeOne &&
              availabilityTimeEndTime === endTime
            ) {
              isAvailable = true
              break
            }
          }
          filteredMembers.push({ ...projectMembers[i], isAvailable })
        }
      }
      setAllFilteredMembers(filteredMembers)
    }

    getAllAMembersThatAreAvailable()
  }, [dateFields])
  console.log(dateFields)
  if (projectMembers) {
    return (
      <div className='select-attendees-section'>
        <div className='select-attendees-wrapper'>
          <FormControlLabel
            control={
              <Checkbox checked={inviteAll} onChange={handleInviteAll} />
            }
            label='Invite all'
          />
          <FormGroup>
            {allFilteredMembers.map(currMember => (
              <div key={`select-member-${currMember._id}`}>
                <MemberCheckbox
                  attendees={attendees}
                  currMember={currMember}
                  setAttendees={setAttendees}
                />
              </div>
            ))}
          </FormGroup>
          <span className='select-attendees-helper-text'>
            Email invite will be sent to selected members
          </span>
        </div>
      </div>
    )
  } else return null
}

const MemberCheckbox = ({ attendees, currMember, setAttendees }) => {
  const handleMemberSelection = e => {
    setAttendees(state => {
      return { ...state, [e.target.name]: e.target.checked }
    })
  }

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={attendees[currMember.email] || false}
            onChange={handleMemberSelection}
            name={currMember.email}
          />
        }
        label={`${currMember.firstName} ${currMember.lastName}`}
      />
    </>
  )
}
