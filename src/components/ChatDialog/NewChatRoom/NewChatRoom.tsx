import { useState, useEffect } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { createGroupChatRoom, createPrivateChatRoom } from 'utils/api/chat'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { members } from './DummyMembers'
import './NewChatRoom.scss'

// will be removed when project data and functionality is incorporated
type Member = {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
  profilePicture: string
}

export const NewChatRoom = () => {
  const authUser = useAppSelector(selectAuthUser)
  const [engineers, setEngineers] = useState([])
  const [designers, setDesigners] = useState([])
  const [projectMembers, setProjectMembers] = useState<Member[]>([])
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])
  const [allMembersSelected, setAllMembersSelected] = useState(false)

  useEffect(() => {
    setEngineers(members.engineers)
    setDesigners(members.designers)

    setProjectMembers([...designers, ...engineers])
  }, [designers, engineers])

  useEffect(() => {
    selectedMembers.length === projectMembers.length
      ? setAllMembersSelected(true)
      : setAllMembersSelected(false)
  }, [selectedMembers, projectMembers])

  const handleMemberClick = (member: Member) => {
    selectedMembers.includes(member)
      ? setSelectedMembers(
          selectedMembers.filter(mem => mem._id !== member._id)
        )
      : setSelectedMembers([...selectedMembers, member])
  }

  const selectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setSelectedMembers(projectMembers)
      : setSelectedMembers([])
  }

  const handleSubmitNewChatRoom = async () => {
    if (selectedMembers.length > 1) {
      const participants = selectedMembers.map(member => member._id)

      const participantsNames = selectedMembers
        .map(member => `${member.firstName} ${member.lastName}`)
        .join(', ')
      await createGroupChatRoom(authUser._id, participants, participantsNames)
      console.log('group chat participants:', participants)
    } else {
      const recipientEmail = selectedMembers[0].email
      await createPrivateChatRoom(authUser._id, recipientEmail)
    }
  }
  console.log('selected members:', selectedMembers)
  return (
    <div className='new-chat-room-container'>
      <section>
        <ChatRoomRecipients
          handleMemberClick={handleMemberClick}
          selectedMembers={selectedMembers}
        />
        <p>Invite members from your project</p>
        <input
          type='checkbox'
          id='select-all-check'
          checked={allMembersSelected}
          onChange={selectAllClick}
        />
        <label>Invite all members</label>
        <AllProjectMembers
          projectMembers={projectMembers}
          selectedMembers={selectedMembers}
          handleMemberClick={handleMemberClick}
        />
      </section>
      <button
        disabled={selectedMembers.length === 0}
        onClick={handleSubmitNewChatRoom}
      >
        Create a Room
      </button>
    </div>
  )
}

const ChatRoomRecipients = ({ selectedMembers, handleMemberClick }) => {
  return (
    <div className='to-container'>
      <p>To:</p>
      <div className='to-member-grid'>
        {selectedMembers.map(member => (
          <div key={member._id} className='member-bar'>
            <p>
              {member.firstName} {member.lastName}
            </p>
            <IoMdCloseCircleOutline onClick={() => handleMemberClick(member)} />
          </div>
        ))}
      </div>
    </div>
  )
}

const AllProjectMembers = ({
  projectMembers,
  selectedMembers,
  handleMemberClick,
}) => {
  return (
    <div className='members-container'>
      {projectMembers.map(member => (
        <div
          className={
            selectedMembers.includes(member) ? 'member-selected' : 'member-grid'
          }
          key={member._id}
          onClick={() => handleMemberClick(member)}
        >
          <div className='avatar-grid'>
            <img src={member.profilePicture} alt='avatar' />
          </div>
          <div className='member-info-grid'>
            <h5>
              {member.firstName} {member.lastName}
            </h5>
            <p>{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
