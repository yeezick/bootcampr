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
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectConversation,
  setCurrentConversation,
  setSelectedMember,
} from 'utils/redux/slices/chatSlice'
import { ChatScreen, DefaultIcons } from 'utils/data/chatConstants'
import { isMemberSelected } from 'utils/functions/chatLogic'
import { MemberThumbnail } from 'components/ChatDialog/MemberThumbnail/MemberThumbnail'
import './NewChatRoom.scss'

export const NewChatRoom = ({ chatScreen, onScreenUpdate }) => {
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
  const [isAssignedToProject, setIsAssignedToProject] = useState(true)

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const project = await getProjectByUser(authUser._id)

        if (project.existingProject.length === 0) {
          setIsAssignedToProject(false)
        }

        const { engineers: projectEngineers, designers: projectDesigners } =
          project.existingProject[0].members

        // Set project members to state based on respective role, excluding authUser
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
      chatScreen === ChatScreen.InviteNewMembers &&
      currentConversation &&
      currentConversation.participants
    ) {
      // In Edit Chat Room of current conversation:
      const currentMembers = [...designers, ...engineers] // All members in project

      // Filter out members not present in current conversation
      const remainingMembers = currentMembers.filter(
        mem =>
          !currentConversation.participants.some(
            (participant: { participant: { _id: string } }) =>
              participant.participant && participant.participant._id === mem._id
          )
      )

      setProjectMembers(remainingMembers) // Remaining members to be displayed
      setStillRemainingMembers(remainingMembers.length > 0) // False if all members already in current conversation
    } else if (chatScreen === ChatScreen.ComposeNewChat) {
      // In Compose New Chat to create a new conversation:
      if (engineers.length > 0 && designers.length > 0) {
        setProjectMembers([...designers, ...engineers]) // All project members to be displayed
      } else {
        setProjectMembers([])
      }
    }
  }, [chatScreen, currentConversation, engineers, designers])

  useEffect(() => {
    // Check if ALL members' checkboxes are selected
    selectedMembers.length === projectMembers.length &&
    projectMembers.length > 0
      ? setAllMembersSelected(true)
      : setAllMembersSelected(false)
  }, [selectedMembers, projectMembers])

  const handleMemberClick = (member: ProjectMemberInterface) => {
    // Adds/Removes project member from selectedMembers array on checkbox click
    const isSelected = selectedMembers.some(mem => mem._id === member._id)
    isSelected
      ? setSelectedMembers(
          selectedMembers.filter(mem => mem._id !== member._id)
        )
      : setSelectedMembers([...selectedMembers, member])
  }

  const selectAllClick = () => {
    // Handles Invite All Members checkbox to select all members
    if (allMembersSelected) {
      setSelectedMembers([])
    } else setSelectedMembers([...projectMembers])
    setAllMembersSelected(!allMembersSelected)
  }

  const handleSubmitAddMembersToExistingChat = async () => {
    // Only in Edit Chat Room to add additional members to current conversation:
    const participantsToAdd = selectedMembers.map(member => member._id)
    // PUT request to update current group chat with additional selected members
    const newMembers = await updateGroupChat(
      authUser._id,
      currentConversation._id,
      { participants: participantsToAdd }
    )

    // Updating group chat displayName in Redux
    const currentDisplayName = currentConversation.displayName

    // Additional members to append to displayName
    const newMembersName = selectedMembers
      .map(member => `${member.firstName} ${member.lastName}`)
      .join(', ')

    dispatch(
      setCurrentConversation({
        _id: currentConversation._id,
        isGroup: true,
        participants: projectMembers,
        displayName: `${currentDisplayName}, ${newMembersName}`, // Updated displayName
      })
    )
    onScreenUpdate(ChatScreen.EditChatRoom)
  }

  const handleSubmitNewChatRoom = async () => {
    // Only in New Chat Room to create a new conversation:
    let newRoom
    // Selected members to add to new GROUP conversation
    if (selectedMembers.length > 1) {
      const participants = selectedMembers.map(member => member._id)

      // Concatenating participant names
      const participantsNames = selectedMembers
        .map(member => `${member.firstName} ${member.lastName}`)
        .join(', ')
      // POST request to create new group chat with selected participants
      newRoom = await createGroupChatRoom(
        authUser._id,
        participants,
        participantsNames
      )

      // Updating Redux chat state
      dispatch(
        setCurrentConversation({
          _id: newRoom.newRoomId,
          isGroup: true,
          participants,
          displayName: participantsNames,
        })
      )
      onScreenUpdate(ChatScreen.Messages)
    } else {
      const participants = selectedMembers.map(member => member._id)
      // Selected member to add to PRIVATE conversation
      const recipientEmail = selectedMembers[0].email
      // POST request to create new private chat with selected participant
      newRoom = await createPrivateChatRoom(authUser._id, recipientEmail)
      // Updating Redux chat state
      dispatch(
        setCurrentConversation({
          _id: newRoom.chatRoom._id,
          isGroup: false,
          participants,
          displayName: `${selectedMembers[0].firstName} ${selectedMembers[0].lastName}`,
        })
      )
      // Set selectedMember in Redux for private chats
      dispatch(
        setSelectedMember({
          _id: selectedMembers[0]._id,
          firstName: selectedMembers[0].firstName,
          lastName: selectedMembers[0].lastName,
          profilePicture: selectedMembers[0].profilePicture,
        })
      )
      onScreenUpdate(ChatScreen.Messages)
    }
  }

  return (
    <div className='new-chat-room-container'>
      <section>
        <SelectedMembersGrid
          handleMemberClick={handleMemberClick}
          selectedMembers={selectedMembers}
        />
        <p>Invite members from your project</p>
        <SelectAllMembersCheck
          allMembersSelected={allMembersSelected}
          selectAllClick={selectAllClick}
        />
        {isAssignedToProject ? (
          <ProjectMembersList
            projectMembers={projectMembers}
            selectedMembers={selectedMembers}
            handleMemberClick={handleMemberClick}
            stillRemainingMembers={stillRemainingMembers}
          />
        ) : (
          <NoAssignedProject />
        )}
      </section>
      <button
        disabled={selectedMembers.length === 0}
        onClick={
          chatScreen === ChatScreen.ComposeNewChat
            ? handleSubmitNewChatRoom
            : handleSubmitAddMembersToExistingChat
        }
      >
        {chatScreen === ChatScreen.ComposeNewChat
          ? 'Create a Room'
          : 'Add Members'}
      </button>
    </div>
  )
}

const SelectedMembersGrid = ({ selectedMembers, handleMemberClick }) => {
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

const SelectAllMembersCheck = ({ allMembersSelected, selectAllClick }) => {
  return (
    <div className='select-all-grid'>
      <SelectAllCheckbox
        allMembersSelected={allMembersSelected}
        selectAllClick={selectAllClick}
      />
      <label>Invite all members</label>
    </div>
  )
}

const ProjectMembersList = ({
  projectMembers,
  selectedMembers,
  handleMemberClick,
  stillRemainingMembers,
}) => {
  if (stillRemainingMembers) {
    return (
      <div className='members-container'>
        {projectMembers.map(member => (
          <div
            className='member-grid'
            key={member._id}
            onClick={() => handleMemberClick(member)}
          >
            <SelectOneCheckbox
              selectedMembers={selectedMembers}
              member={member}
            />
            <MemberThumbnail user={member} />
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div className='no-remaining-members'>
        <img src={DefaultIcons.NoMembers} alt='no members' />
        <p>All project members are in current chat!</p>
      </div>
    )
  }
}

const SelectOneCheckbox = ({ selectedMembers, member }) => {
  const selectOneClassName = isMemberSelected(selectedMembers, member)
    ? 'checkbox-checked'
    : 'checkbox'

  return (
    <div className={selectOneClassName}>
      {isMemberSelected(selectedMembers, member) && (
        <TfiCheck className='checkmark' />
      )}
    </div>
  )
}

const SelectAllCheckbox = ({ allMembersSelected, selectAllClick }) => {
  const selectAllClassName = allMembersSelected ? 'all-checked' : 'checkbox'

  return (
    <div className={selectAllClassName} onClick={selectAllClick}>
      {allMembersSelected && <TfiMinus className='checkmark' />}
    </div>
  )
}

const NoAssignedProject = () => {
  return (
    <div className='no-remaining-members'>
      <img src={DefaultIcons.NoMembers} alt='no members' />
      <p>Not assigned to a project yet. Hang tight!</p>
    </div>
  )
}
