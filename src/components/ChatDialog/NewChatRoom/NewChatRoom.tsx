import { useState, useEffect } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { TfiCheck, TfiMinus } from 'react-icons/tfi'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { ProjectMemberInterface } from 'interfaces'
import { getProjectByUser } from 'utils/api'
import {
  createGroupChatRoom,
  createPrivateChatRoom,
  updateGroupChat,
} from 'utils/api/chat'
import {
  selectAuthUser,
  selectConversation,
  setCurrentConversation,
  setSelectedMember,
} from 'utils/redux/slices/userSlice'
import './NewChatRoom.scss'

export const NewChatRoom = ({ chatScreen, updateChatScreen }) => {
  const dispatch = useAppDispatch()
  const currentConversation = useAppSelector(selectConversation)
  const authUser = useAppSelector(selectAuthUser)
  const [engineers, setEngineers] = useState([])
  const [designers, setDesigners] = useState([])
  const [projectMembers, setProjectMembers] = useState<
    ProjectMemberInterface[]
  >([])
  const [selectedMembers, setSelectedMembers] = useState<
    ProjectMemberInterface[]
  >([])
  const [allMembersSelected, setAllMembersSelected] = useState(false)
  const [stillRemainingMembers, setStillRemainingMembers] = useState(true)
  const noMembersImage =
    'https://i.postimg.cc/VNBQ0xHP/Screen-Shot-2023-05-26-at-8-08-16-PM.png'

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const project = await getProjectByUser(authUser._id)
        const { engineers: projectEngineers, designers: projectDesigners } =
          project.existingProject[0].members

        if (authUser.role === 'Software Engineer') {
          setEngineers(
            projectEngineers.filter(member => member._id !== authUser._id)
          )
          setDesigners(projectDesigners)
        } else {
          setEngineers(projectEngineers)
          setDesigners(
            projectDesigners.filter(member => member._id !== authUser._id)
          )
        }
      } catch (error) {
        console.error('Error fetching project members:', error)
      }
    }
    fetchProjectMembers()
  }, [])

  useEffect(() => {
    if (
      chatScreen === 'inviteNewMembers' &&
      currentConversation &&
      currentConversation.participants
    ) {
      const currentMembers = [...designers, ...engineers]

      const remainingMembers = currentMembers.filter(
        mem =>
          !currentConversation.participants.some(
            (participant: { participant: { _id: string } }) =>
              participant.participant && participant.participant._id === mem._id
          )
      )

      setProjectMembers(remainingMembers)
      setStillRemainingMembers(remainingMembers.length > 0)
    } else if (chatScreen === 'composeNewChat') {
      if (engineers.length > 0 && designers.length > 0) {
        setProjectMembers([...designers, ...engineers])
      } else {
        setProjectMembers([])
      }
    }
  }, [chatScreen, currentConversation, engineers, designers])

  useEffect(() => {
    selectedMembers.length === projectMembers.length &&
    projectMembers.length > 0
      ? setAllMembersSelected(true)
      : setAllMembersSelected(false)
  }, [selectedMembers, projectMembers])

  const handleMemberClick = (member: ProjectMemberInterface) => {
    const isSelected = selectedMembers.some(mem => mem._id === member._id)
    isSelected
      ? setSelectedMembers(
          selectedMembers.filter(mem => mem._id !== member._id)
        )
      : setSelectedMembers([...selectedMembers, member])
  }

  const selectAllClick = () => {
    if (allMembersSelected) {
      setSelectedMembers([])
    } else setSelectedMembers([...projectMembers])
    setAllMembersSelected(!allMembersSelected)
  }

  const handleSubmitAddMembers = async () => {
    const participantsToAdd = selectedMembers.map(member => member._id)
    const newMembers = await updateGroupChat(
      authUser._id,
      currentConversation._id,
      { participants: participantsToAdd }
    )

    const currentDisplayName = currentConversation.displayName

    const newMembersName = selectedMembers
      .map(member => `${member.firstName} ${member.lastName}`)
      .join(', ')

    dispatch(
      setCurrentConversation({
        _id: currentConversation._id,
        isGroup: true,
        participants: projectMembers,
        displayName: `${currentDisplayName}, ${newMembersName}`,
      })
    )
    updateChatScreen('editChatRoom')
  }

  const handleSubmitNewChatRoom = async () => {
    let newRoom
    if (selectedMembers.length > 1) {
      const participants = selectedMembers.map(member => member._id)

      const participantsNames = selectedMembers
        .map(member => `${member.firstName} ${member.lastName}`)
        .join(', ')
      newRoom = await createGroupChatRoom(
        authUser._id,
        participants,
        participantsNames
      )

      dispatch(
        setCurrentConversation({
          _id: newRoom.newRoomId,
          isGroup: true,
          participants,
          displayName: participantsNames,
        })
      )
      updateChatScreen('messages')
    } else {
      const recipientEmail = selectedMembers[0].email
      newRoom = await createPrivateChatRoom(authUser._id, recipientEmail)
      dispatch(
        setCurrentConversation({
          _id: newRoom.chatRoom._id,
          isGroup: false,
          displayName: `${selectedMembers[0].firstName} ${selectedMembers[0].lastName}`,
        })
      )
      dispatch(
        setSelectedMember({
          _id: selectedMembers[0]._id,
          firstName: selectedMembers[0].firstName,
          lastName: selectedMembers[0].lastName,
          profilePicture: selectedMembers[0].profilePicture,
        })
      )
      updateChatScreen('messages')
    }
  }

  return (
    <div className='new-chat-room-container'>
      <section>
        <ChatRoomRecipients
          handleMemberClick={handleMemberClick}
          selectedMembers={selectedMembers}
        />
        <p>Invite members from your project</p>
        <div className='select-all-grid'>
          <div
            className={allMembersSelected ? 'all-checked' : 'checkbox'}
            onClick={selectAllClick}
          >
            {allMembersSelected && <TfiMinus className='checkmark' />}
          </div>
          <label>Invite all members</label>
        </div>
        {stillRemainingMembers ? (
          <AllProjectMembers
            projectMembers={projectMembers}
            selectedMembers={selectedMembers}
            handleMemberClick={handleMemberClick}
          />
        ) : (
          <div className='no-remaining-members'>
            <img src={noMembersImage} alt='no members' />
            <p>All project members are in current chat!</p>
          </div>
        )}
      </section>
      <button
        disabled={selectedMembers.length === 0}
        onClick={
          chatScreen === 'composeNewChat'
            ? handleSubmitNewChatRoom
            : handleSubmitAddMembers
        }
      >
        {chatScreen === 'composeNewChat' ? 'Create a Room' : 'Add Members'}
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
          className='member-grid'
          key={member._id}
          onClick={() => handleMemberClick(member)}
        >
          <div
            className={
              selectedMembers.some(mem => mem._id === member._id)
                ? 'checkbox-checked'
                : 'checkbox'
            }
          >
            {selectedMembers.some(mem => mem._id === member._id) && (
              <TfiCheck className='checkmark' />
            )}
          </div>
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
